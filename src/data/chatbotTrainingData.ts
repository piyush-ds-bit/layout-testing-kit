// Custom training data for chatbot - exact answers for tagged questions
// DO NOT modify answers without updating training documentation

export interface TrainingTag {
  tag: string;
  keywords: string[];
  sampleQuestions: string[];
  answer: string;
}

export const trainingData: TrainingTag[] = [
  {
    tag: "introduction",
    keywords: [
      "who is piyush",
      "tell me about piyush",
      "introduction",
      "owner of this website",
      "piyush kumar singh",
      "who are you",
      "about piyush",
      "detailed introduction"
    ],
    sampleQuestions: [
      "Who is Piyush?",
      "Tell me about Piyush Kumar Singh.",
      "Give a detailed introduction of Piyush.",
      "Who is the owner of this website?"
    ],
    answer: "Hello! My name is Piyush Kumar Singh, and I am currently pursuing my B.Tech in Applied Electronics and Instrumentation Engineering (AEIE) at Haldia Institute of Technology, batch 2023–2027.\n\nI come from a strong technical background, and over the years, I've developed a deep interest in Data Science, Machine Learning, and full-stack application development. This passion has shaped the entire direction of my career.\n\nFrom early college days, I've been fascinated by how data solves real-world problems. I learned Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, and gradually moved from analysis to building ML models and deploying them as apps.\n\nI see myself as a passionate learner who loves experimenting, exploring tools, and converting ideas into working solutions."
  },
  {
    tag: "skills",
    keywords: [
      "skills",
      "tech stack",
      "programming languages",
      "what does he know",
      "technologies",
      "tools",
      "expertise",
      "technical skills"
    ],
    sampleQuestions: [
      "What skills does Piyush have?",
      "What is his tech stack?",
      "What programming languages does he know?"
    ],
    answer: "Piyush is skilled in Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Streamlit, FastAPI, Flutter, Docker, Supabase, HTML/CSS basics, DSA using Python, ML model development, deployment, problem-solving, and data analysis."
  },
  {
    tag: "projects",
    keywords: [
      "projects",
      "ml projects",
      "applications",
      "work",
      "built",
      "developed",
      "portfolio projects",
      "what has he built"
    ],
    sampleQuestions: [
      "What projects has Piyush worked on?",
      "Show his ML projects.",
      "Tell me about his applications."
    ],
    answer: "Piyush has built:\n1. WhatsApp Buddy – Chat Analyzer (Streamlit + NLP insights)\n2. MovieMate – Movie Recommender System (content-based, poster fetching)\n3. Insurance Premium Predictor (ML model + FastAPI + Streamlit)\n4. Portfolio Website (Lovable.ai + Supabase + Admin Panel)\n5. Autonomous Obstacle-Avoiding Cleaning Car (ultrasonic sensor + autopilot cleaning)"
  },
  {
    tag: "achievements",
    keywords: [
      "achievements",
      "events",
      "certifications",
      "awards",
      "accomplishments",
      "recognition",
      "participated"
    ],
    sampleQuestions: [
      "What achievements does he have?",
      "Any events or certifications?"
    ],
    answer: "Achievements include:\n- Delivered PPT presentation at Jadavpur University (ISA event)\n- Appeared for TiHAN IIT Hyderabad × Masai AI & Drone Qualifier Exam\n- Participated in ML hackathons and coding competitions\n- Deployed multiple ML applications in early college years"
  },
  {
    tag: "mini_project",
    keywords: [
      "mini project",
      "2nd year project",
      "hardware project",
      "cleaning car",
      "autonomous car",
      "obstacle avoiding"
    ],
    sampleQuestions: [
      "Tell me about his 2nd year mini project.",
      "What hardware projects did he do?"
    ],
    answer: "He worked on an Autonomous Obstacle-Avoiding Cleaning Car using ultrasonic sensors to navigate and automatically mop floors. He handled circuit integration and logic development as part of a 6-member team."
  },
  {
    tag: "goals",
    keywords: [
      "career goal",
      "goal",
      "ambition",
      "future plans",
      "what does he want",
      "become",
      "aspirations"
    ],
    sampleQuestions: [
      "What is his career goal?",
      "What does Piyush want to become?"
    ],
    answer: "Piyush's long-term goal is to become a Machine Learning Engineer or Data Scientist and build impactful AI systems. He is also open to pursuing M.Tech/MS in AI/ML."
  },
  {
    tag: "personality",
    keywords: [
      "personality",
      "as a person",
      "motivates",
      "inspiration",
      "character",
      "nature",
      "what drives him"
    ],
    sampleQuestions: [
      "How is Piyush as a person?",
      "What motivates him?"
    ],
    answer: "Piyush is a disciplined, self-motivated learner. His inspiration comes from the Bhagavad Gita, ancient scriptures, and Vedic teachings, which help him stay grounded and focused."
  },
  {
    tag: "exam_events",
    keywords: [
      "exam",
      "events participated",
      "competitions",
      "contests",
      "tiHAN",
      "jadavpur",
      "hackathons"
    ],
    sampleQuestions: [
      "What events has he participated in?",
      "Any exams?"
    ],
    answer: "He presented at Jadavpur University, appeared for TiHAN IIT Hyderabad × Masai AI & Drone Exam, and participated in multiple hackathons and coding contests."
  },
  {
    tag: "dsa_practice",
    keywords: [
      "dsa",
      "data structures",
      "algorithms",
      "leetcode",
      "coding practice",
      "competitive programming",
      "problem solving practice"
    ],
    sampleQuestions: [
      "Does he practice DSA?",
      "Which platforms does he use?"
    ],
    answer: "Yes, Piyush practices DSA regularly using Python. He uses LeetCode, Kaggle, and GitHub to improve his coding and problem-solving skills."
  }
];

// Helper function to match user message against training tags
export const matchTrainingTags = (userMessage: string): TrainingTag[] => {
  const lowerMessage = userMessage.toLowerCase();
  const matchedTags: TrainingTag[] = [];

  for (const tag of trainingData) {
    // Check if any keyword matches
    const hasKeywordMatch = tag.keywords.some(keyword => 
      lowerMessage.includes(keyword.toLowerCase())
    );

    if (hasKeywordMatch) {
      matchedTags.push(tag);
    }
  }

  return matchedTags;
};
