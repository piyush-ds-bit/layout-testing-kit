import React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PipelineTooltipProps {
  stepLabel: string;
  description: string;
}

const tooltipContent: Record<string, { example: string; challenges: string }> = {
  "Frame the Problem": {
    example: "Define if it's classification, regression, or clustering task",
    challenges: "Balancing business objectives with technical feasibility",
  },
  "Data Gathering": {
    example: "Collect from APIs, databases, CSV files, web scraping",
    challenges: "Handling missing data sources and access permissions",
  },
  "Exploratory Data Analysis": {
    example: "Visualize distributions, correlations, and outliers",
    challenges: "Identifying hidden patterns in complex datasets",
  },
  "Data Preprocessing": {
    example: "Handle missing values, encode categories, scale features",
    challenges: "Deciding best imputation and encoding strategies",
  },
  "Feature Engineering": {
    example: "Create interaction terms, polynomial features, aggregations",
    challenges: "Balancing feature complexity with interpretability",
  },
  "Model Selection": {
    example: "Compare Linear Regression, Random Forest, XGBoost, Neural Nets",
    challenges: "Choosing models that balance accuracy and explainability",
  },
  "Model Training": {
    example: "Use cross-validation, tune hyperparameters with grid search",
    challenges: "Avoiding overfitting while maximizing performance",
  },
  "Model Evaluation": {
    example: "Calculate accuracy, precision, recall, F1-score, AUC-ROC",
    challenges: "Selecting the right metrics for business goals",
  },
  "Optimization": {
    example: "Fine-tune learning rate, regularization, architecture",
    challenges: "Balancing model complexity with inference speed",
  },
};

const PipelineTooltip: React.FC<PipelineTooltipProps> = ({ stepLabel, description }) => {
  const content = tooltipContent[stepLabel];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-1 rounded-full hover:bg-portfolio-accent/20 transition-colors">
            <Info className="w-4 h-4 text-portfolio-accent" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs bg-[#182437] border-portfolio-accent/30">
          <div className="space-y-2">
            <p className="text-sm text-gray-300">{description}</p>
            {content && (
              <>
                <div className="pt-2 border-t border-portfolio-accent/20">
                  <p className="text-xs font-semibold text-portfolio-accent mb-1">Example:</p>
                  <p className="text-xs text-gray-400">{content.example}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-portfolio-accent mb-1">Challenge:</p>
                  <p className="text-xs text-gray-400">{content.challenges}</p>
                </div>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PipelineTooltip;
