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

  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

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
    
    // Build context based on user message
    const context = buildContext(
      message,
      projectsRes.data || [],
      skillsRes.data || [],
      experiencesRes.data || [],
      blogRes.data || []
    );

    // System prompt with training data integration
    const systemPrompt = `You are Piyush Kumar Singh's personal AI assistant on his portfolio website. You are knowledgeable, professional, and helpful.

🎯 CRITICAL INSTRUCTIONS FOR PERSONAL QUESTIONS:

${matchedTags.length > 0 ? `
⚠️ EXACT ANSWER MODE ACTIVATED ⚠️

The user's question matches these training tags. You MUST use the exact answers provided below:

${matchedTags.map(tag => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 TAG: ${tag.tag.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXACT ANSWER TO USE:
${tag.answer}

`).join('\n')}

🔒 RULES FOR USING TRAINING DATA:
1. Use the EXACT answer provided above (you may rephrase slightly for natural conversation flow)
2. DO NOT add information not in the training answer
3. DO NOT make up or assume additional details beyond what's stated
4. Keep the facts EXACTLY as stated in the training data
5. You may combine multiple tag answers if the question covers multiple topics
6. Maintain a friendly, conversational tone while using exact facts
` : ''}

📚 FOR ALL PERSONAL QUESTIONS ABOUT PIYUSH:
- Use ONLY the training data answers when tags match (priority #1)
- Use the portfolio context data below for additional technical details (priority #2)
- NEVER hallucinate or invent information not in training data or context
- If you don't have exact information, say so politely and suggest where they might find it

💬 FOR GENERAL/TECHNICAL QUESTIONS (not about Piyush personally):
- Respond normally as a helpful AI assistant
- Use your general knowledge appropriately
- Still be helpful and friendly

📋 AVAILABLE TRAINING DATA TOPICS:
${trainingData.map(t => `- ${t.tag}: "${t.keywords.slice(0, 3).join('", "')}..."`).join('\n')}

📊 CURRENT PORTFOLIO CONTEXT:
${context}

🎭 PERSONALITY & TONE:
- Be friendly, professional, and conversational
- Show enthusiasm when discussing Piyush's work and achievements
- Keep responses concise but informative (2-4 sentences for simple questions, more for complex)
- Use natural language and avoid being overly formal or robotic

✨ CAPABILITIES:
1. Answer questions about Piyush using EXACT training data answers
2. Provide technical details from portfolio context
3. Help visitors navigate the website
4. Suggest relevant projects or information
5. Direct users to appropriate sections (Connect, Projects, etc.)

⚠️ IMPORTANT GUIDELINES:
- Training data answers take ABSOLUTE PRIORITY for personal questions
- Never make up information not in training data or context
- If you don't have information, say so politely
- For contact requests, direct them to the Connect section
- Be honest about limitations - you're an AI assistant, not Piyush himself
- Maintain consistency - same question should get same factual answer

Remember: Accuracy is paramount. Use training data EXACTLY as provided. You represent Piyush's professional brand!`;

    // Prepare messages for AI
    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6), // Last 6 messages for context
      { role: 'user', content: message },
    ];

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
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    // Generate session ID for conversation tracking
    const sessionId = crypto.randomUUID();

    // Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = aiResponse.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';
        let controllerClosed = false;
        let buffer = '';

        if (!reader) {
          controller.close();
          return;
        }

        // Safe enqueue wrapper to prevent enqueuing on closed stream
        const safeEnqueue = (data: string) => {
          if (!controllerClosed) {
            try {
              controller.enqueue(data);
            } catch (e) {
              console.error('Enqueue failed:', e);
              controllerClosed = true;
            }
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

            for (const line of lines) {
              const trimmedLine = line.trim();
              
              // Skip empty lines and comments
              if (!trimmedLine || trimmedLine.startsWith(':')) continue;
              
              if (trimmedLine.startsWith('data: ')) {
                const data = trimmedLine.slice(6).trim();
                
                if (data === '[DONE]') {
                  console.log('Received [DONE], saving conversation...');
                  
                  // Save conversation to database
                  try {
                    await supabase.from('chatbot_conversations').insert({
                      session_id: sessionId,
                      user_message: message,
                      assistant_response: fullResponse,
                      context_used: { contextLength: context.length },
                    });
                    console.log('Conversation saved successfully');
                  } catch (dbError) {
                    console.error('Failed to save conversation:', dbError);
                  }
                  
                  safeEnqueue(`data: ${JSON.stringify({ type: 'done', content: '' })}\n\n`);
                  closeStream();
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || '';
                  
                  if (content) {
                    fullResponse += content;
                    safeEnqueue(`data: ${JSON.stringify({ type: 'delta', content })}\n\n`);
                  }
                } catch (e) {
                  // Incomplete JSON chunk - will be completed in next iteration
                  console.log('Skipping incomplete JSON chunk');
                }
              }
            }
          }

          // Process any remaining buffer
          if (buffer.trim()) {
            console.log('Processing remaining buffer...');
            const trimmedLine = buffer.trim();
            if (trimmedLine.startsWith('data: ')) {
              const data = trimmedLine.slice(6).trim();
              if (data !== '[DONE]') {
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || '';
                  if (content) {
                    fullResponse += content;
                    safeEnqueue(`data: ${JSON.stringify({ type: 'delta', content })}\n\n`);
                  }
                } catch (e) {
                  console.log('Could not parse final buffer chunk');
                }
              }
            }
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

  } catch (error) {
    console.error('Chatbot error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
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
