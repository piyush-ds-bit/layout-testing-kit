import React, { useState } from "react";
import { Wrench, Settings } from "lucide-react";

const steps = [
  {
    label: "Frame the Problem",
    icon: "🧠",
    tools: [
      "Pen & paper",
      "Real-world use cases",
      "Markdown/Google Docs",
    ],
    description: "Define the ML problem, goals, and success criteria."
  },
  {
    label: "Data Collection",
    icon: "📊",
    tools: [
      "Pandas (CSV/Excel)",
      "BeautifulSoup (web scraping)",
      "Kaggle Datasets"
    ],
    description: "Gather data from various sources for analysis."
  },
  {
    label: "Preprocessing",
    icon: "🧹",
    tools: [
      "Pandas (cleaning, handling nulls)",
      "NumPy (array operations)",
      "scikit-learn (StandardScaler, LabelEncoder)",
      "NLTK / TextBlob / Regex (text cleanup for NLP)"
    ],
    description: "Clean and transform raw data into usable format."
  },
  {
    label: "EDA",
    icon: "🔎",
    tools: [
      "Matplotlib",
      "Seaborn",
      "Pandas Profiling"
    ],
    description: "Explore, visualize, and summarize key data insights."
  },
  {
    label: "Feature Engineering",
    icon: <Wrench className="inline w-6 h-6 text-portfolio-accent" />,
    tools: [
      "Pandas (column creation/transformation)",
      "scikit-learn (OrdinalEncoder, OneHotEncoder)",
      "Domain knowledge",
      "CountVectorizer (for NLP)"
    ],
    description: "Create new features to help models learn better patterns."
  },
  {
    label: "Model Training/Evaluation/Selection",
    icon: "🤖",
    tools: [
      "scikit-learn (Logistic Regression, Decision Trees, etc.)",
      "GridSearchCV, cross_val_score (for tuning)",
      "Precision/Recall"
    ],
    description: "Build models, evaluate, and select the best."
  },
  {
    label: "Deployment",
    icon: "🚀",
    tools: [
      "Streamlit (web app interface)",
      "Heroku",
      "AWS"
    ],
    description: "Deploy models to production."
  },
  {
    label: "Testing",
    icon: <Settings className="inline w-6 h-6 text-portfolio-accent" />,
    tools: [
      "FastAPI (API testing)",
      "Manual testing via Streamlit UI"
    ],
    description: "Test application endpoints, UI, and integration."
  },
  {
    label: "Optimization",
    icon: "⚡",
    tools: [
      "GridSearchCV",
      "RandomizedSearchCV"
    ],
    description: "Tune and improve model/system performance."
  }
];

const AnimatedArrow = () => (
  <div className="flex items-center justify-center">
    <svg
      className="w-8 h-8 md:w-10 md:h-10 animate-bounce-x"
      viewBox="0 0 48 48"
      fill="none"
    >
      <defs>
        <linearGradient id="arrow-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4fd1c5"/>
          <stop offset="1" stopColor="#38b2ac"/>
        </linearGradient>
        <filter id="glow" x="-6" y="-6" width="60" height="60">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#4fd1c566"/>
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#4fd1c5cc"/>
        </filter>
      </defs>
      <path
        d="M7 24h28M27 13l10 11-10 11"
        stroke="url(#arrow-gradient)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        filter="url(#glow)"
      />
    </svg>
  </div>
);

// Tailwind config for animation
// .animate-bounce-x { animation: bounceX 1.2s infinite alternate; }
// @keyframes bounceX { 0% { transform: translateX(0); } 100% { transform: translateX(8px); } }

const MLPipelineVisualization: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Responsive: horizontal scroll on mobile, grid on md+
  return (
    <section
      className="portfolio-section py-12 pb-0"
      style={{ position: "relative", zIndex: 3 }}
      id="ml-pipeline"
    >
      <div className="portfolio-container">
        <h2 className="portfolio-heading mb-10">
          ML Pipeline Visualization
        </h2>
        {/* Mobile: horizontal scroll / Desktop: grid flow */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex md:grid md:grid-cols-9 gap-0 md:gap-0 items-start justify-center px-2 md:px-0">
            {steps.map((step, idx) => (
              <React.Fragment key={step.label}>
                {/* Node */}
                <div
                  className={`
                    group flex flex-col items-center
                    transition-transform duration-300
                    relative z-10
                    mx-2 min-w-[148px] md:min-w-0
                    `}
                >
                  {/* Glowing/Nodal Card */}
                  <button
                    className={`
                      portfolio-card-hover
                      flex flex-col items-center justify-center
                      py-6 px-3 md:p-6
                      mb-2 md:mb-0
                      bg-[#182437]/80 
                      border-2 border-portfolio-accent 
                      transition-all
                      duration-300
                      relative
                      group-hover:scale-105
                      group-hover:shadow-xl
                      active:scale-100
                    `}
                    style={{
                      minWidth: 130,
                      maxWidth: 180,
                      boxShadow: expandedIndex === idx
                        ? "0 0 16px 4px #4fd1c5cc, 0 6px 32px #4fd1c520"
                        : undefined,
                      transform: expandedIndex === idx ? "scale(1.055)" : undefined
                    }}
                    aria-expanded={expandedIndex === idx}
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  >
                    <div className={`text-3xl md:text-4xl mb-3 select-none pulse`} style={{
                      filter: "drop-shadow(0 0 6px #4fd1c5aa)",
                    }}>
                      {/* Use node icon */}
                      {typeof step.icon === "string" ? step.icon : step.icon}
                    </div>
                    <div className="text-[16px] md:text-lg font-semibold text-white text-center drop-shadow mb-2">
                      {step.label}
                    </div>
                    <div className="w-1 h-1 bg-portfolio-accent rounded-full mb-1" />
                    {expandedIndex === idx && (
                      <div className="animate-fade-in mt-3 mb-2 px-2">
                        <div className="text-portfolio-accent font-medium mb-1 text-[14px] text-center">Tools:</div>
                        <ul className="space-y-1 text-gray-300 text-[14px] text-left list-disc list-inside">
                          {step.tools.map((tool, i) =>
                            <li key={i} className="pl-2">{tool}</li>
                          )}
                        </ul>
                        <div className="mt-2 text-gray-400 text-xs text-center">{step.description}</div>
                      </div>
                    )}
                  </button>
                </div>
                {/* Arrow (no arrow after last node) */}
                {idx < steps.length - 1 &&
                  <div className="hidden md:flex">
                    <AnimatedArrow />
                  </div>
                }
                {/* On mobile, show arrow below node */}
                {idx < steps.length - 1 &&
                  <div className="md:hidden flex justify-center">
                    <div className="my-2">
                      <svg className="w-6 h-6 animate-bounce-x" viewBox="0 0 59 16" fill="none">
                        <defs>
                          <linearGradient id="arrow-grad-mob" x1="0" y1="8" x2="48" y2="8" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#4fd1c5"/>
                            <stop offset="1" stopColor="#38b2ac"/>
                          </linearGradient>
                        </defs>
                        <path
                          d="M1 8h44M45 4l7 4-7 4"
                          stroke="url(#arrow-grad-mob)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                          filter="url(#glow)"
                        />
                      </svg>
                    </div>
                  </div>
                }
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="text-xs text-center text-gray-500 mt-8 select-none">
          Tap/click a step to see the tools and details.
        </div>
      </div>
      {/* Extra CSS for arrow bounce animation */}
      <style>
        {`
        @keyframes bounceX { 0% { transform: translateX(0); } 100% { transform: translateX(10px); } }
        .animate-bounce-x { animation: bounceX 1.2s infinite alternate; }
        .pulse { animation: pulseGlow 1.9s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes pulseGlow {
          0% { text-shadow: 0 0 4px #4fd1c5cc, 0 0 8px #4fd1c588;}
          50% { text-shadow: 0 0 20px #4fd1c5f0, 0 0 12px #4fd1c5a0;}
          100% { text-shadow: 0 0 4px #4fd1c5cc, 0 0 8px #4fd1c588;}
        }
        `}
      </style>
    </section>
  );
};

export default MLPipelineVisualization;
