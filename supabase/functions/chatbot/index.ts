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

    // Build context based on user message
    const context = buildContext(
      message,
      projectsRes.data || [],
      skillsRes.data || [],
      experiencesRes.data || [],
      blogRes.data || []
    );

    // System prompt
    const systemPrompt = `You are Piyush Kumar Singh's friendly AI assistant on his portfolio website. Your role is to help visitors learn about Piyush, his projects, skills, and experience.

About Piyush:
- Name: Piyush Kumar Singh
- Education: B.Tech in Applied Electronics and Instrumentation Engineering at Haldia Institute of Technology (Batch 2023-2027)
- Passion: Data Science, Machine Learning, and Full-Stack Development
- Skills: Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Docker, FastAPI, Flutter, Streamlit
- Philosophy: Inspired by Bhagavad Gita and Vedic teachings. Values learning, discipline, and self-motivation.
- Goal: Becoming a skilled ML Engineer or Data Scientist working on large-scale AI solutions

Key Projects:
1. WhatsApp Buddy - Chat analyzer with sentiment analysis (Python, Streamlit, NLP)
2. MovieMate - Movie recommender using Bag-of-Words and cosine similarity
3. Insurance Premium Predictor - ML model with FastAPI and Streamlit
4. Personal Portfolio - Built with Lovable.ai and Supabase, includes admin panel

Personality:
- Friendly, conversational, and enthusiastic
- Knowledgeable about Piyush's work and background
- Helpful in guiding visitors through the website
- Professional but approachable

Guidelines:
- Keep responses concise and friendly (2-4 paragraphs max)
- Use "Piyush" or "he/his" when referring to him
- Provide specific details from the context when available
- Guide visitors to relevant sections of the website when appropriate
- If asked about contact, mention the Connect section on the website
- For navigation requests, provide clear directions

Current Context:
${context}

Remember: You represent Piyush's brand. Be helpful, knowledgeable, and leave visitors with a positive impression!`;

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
