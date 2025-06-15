
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Loader2, ArrowLeft } from "lucide-react";
import type { Project } from "@/types/database";

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        setProject(null);
        setLoading(false);
        return;
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
