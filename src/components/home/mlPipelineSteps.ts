
import { Wrench, Settings } from "lucide-react";
import { ReactNode } from "react";

export interface MLPipelineStep {
  label: string;
  icon: ReactNode;
  tools: string[];
  description: string;
}

export const mlPipelineSteps: MLPipelineStep[] = [
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
