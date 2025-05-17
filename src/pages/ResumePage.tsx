
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
            <Button 
              className="bg-portfolio-accent text-white hover:bg-portfolio-accent/80 flex items-center gap-2 mb-8"
            >
              <FileDown size={20} />
              <span>Download Resume</span>
            </Button>
            
            <div className="portfolio-card w-full max-w-4xl">
              <div className="space-y-6">
                {/* Resume Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-portfolio-accent mb-2">Piyush Kr. Singh</h1>
                  <p className="text-gray-400">Data Scientist · AI & ML Enthusiast · Python & Streamlit Developer</p>
                  <div className="flex justify-center items-center gap-6 mt-4 text-sm text-gray-400">
                    <span>piyush@example.com</span>
                    <span>+91 98765 43210</span>
                    <span>New Delhi, India</span>
                  </div>
                </div>
                
                {/* Education */}
                <div>
                  <h3 className="text-xl font-bold text-white border-b border-portfolio-accent pb-2 mb-4">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">Computer Science and Engineering</h4>
                        <span className="text-portfolio-accent">2021 - 2025</span>
                      </div>
                      <p className="text-gray-400">Indian Institute of Technology, Delhi</p>
                      <p className="text-gray-500 text-sm mt-1">CGPA: 8.9/10</p>
                    </div>
                  </div>
                </div>
                
                {/* Experience */}
                <div>
                  <h3 className="text-xl font-bold text-white border-b border-portfolio-accent pb-2 mb-4">Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">Intern</h4>
                        <span className="text-portfolio-accent">Jan 2025 - Present</span>
                      </div>
                      <p className="text-gray-400">Taar</p>
                      <ul className="list-disc list-inside text-gray-500 mt-2">
                        <li>Working on mobile application development using Flutter and Dart</li>
                        <li>Implemented UI components and integrated with backend services</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">Intern</h4>
                        <span className="text-portfolio-accent">Jul 2024 - Jan 2025</span>
                      </div>
                      <p className="text-gray-400">NutriScan App</p>
                      <ul className="list-disc list-inside text-gray-500 mt-2">
                        <li>Developed a nutrition tracking application using computer vision</li>
                        <li>Built ML model to identify food items from images</li>
                        <li>Designed and implemented the mobile application interface</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Skills */}
                <div>
                  <h3 className="text-xl font-bold text-white border-b border-portfolio-accent pb-2 mb-4">Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Languages</h4>
                      <p className="text-gray-400">C++, Python, Java, JavaScript, HTML, CSS</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Frameworks</h4>
                      <p className="text-gray-400">Flutter, React, Spring Boot, TensorFlow, PyTorch</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Databases</h4>
                      <p className="text-gray-400">MongoDB, Supabase, Firebase, MySQL</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Tools</h4>
                      <p className="text-gray-400">Git, Docker, VS Code, Figma, Postman</p>
                    </div>
                  </div>
                </div>
                
                {/* Projects */}
                <div>
                  <h3 className="text-xl font-bold text-white border-b border-portfolio-accent pb-2 mb-4">Projects</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">ML-Powered Nutrition Tracker</h4>
                        <span className="text-portfolio-accent">2024</span>
                      </div>
                      <p className="text-gray-500 mt-2">
                        Developed a mobile application that uses computer vision to identify food items and calculate nutritional information.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-lg font-semibold">Personal Portfolio Website</h4>
                        <span className="text-portfolio-accent">2023</span>
                      </div>
                      <p className="text-gray-500 mt-2">
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
