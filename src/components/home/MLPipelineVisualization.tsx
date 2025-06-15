import React, { useState } from "react";
import { Wrench, Settings, ArrowLeft, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

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

const ArrowRightSvg = () => (
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

const MLPipelineVisualization: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  // Pyramid rows for desktop layout
  const row1 = steps.slice(0, 4);
  const row2 = steps.slice(4, 7);
  const row3 = steps.slice(7, 9);

  // Utility for rendering a node (keeps card logic the same)
  const renderNode = (step: typeof steps[number], idx: number, gIdx: number) => (
    <button
      key={step.label}
      className={`
        portfolio-card-hover flex flex-col items-center justify-center
        py-6 px-3 md:py-7 md:px-4 mb-2 md:mb-0
        bg-[#182437]/80 border-2 border-portfolio-accent
        transition-all duration-300 relative
        ${expandedIndex === gIdx ? "z-20" : ""}
        ${isMobile ? "w-full min-w-[240px] max-w-[320px] mx-auto" : ""}
      `}
      style={{
        minWidth: isMobile ? 240 : 136,
        maxWidth: isMobile ? 320 : 175,
        boxShadow: expandedIndex === gIdx
          ? "0 0 16px 4px #4fd1c5cc, 0 6px 32px #4fd1c520"
          : undefined,
        transform: expandedIndex === gIdx ? "scale(1.055)" : undefined
      }}
      aria-expanded={expandedIndex === gIdx}
      onClick={() => setExpandedIndex(expandedIndex === gIdx ? null : gIdx)}
    >
      <div className={`text-2xl md:text-4xl mb-2 md:mb-3 select-none pulse`} style={{
        filter: "drop-shadow(0 0 6px #4fd1c5aa)",
      }}>
        {typeof step.icon === "string" ? step.icon : step.icon}
      </div>
      <div className="text-sm md:text-lg font-semibold text-white text-center drop-shadow mb-1 md:mb-2">
        {step.label}
      </div>
      <div className="w-1 h-1 bg-portfolio-accent rounded-full mb-1" />
      {expandedIndex === gIdx && (
        <div className="animate-fade-in mt-2 md:mt-3 mb-0 px-1 md:px-2">
          <div className="text-portfolio-accent font-medium mb-1 text-xs md:text-[14px] text-center">
            Tools:
          </div>
          <ul className="space-y-1 text-gray-300 text-xs md:text-[14px] text-left list-disc list-inside">
            {step.tools.map((tool, i) =>
              <li key={i} className="pl-2">{tool}</li>
            )}
          </ul>
          <div className="mt-2 text-gray-400 text-[11px] md:text-xs text-center">
            {step.description}
          </div>
        </div>
      )}
    </button>
  );

  return (
    <section
      className="portfolio-section py-10 pb-0 md:py-12"
      style={{ position: "relative", zIndex: 3 }}
      id="ml-pipeline"
    >
      <div className="portfolio-container">
        <h2 className="portfolio-heading mb-7 md:mb-10">
          ML Pipeline Visualization
        </h2>

        {/* MOBILE: Horizontal carousel with arrows */}
        <div className="block md:hidden w-full">
          <Carousel className="relative w-full">
            <CarouselContent className="flex items-stretch">
              {steps.map((step, idx) => (
                <CarouselItem key={step.label} className="flex items-center justify-center px-2 py-4">
                  {renderNode(step, idx, idx)}
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Arrows */}
            <CarouselPrevious
              className="left-1 top-1/2 -translate-y-1/2 z-10 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent"
              aria-label="Previous Step"
            >
              <ArrowLeft />
            </CarouselPrevious>
            <CarouselNext
              className="right-1 top-1/2 -translate-y-1/2 z-10 bg-portfolio-dark/80 border-portfolio-accent text-portfolio-accent"
              aria-label="Next Step"
            >
              <ArrowRight />
            </CarouselNext>
          </Carousel>
        </div>

        {/* DESKTOP: Pyramid 4-3-2 with only horizontal and down arrows */}
        <div className="hidden md:flex flex-col items-center gap-0 w-full">
          {/* Row 1 - 4 steps */}
          <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
            {row1.map((step, idx) => (
              <React.Fragment key={step.label}>
                {renderNode(step, idx, idx)}
                {idx < row1.length - 1 && <ArrowRightSvg />}
              </React.Fragment>
            ))}
          </div>
          {/* Down arrow to row 2 */}
          <div className="flex justify-center mb-2 md:mb-6">
            <ArrowDown />
          </div>
          {/* Row 2 - 3 steps */}
          <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
            {row2.map((step, idx) => (
              <React.Fragment key={step.label}>
                {renderNode(step, idx, idx + 4)}
                {idx < row2.length - 1 && <ArrowRightSvg />}
              </React.Fragment>
            ))}
          </div>
          {/* Down arrow to row 3 */}
          <div className="flex justify-center mb-2 md:mb-6">
            <ArrowDown />
          </div>
          {/* Row 3 - 2 steps */}
          <div className="flex flex-row justify-center items-start gap-4 mb-2 md:mb-6">
            {row3.map((step, idx) => (
              <React.Fragment key={step.label}>
                {renderNode(step, idx, idx+7)}
                {idx < row3.length - 1 && <ArrowRightSvg />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="text-xs text-center text-gray-500 mt-7 select-none">
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
