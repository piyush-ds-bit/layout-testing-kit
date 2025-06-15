
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/types/database";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";

interface ProjectDetailCardProps {
  project: Project;
  details?: string[] | string;
  showBackBtn?: boolean;
  backHandler?: () => void;
}

const renderDetails = (details?: string[] | string) => {
  if (!details) return null;
  if (Array.isArray(details)) {
    return (
      <div className="space-y-6">
        {details.map((section, i) => (
          <div
            key={i}
            className="text-portfolio-gray-light text-md whitespace-pre-line"
          >{section}</div>
        ))}
      </div>
    );
  }
  // If single string, fallback to old rendering
  return (
    <p className="text-portfolio-gray-light text-md mb-6 whitespace-pre-line">
      {details}
    </p>
  );
};

const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({
  project,
  details,
  showBackBtn = false,
  backHandler,
}) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="portfolio-container py-6">
        {showBackBtn && (
          <Button
            variant="outline"
            onClick={backHandler || (() => navigate(-1))}
            className="mb-5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        )}

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
            <h1 className="text-3xl font-bold text-white mb-2">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-sm rounded bg-portfolio-accent text-white capitalize">
                {project.category}
              </span>
              <span className="text-xs text-portfolio-gray-light italic">
                {project.created_at
                  ? `Created at ${new Date(project.created_at).toLocaleDateString()}`
                  : ""}
              </span>
            </div>
            <p className="text-portfolio-gray-light text-md mb-6 whitespace-pre-line">
              {project.description}
            </p>

            {/* Flexible multi-section details */}
            {renderDetails(details)}

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

export default ProjectDetailCard;
