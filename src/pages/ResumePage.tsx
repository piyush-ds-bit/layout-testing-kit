
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

const ResumePage: React.FC = () => {
  return (
    <Layout>
      <section className="portfolio-section">
        <div className="portfolio-container">
          <h2 className="portfolio-heading">My Resume</h2>
          
          <div className="flex flex-col items-center mb-8">
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button 
                className="bg-portfolio-accent text-white hover:bg-portfolio-accent/80 flex items-center gap-2 mb-8"
              >
                <FileDown size={20} />
                <span>Download Resume</span>
              </Button>
            </a>
            
            <div className="portfolio-card w-full max-w-4xl">
              <div className="space-y-6">
                {/* Resume Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-portfolio-accent mb-2">Piyush Kr. Singh</h1>
                  <p className="text-gray-400">Data Scientist · AI & ML Enthusiast · Python & Streamlit Developer</p>
                  <div className="flex justify-center items-center gap-6 mt-4 text-sm text-gray-400">
                    <span>piyushjuly04@gmail.com</span>
                    <span>+91 9832301304</span>
                    <span>Kolkata, Bharat</span>
                  </div>
                </div>

                {/* Profile */}
                <div>
                  <h3 className="text-xl font-bold text-white border-b border-portfolio-accent pb-2 mb-4">Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">About</h4>
                      </div>
                      <p className="text-gray-300">• Aspiring Data Scientist skilled in Python, data analysis, and machine learning.</p>
                      <p className="text-gray-300">• Experienced in training machine learning models and building interactive GUIs using Streamlit and Flutter to deploy them.</p>
                      <p className="text-gray-300">• Passionate about solving real-world problems with clean code and meaningful insights.</p>
                    </div>
                  </div>
                </div>
                
                {/* Education */}
                <div>
                  <h3 className="text-xl font-bold text-white border-b border-portfolio-accent pb-2 mb-4">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">Applied Electronics and Instrumentation Engineering</h4>
                        <span className="text-portfolio-accent">2023 - 2027</span>
                      </div>
                      <p className="text-gray-300">Haldia Institute of Technology, Haldia</p>
                    </div>
                  </div>
                </div>
              
                
                {/* Skills */}
                <div>
                  <h3 className="text-xl font-bold text-white border-b border-portfolio-accent pb-2 mb-4">Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Programming</h4>
                      <p className="text-gray-400">Python, SQL, YAML, Dart, HTML/CSS (Basics)</p>
                    </div>
                
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Libraries & Frameworks</h4>
                      <p className="text-gray-400">Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow</p>
                    </div>
                
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Web & Tools</h4>
                      <p className="text-gray-400">Streamlit, FastAPI, Pydantic, Flutter</p>
                    </div>
                
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Databases</h4>
                      <p className="text-gray-400">Supabase, SQLite</p>
                    </div>
                
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Tools</h4>
                      <p className="text-gray-400">IntelliJ, Jupyter Notebook, PyCharm, Google Colab, Kaggle</p>
                    </div>
                
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Other</h4>
                      <p className="text-gray-400">Problem Solving (LeetCode), Git</p>
                    </div>
                    
                  </div>
                </div>

                
                {/* Projects */}
                <div>
                  <h3 className="text-xl font-bold text-white border-b border-portfolio-accent pb-2 mb-4">Projects</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">WhatsApp Chat Analyzer</h4>
                        <span className="text-portfolio-accent">2025</span>
                      </div>
                      <p className="text-gray-300 mt-2">
                         Developed a Streamlit-based WhatsApp chat analyzer with sentiment & chat analysis.
                      </p>
                    </div>

                      <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">Movie Recommender System</h4>
                        <span className="text-portfolio-accent">2025</span>
                      </div>
                      <p className="text-gray-300 mt-2">
                          Built a content-based movie recommender using Bag-of-Words with a dataset of 5000+ movies.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">Personal Portfolio Website</h4>
                        <span className="text-portfolio-accent">2025</span>
                      </div>
                      <p className="text-gray-300 mt-2">
                        Designed and developed a personal portfolio website using React, Tailwind CSS, and Supabase.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResumePage;
