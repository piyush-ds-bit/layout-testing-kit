import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import type { Project } from "@/types/database";
import ProjectDetailCard from "@/components/projects/ProjectDetailCard";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const DEMO_PROJECTS: Record<string, Project & { details?: string[] }> = {
  '1': {
    id: '1',
    title: 'WhatsApp Buddy',
    description:
      'Developed a Streamlit-based WhatsApp chat analyzer with sentiment analysis, word clouds, user stats, and emoji insights using Pandas and Matplotlib/Seaborn.',
    category: 'Deployed',
    image_url: '/whatsapp.jpg',
    github_url: '#',
    live_url: '#',
    technologies: ['Python', 'Streamlit', 'Pandas&Seaborn'],
    created_at: '',
    details: [
      `WhatsApp Chat Analyzer
=======================

A user-friendly tool built with Python and Streamlit that allows you to upload exported WhatsApp chats (.txt files) and generate deep insights including sentiment analysis, user activity, message trends, word clouds, and more!
`,
      `Motivation
-----------------------

As a passionate learner of data science and Python, I wanted to build a real-world, interactive project using personal data we all generate — WhatsApp chats!

This project was born out of curiosity to visually explore conversation patterns, analyze user behavior, and use NLP for sentiment insights — all with a click.
`,
      `Features
-----------------------

- Upload exported WhatsApp chat text files directly
- User-wise message count, emoji usage, and word contribution
- Timeline analysis (daily/monthly activity trends)
- Most active days, months, and hours
- Sentiment analysis using NLP
- WordCloud of most used words
- Top keywords & common words
- Group stats (for group chats) & overall engagement metrics
`,
      `Technologies Used
-----------------------

- Python (Core Language)
- Pandas – for data manipulation
- NumPy – for numerical operations
- Matplotlib & Seaborn – for visualizations
- Streamlit – for building interactive UI
- NLTK / TextBlob – for sentiment analysis
- WordCloud – to visualize common terms
- Regular Expressions (regex) – to parse and clean text
`,
      `How It Works
-----------------------

1. Export your WhatsApp chat (.txt) from phone
2. Launch the app locally via Streamlit
3. Upload the file and choose a user or “Overall”
4. The app generates stats, charts, and emotion insights
`,
      `Challenges I Faced
-----------------------

1. Parsing WhatsApp Chat Format
- WhatsApp exports have different structures based on language and device (iOS/Android)
- I handled this using regex, careful preprocessing, and exceptions for edge cases

2. Sentiment Analysis Accuracy
- WhatsApp messages are short, slangy, and informal
- I tested different models (TextBlob, VADER) and chose the one that gave the best consistent output for small texts

3. Performance with Large Files
- Chats with 50,000+ messages were slowing down processing
- I optimized by caching and vectorized Pandas operations
`,
    ],
  },
  '2':{id: 2,
    title: 'Piyush Portfolio',
    description: 'Developed a personal portfolio website using lovable.ai and Firebase with an admin panel for real-time content updates, showcasing projects, skills, and contact information.',
    image: '/portfolio.jpg',
    category: 'Deployed',
    technologies: ['lovable.ai', 'Supabase', 'SQLite'],
    githubUrl: 'https://github.com/piyush-ds-bit/Portfolio-website',
    liveUrl: '#',
    technologies: ['lovable.ai', 'Supabase', 'SQLlite'],
    created_at: '',
    details: [
      `🌐 Personal Portfolio – Built Entirely Using AI (Lovable.ai)
      =======================
Welcome to my personal portfolio website, a digital reflection of my learning journey, projects, and passion for Machine Learning and Data Science.
What makes this portfolio special? It’s built entirely using AI tools, with no prior experience in React or frontend development.`,

`🎯 Why I Built This
-----------------------
      
As someone deeply passionate about becoming a Data Scientist, I wanted a place to:

Showcase my projects, skills, and blogs
Share my learning path with others
Experiment with creative tech like AI-driven design
Create an engaging experience — even adding a randomly roaming bug 🐞 for fun!
Despite having zero frontend experience, I used Lovable.ai, my creativity, and well-crafted prompts to build a fully responsive, modern site — all by myself.`,

`🚀 Features

----------------------- 
  
✨ Fully AI-generated layout using Lovable.ai
📂 Sections for Skills, Experience, Projects, Blogs, and Contact
🔐 Admin panel with blog control and authentication
💬 Contact form where users can message me (with email/phone)
🐞 Randomly roaming visual bug for engagement and interactivity
🌗 Dark theme with smooth UI/UX
📄 Resume download functionality
📊 ML Pipeline Visualization (interactive)
📘 Blogs written and managed from dashboard
🔁 Dynamic greetings in multiple languages (e.g., Namaste, Sat Sri Akal, etc.)
🛠️ Tech Stack
Lovable.ai – AI-powered website builder
Supabase – Backend (Auth + Database + Storage)
Tailwind CSS / Shadcn UI – (Handled by AI framework)
React / Next.js (auto-generated, used indirectly via AI)
Framer Motion – For animations
Custom SVGs & Icons – For visual identity
GitHub – For version control and deployment history
🌱 My Ongoing Mission
This portfolio is a testament to the power of learning + creativity.`,

`I’m currently:

-----------------------

🌟 Learning core ML algorithms and data science techniques
🧠 Building ML projects using Python, Pandas, scikit-learn, and more
🔁 Constantly evolving and adding features to this site
📌 My dream is to become a Data Scientist, and I’m working day and night to make that dream real — through building, experimenting, and learning.

🔍 How It Was Built
“I didn’t write a single line of frontend code manually.`,

`Instead:

-----------------------

I used prompts and imagination.
I guided Lovable.ai to bring the site to life.
I connected the backend using Supabase.
I deployed the site and polished every section myself.
🧠 AI helped me code it, but I envisioned it.`.

`🖼️ Live Preview

-----------------------
      
👉 https://piyushkrsingh.lovable.app`,

`📬 Contact Me

-----------------------

Feel free to drop a message via the Connect section on the website.

Name: Piyush Kumar Singh
Email: piyushjuly04@gmail.com
Portfolio: piyushkrsingh.lovable.app`,
      
`🙏 Acknowledgements

-----------------------
      
Lovable.ai – for empowering me to build without knowing React
Supabase – for seamless backend integration
OpenAI – for guidance, support, and intelligence 😉
And to everyone who's believed in learning by doing`,
      
`⭐ Final Note

----------------------- 

"You don’t need to know everything to start — just the courage to begin."

If you like my work, feel free to ⭐ star the repo (if public), or connect with me on GitHub and LinkedIn.

Thanks for stopping by 🙏`,
    ],
  }// Add more demo projects here if needed
};

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = React.useState<Project | null>(null);
  const [details, setDetails] = React.useState<string[] | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);

      if (id && DEMO_PROJECTS[id]) {
        setProject(DEMO_PROJECTS[id]);
        setDetails(DEMO_PROJECTS[id].details);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        setProject(null);
        setDetails(undefined);
        setLoading(false);
        return;
      }

      // Check if this project matches any local demo (for future extensibility)
      let extraDetails: string[] | undefined;
      if (data && data.title && Object.values(DEMO_PROJECTS).some(proj => proj.title === data.title)) {
        const match = Object.values(DEMO_PROJECTS).find(proj => proj.title === data.title);
        extraDetails = match?.details;
      }

      setProject(data as Project | null);
      setDetails(extraDetails);
      setLoading(false);
    };
    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin w-8 h-8 mb-2 text-portfolio-accent" />
          <div className="text-portfolio-gray-light">Loading project details...</div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-3xl font-bold text-red-400 mb-2">Project not found</div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <ProjectDetailCard
      project={project}
      details={details}
      showBackBtn
      backHandler={() => navigate(-1)}
    />
  );
};

export default ProjectDetailsPage;
