import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Loader2, ArrowLeft } from "lucide-react";
import type { Project } from "@/types/database";

const DEMO_PROJECTS: Record<string, Project> = {
  '1': {
    id: '1',
    title: 'WhatsApp Buddy',
    description: `
WhatsApp Chat Analyzer
=======================

A user-friendly tool built with Python and Streamlit that allows you to upload exported WhatsApp chats (.txt files) and generate deep insights including sentiment analysis, user activity, message trends, word clouds, and more!

-----------------------
Motivation
-----------------------

As a passionate learner of data science and Python, I wanted to build a real-world, interactive project using personal data we all generate — WhatsApp chats!

This project was born out of curiosity to visually explore conversation patterns, analyze user behavior, and use NLP for sentiment insights — all with a click.

-----------------------
Features
-----------------------

- Upload exported WhatsApp chat text files directly
- User-wise message count, emoji usage, and word contribution
- Timeline analysis (daily/monthly activity trends)
- Most active days, months, and hours
- Sentiment analysis using NLP
- WordCloud of most used words
- Top keywords & common words
- Group stats (for group chats) & overall engagement metrics

-----------------------
Technologies Used
-----------------------

- Python (Core Language)
- Pandas – for data manipulation
- NumPy – for numerical operations
- Matplotlib & Seaborn – for visualizations
- Streamlit – for building interactive UI
- NLTK / TextBlob – for sentiment analysis
- WordCloud – to visualize common terms
- Regular Expressions (regex) – to parse and clean text

-----------------------
How It Works
-----------------------

1. Export your WhatsApp chat (.txt) from phone
2. Launch the app locally via Streamlit
3. Upload the file and choose a user or “Overall”
4. The app generates stats, charts, and emotion insights

-----------------------
Challenges I Faced
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
`.trim(),
    category: 'Deployed',
    image_url: '/whatsapp.jpg',
    github_url: '#',
    live_url: '#',
    technologies: ['Python', 'Streamlit', 'Pandas&Seaborn'],
    created_at: '',
  }
  // Add more demo projects here if needed
};

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);

      if (id && DEMO_PROJECTS[id]) {
        setProject(DEMO_PROJECTS[id]);
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
        setLoading(false);
        return;
      }

      // If the project title is "WhatsApp Buddy", override the description
      if (data && data.title === "WhatsApp Buddy") {
        data.description = DEMO_PROJECTS['1'].description;
      }

      setProject(data as Project | null);
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
    <Layout>
      <div className="portfolio-container py-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mb-5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        <div className="portfolio-card p-6 flex flex-col md:flex-row gap-8">
          {project.image_url && (
            <div className="md:w-1/2 w-full flex-shrink-0">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg border border-portfolio-dark"
              />
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-sm rounded bg-portfolio-accent text-white capitalize">
                {project.category}
              </span>
              <span className="text-xs text-portfolio-gray-light italic">
                Created at {project.created_at ? new Date(project.created_at).toLocaleDateString() : ""}
              </span>
            </div>
            <p className="text-portfolio-gray-light text-md mb-6 whitespace-pre-line">
              {project.description}
            </p>

            <div className="mb-6">
              <strong className="text-white">Technologies used:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {(project.technologies || []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-portfolio-darker text-portfolio-gray-light px-3 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn portfolio-button"
                >
                  GitHub
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn portfolio-button"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetailsPage;
