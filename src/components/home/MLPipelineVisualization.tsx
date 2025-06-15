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
    label: "Model Train/Evaluate",
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

// Helper for rendering arrows
const ArrowDown = () => (
  <svg className="w-7 h-7 mx-auto my-2" viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="arrow-down-gradient" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4fd1c5"/>
        <stop offset="1" stopColor="#38b2ac"/>
      </linearGradient>
    </defs>
    <path d="M16 8v16M8 20l8 8 8-8" stroke="url(#arrow-down-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-9 h-6 my-auto" viewBox="0 0 32 16" fill="none">
    <defs>
      <linearGradient id="arrow-right-gradient" x1="0" y1="8" x2="32" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4fd1c5"/>
        <stop offset="1" stopColor="#38b2ac"/>
      </linearGradient>
    </defs>
    <path d="M2 8h24M25 4l5 4-5 4" stroke="url(#arrow-right-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// For diagonal arrows (down right or down left)
const ArrowDiagonal = ({ right = true }: { right?: boolean }) => (
  <svg className="w-8 h-8 mx-auto my-1" viewBox="0 0 32 32" fill="none" style={{ transform: right ? "" : "scaleX(-1)" }}>
    <defs>
      <linearGradient id="arrow-diag-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4fd1c5"/>
        <stop offset="1" stopColor="#38b2ac"/>
      </linearGradient>
    </defs>
    <path d="M4 10l24 14" stroke="url(#arrow-diag-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 24l6 0-4-5" stroke="url(#arrow-diag-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MLPipelineVisualization: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Pyramid rows
  const row1 = steps.slice(0, 4);
  const row2 = steps.slice(4, 7);
  const row3 = steps.slice(7, 9);

  // Utility for rendering a node (keeps card logic the same)
  const renderNode = (step: typeof steps[number], idx: number, gIdx: number) => (
    <button
      key={step.label}
      className={`
        portfolio-card-hover flex flex-col items-center justify-center
        py-7 px-4 md:p-7 mb-2 md:mb-0
        bg-[#182437]/80 border-2 border-portfolio-accent
        transition-all duration-300 relative
        ${expandedIndex === gIdx ? "z-20" : ""}
      `}
      style={{
        minWidth: 136,
        maxWidth: 175,
        boxShadow: expandedIndex === gIdx
          ? "0 0 16px 4px #4fd1c5cc, 0 6px 32px #4fd1c520"
          : undefined,
        transform: expandedIndex === gIdx ? "scale(1.055)" : undefined
      }}
      aria-expanded={expandedIndex === gIdx}
      onClick={() => setExpandedIndex(expandedIndex === gIdx ? null : gIdx)}
    >
      <div className={`text-3xl md:text-4xl mb-3 select-none pulse`} style={{
        filter: "drop-shadow(0 0 6px #4fd1c5aa)",
      }}>
        {/* Use node icon */}
        {typeof step.icon === "string" ? step.icon : step.icon}
      </div>
      <div className="text-[15px] md:text-lg font-semibold text-white text-center drop-shadow mb-2">
        {step.label}
      </div>
      <div className="w-1 h-1 bg-portfolio-accent rounded-full mb-1" />
      {expandedIndex === gIdx && (
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
  );

  // Responsive: On mobile, stack vertically by steps (normal flow)
  // On md+, display pyramid
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

        {/* Pyramid Layout */}
        <div className="w-full flex flex-col items-center gap-0">
          {/* Row 1 - 4 steps */}
          <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
            {row1.map((step, idx) => (
              <React.Fragment key={step.label}>
                {renderNode(step, idx, idx)}
                {idx < row1.length - 1 && <ArrowRight />}
              </React.Fragment>
            ))}
          </div>

          {/* Down arrows from row 1 → row 2 */}
          <div className="w-full flex flex-row justify-center items-center mb-2 md:mb-6 gap-0">
            {[0,1,2,3].map(idx => {
              // Positions: row1[0] -> row2[0], row1[1] -> row2[0]/[1], row1[2] -> row2[1]/[2], row1[3] -> row2[2]
              if(idx === 0) return <div key={idx} className="flex-1 flex justify-end"><ArrowDiagonal right /></div>;
              if(idx === 1) return <div key={idx} className="flex-1 flex justify-center"><ArrowDiagonal right={false} /></div>;
              if(idx === 2) return <div key={idx} className="flex-1 flex justify-center"><ArrowDiagonal right /></div>;
              if(idx === 3) return <div key={idx} className="flex-1 flex justify-start"><ArrowDiagonal right={false} /></div>;
              return null;
            })}
          </div>

          {/* Row 2 - 3 steps */}
          <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
            {row2.map((step, idx) => (
              <React.Fragment key={step.label}>
                {renderNode(step, idx, idx + 4)}
                {idx < row2.length - 1 && <ArrowRight />}
              </React.Fragment>
            ))}
          </div>

          {/* Down arrows from row 2 → row 3 */}
          <div className="w-full flex flex-row justify-center items-center mb-2 md:mb-6 gap-0">
            {[0,1,2].map(idx => {
              // Positions: row2[0] -> row3[0], row2[1] -> row3[0/1], row2[2] -> row3[1]
              if(idx === 0) return <div key={idx} className="flex-1 flex justify-end"><ArrowDiagonal right /></div>;
              if(idx === 1) return <div key={idx} className="flex-1 flex justify-center"><ArrowDown /></div>;
              if(idx === 2) return <div key={idx} className="flex-1 flex justify-start"><ArrowDiagonal right={false} /></div>;
              return null;
            })}
          </div>

          {/* Row 3 - 2 steps */}
          <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
            {row3.map((step, idx) => (
              <React.Fragment key={step.label}>
                {renderNode(step, idx, idx+7)}
                {idx < row3.length - 1 && <ArrowRight />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="text-xs text-center text-gray-500 mt-8 select-none">
          Tap/click a step to see the tools and details.
        </div>
      </div>
      <style>
        {`
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
