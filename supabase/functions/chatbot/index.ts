import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: string;
  content: string;
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP
const MAX_MESSAGE_LENGTH = 2000; // Maximum characters per message
const MAX_CONVERSATION_HISTORY = 10; // Maximum conversation history items

// Simple in-memory rate limiter (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  record.count++;
  return false;
}

// Clean up old entries periodically (prevent memory leak)
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// Custom training data - exact answers for tagged questions about Piyush
const trainingData = [
  {
    tag: "introduction",
    keywords: ["who is piyush", "tell me about piyush", "introduction", "owner of this website", "piyush kumar singh", "who are you", "about piyush", "detailed introduction"],
    answer: "Hello! My name is Piyush Kumar Singh, and I am currently pursuing my B.Tech in Applied Electronics and Instrumentation Engineering (AEIE) at Haldia Institute of Technology, batch 2023–2027.\n\nI come from a strong technical background, and over the years, I've developed a deep interest in Data Science, Machine Learning, and full-stack application development. This passion has shaped the entire direction of my career.\n\nFrom early college days, I've been fascinated by how data solves real-world problems. I learned Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, and gradually moved from analysis to building ML models and deploying them as apps.\n\nI see myself as a passionate learner who loves experimenting, exploring tools, and converting ideas into working solutions."
  },
  {
    tag: "skills",
    keywords: ["skills", "tech stack", "programming languages", "what does he know", "technologies", "tools", "expertise", "technical skills"],
    answer: "Piyush is skilled in Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Streamlit, FastAPI, Flutter, Docker, Supabase, HTML/CSS basics, DSA using Python, ML model development, deployment, problem-solving, and data analysis."
  },
  {
    tag: "projects",
    keywords: ["projects", "ml projects", "applications", "work", "built", "developed", "portfolio projects", "what has he built"],
    answer: "Piyush has built:\n1. WhatsApp Buddy – Chat Analyzer (Streamlit + NLP insights)\n2. MovieMate – Movie Recommender System (content-based, poster fetching)\n3. Insurance Premium Predictor (ML model + FastAPI + Streamlit)\n4. Portfolio Website (Lovable.ai + Supabase + Admin Panel)\n5. Autonomous Obstacle-Avoiding Cleaning Car (ultrasonic sensor + autopilot cleaning)"
  },
  {
    tag: "achievements",
    keywords: ["achievements", "events", "certifications", "awards", "accomplishments", "recognition", "participated"],
    answer: "Achievements include:\n- Delivered PPT presentation at Jadavpur University (ISA event)\n- Appeared for TiHAN IIT Hyderabad × Masai AI & Drone Qualifier Exam\n- Participated in ML hackathons and coding competitions\n- Deployed multiple ML applications in early college years"
  },
  {
    tag: "mini_project",
    keywords: ["mini project", "2nd year project", "hardware project", "cleaning car", "autonomous car", "obstacle avoiding"],
    answer: "He worked on an Autonomous Obstacle-Avoiding Cleaning Car using ultrasonic sensors to navigate and automatically mop floors. He handled circuit integration and logic development as part of a 6-member team."
  },
  {
    tag: "goals",
    keywords: ["career goal", "goal", "ambition", "future plans", "what does he want", "become", "aspirations"],
    answer: "Piyush's long-term goal is to become a Machine Learning Engineer or Data Scientist and build impactful AI systems. He is also open to pursuing M.Tech/MS in AI/ML."
  },
  {
    tag: "personality",
    keywords: ["personality", "as a person", "motivates", "inspiration", "character", "nature", "what drives him"],
    answer: "Piyush is a disciplined, self-motivated learner. His inspiration comes from the Bhagavad Gita, ancient scriptures, and Vedic teachings, which help him stay grounded and focused."
  },
  {
    tag: "exam_events",
    keywords: ["exam", "events participated", "competitions", "contests", "tiHAN", "jadavpur", "hackathons"],
    answer: "He presented at Jadavpur University, appeared for TiHAN IIT Hyderabad × Masai AI & Drone Exam, and participated in multiple hackathons and coding contests."
  },
  {
    tag: "dsa_practice",
    keywords: ["dsa", "data structures", "algorithms", "leetcode", "coding practice", "competitive programming", "problem solving practice"],
    answer: "Yes, Piyush practices DSA regularly using Python. He uses LeetCode, Kaggle, and GitHub to improve his coding and problem-solving skills."
  }
];

// Match user message against training tags
function matchTrainingTags(userMessage: string) {
  const lowerMessage = userMessage.toLowerCase();
  const matchedTags = [];

  for (const tag of trainingData) {
    const hasKeywordMatch = tag.keywords.some(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );
    if (hasKeywordMatch) {
      matchedTags.push(tag);
    }
  }

  return matchedTags;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                   req.headers.get('x-real-ip') || 
                   'unknown';

  // Clean up old rate limit entries periodically
  cleanupRateLimitMap();

  // Check rate limit
  if (isRateLimited(clientIp)) {
    console.log(`Rate limit exceeded for IP: ${clientIp}`);
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait a moment before trying again.' }),
      { 
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    // Validate message
    if (!message) {
      throw new Error('Message is required');
    }

    // Validate message length
    if (typeof message !== 'string' || message.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message must be a string with maximum ${MAX_MESSAGE_LENGTH} characters`);
    }

    // Validate and limit conversation history
    const validatedHistory = Array.isArray(conversationHistory) 
      ? conversationHistory.slice(-MAX_CONVERSATION_HISTORY)
      : [];

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch knowledge base
    const [projectsRes, skillsRes, experiencesRes, blogRes] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(10),
      supabase.from('skills').select('*, skill_categories(name)').limit(50),
      supabase.from('experiences').select('*').order('start_date', { ascending: false }).limit(5),
      supabase.from('blog_posts').select('title, content, tag, author_name').order('created_at', { ascending: false }).limit(5),
    ]);

    // Check for training data matches FIRST
    const matchedTags = matchTrainingTags(message);
    console.log('User message:', message);
    console.log('Matched tags:', matchedTags.map(t => t.tag).join(', ') || 'none');
    
    // Build context based on user message
    const context = buildContext(
      message,
      projectsRes.data || [],
      skillsRes.data || [],
      experiencesRes.data || [],
      blogRes.data || []
    );

    // System prompt - SIMPLIFIED to avoid token limits
    const systemPrompt = matchedTags.length > 0
      ? `You are Piyush Kumar Singh's personal AI assistant. A user asked about Piyush and your knowledge base has exact answers.

CRITICAL: Use these EXACT answers (you may rephrase slightly for natural flow):

${matchedTags.map(tag => `[${tag.tag}]: ${tag.answer}`).join('\n\n')}

Context from portfolio: ${context}

Keep it friendly and conversational. Use the exact facts above.`
      : `You are Piyush Kumar Singh's personal AI assistant on his portfolio website.

About Piyush:
- B.Tech student in Applied Electronics and Instrumentation Engineering at Haldia Institute of Technology (2023-2027)
- Passionate about Data Science, ML, and Full-Stack Development
- Skills: Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Docker, FastAPI, Flutter, Streamlit
- Built projects: WhatsApp Buddy (chat analyzer), MovieMate (recommender), Insurance Premium Predictor, Portfolio Website
- Inspired by Bhagavad Gita and Vedic teachings
- Goal: Become an ML Engineer or Data Scientist

Current context: ${context}

Be friendly, concise, and helpful. Guide visitors through the website when appropriate.`;

    // Prepare messages for AI
    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...validatedHistory.slice(-6), // Last 6 messages for context
      { role: 'user', content: message },
    ];

    console.log('System prompt length:', systemPrompt.length);
    
    // Call Lovable AI Gateway
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        stream: true,
        max_tokens: 500,
      }),
    });

    console.log('AI Gateway response status:', aiResponse.status);
    
    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      throw new Error(`AI Gateway error: ${aiResponse.status} - ${errorText}`);
    }

    // Generate session ID for conversation tracking
    const sessionId = crypto.randomUUID();

        // Stream the response
        const stream = new ReadableStream({
          async start(controller) {
            const reader = aiResponse.body?.getReader();
            const decoder = new TextDecoder();
            const encoder = new TextEncoder(); // Encode strings to bytes for HTTP streaming
            let fullResponse = '';
            let controllerClosed = false;
            let buffer = '';
            let aiStreamComplete = false; // Flag to track when AI is done

            if (!reader) {
              controller.close();
              return;
            }

            // Safe enqueue wrapper to prevent enqueuing on closed stream
            const safeEnqueue = (data: string) => {
              if (controllerClosed) return;
              try {
                controller.enqueue(encoder.encode(data)); // Encode to Uint8Array for HTTP streaming
              } catch (e) {
                // Stream may already be closed - mark as closed and skip logging to avoid noisy errors
                controllerClosed = true;
              }
            };

            // Safe close wrapper
            const closeStream = () => {
              if (!controllerClosed) {
                controllerClosed = true;
                controller.close();
              }
            };

            console.log('Starting chatbot stream...');

            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  console.log('Stream finished normally');
                  break;
                }

                // Decode and add to buffer
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                
                // Keep last incomplete line in buffer
                buffer = lines.pop() || '';

                // Process all lines in this batch
                for (const line of lines) {
                  const trimmedLine = line.trim();
                  
                  // Skip empty lines and comments
                  if (!trimmedLine || trimmedLine.startsWith(':')) continue;
                  
                  if (trimmedLine.startsWith('data: ')) {
                    const data = trimmedLine.slice(6).trim();
                    
                    if (data === '[DONE]') {
                      console.log('Received [DONE]. Full response length:', fullResponse.length);
                      console.log('Full response preview:', fullResponse.substring(0, 200));
                      
                      // Set flag but DON'T close stream yet - continue processing this batch
                      aiStreamComplete = true;
                      continue; // Process remaining lines in this batch
                    }

                    try {
                      const parsed = JSON.parse(data);
                      const content = parsed.choices?.[0]?.delta?.content || '';
                      
                      if (content) {
                        console.log('Received content chunk, length:', content.length);
                        fullResponse += content;
                        safeEnqueue(`data: ${JSON.stringify({ type: 'delta', content })}\n\n`);
                      } else {
                        console.log('Parsed SSE event but no content:', JSON.stringify(parsed).substring(0, 100));
                      }
                    } catch (e) {
                      // Incomplete JSON chunk - will be completed in next iteration
                      console.log('Skipping incomplete JSON chunk:', String(e).substring(0, 100));
                    }
                  }
                }

                // If AI stream is complete after processing this batch, close gracefully
                if (aiStreamComplete) {
                  console.log('AI stream complete, closing after processing all content');
                  break;
                }
              }

              // Process any remaining buffer before closing
              if (buffer.trim()) {
                console.log('Processing remaining buffer...');
                const lines = buffer.split('\n');
                for (const raw of lines) {
                  const trimmedLine = raw.trim();
                  if (!trimmedLine || trimmedLine.startsWith(':') || trimmedLine === 'data: [DONE]') continue;
                  
                  if (trimmedLine.startsWith('data: ')) {
                    const data = trimmedLine.slice(6).trim();
                    try {
                      const parsed = JSON.parse(data);
                      const content = parsed.choices?.[0]?.delta?.content || '';
                      if (content) {
                        console.log('Final buffer content, length:', content.length);
                        fullResponse += content;
                        safeEnqueue(`data: ${JSON.stringify({ type: 'delta', content })}\n\n`);
                      }
                    } catch (e) {
                      console.log('Could not parse final buffer chunk');
                    }
                  }
                }
              }

              // FIRST send done event so the client can finish rendering
              safeEnqueue(`data: ${JSON.stringify({ type: 'done', content: '' })}\n\n`);

              // Then save conversation to database (does not affect streaming)
              try {
                await supabase.from('chatbot_conversations').insert({
                  session_id: sessionId,
                  user_message: message,
                  assistant_response: fullResponse,
                  context_used: { contextLength: context.length, matchedTags: matchedTags.map(t => t.tag) },
                });
                console.log('Conversation saved successfully. Final response length:', fullResponse.length);
              } catch (dbError) {
                console.error('Failed to save conversation:', dbError);
              }

            } catch (error) {
              console.error('Stream error:', error);
              safeEnqueue(`data: ${JSON.stringify({ type: 'error', content: 'Stream interrupted' })}\n\n`);
            } finally {
              closeStream();
            }
          },
        });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Chatbot error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function buildContext(userMessage: string, projects: any[], skills: any[], experiences: any[], blogs: any[]): string {
  const msg = userMessage.toLowerCase();
  const sections: string[] = [];

  // Check what user is asking about
  const isAboutProjects = /project|built|created|whatsapp|movie|insurance|portfolio/.test(msg);
  const isAboutSkills = /skill|technology|python|learn|know/.test(msg);
  const isAboutExperience = /experience|work|achievement|event|competition/.test(msg);
  const isAboutBlog = /blog|article|post|wrote/.test(msg);

  if (isAboutProjects || msg.includes('what') || msg.includes('show')) {
    const projectList = projects.slice(0, 4).map(p => 
      `- ${p.title}: ${p.description}\n  Tech: ${p.technologies?.join(', ') || 'N/A'}`
    ).join('\n');
    sections.push(`PROJECTS:\n${projectList}`);
  }

  if (isAboutSkills) {
    const skillsByCategory: Record<string, string[]> = {};
    skills.forEach((s: any) => {
      const cat = s.skill_categories?.name || 'Other';
      if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
      skillsByCategory[cat].push(s.name);
    });
    const skillList = Object.entries(skillsByCategory)
      .slice(0, 5)
      .map(([cat, list]) => `${cat}: ${list.join(', ')}`)
      .join('\n');
    sections.push(`SKILLS:\n${skillList}`);
  }

  if (isAboutExperience) {
    const expList = experiences.slice(0, 3).map(e => 
      `- ${e.position} at ${e.company} (${e.start_date} - ${e.current ? 'Present' : e.end_date})`
    ).join('\n');
    if (expList) sections.push(`EXPERIENCE:\n${expList}`);
  }

  if (isAboutBlog && blogs.length > 0) {
    const blogList = blogs.slice(0, 3).map(b => 
      `- ${b.title} [${b.tag}]\n  ${b.content?.substring(0, 100)}...`
    ).join('\n');
    sections.push(`BLOG POSTS:\n${blogList}`);
  }

  // If context is minimal, add general info
  if (sections.length === 0) {
    sections.push('Piyush is passionate about Data Science and ML, with strong Python skills and experience building ML models and full-stack applications.');
  }

  return sections.join('\n\n---\n\n').substring(0, 4000); // Limit context size
}
