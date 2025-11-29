import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import CosineSimilarityDemo from './CosineSimilarityDemo';
import VectorizationDemo from './VectorizationDemo';
import RecommendationDemo from './RecommendationDemo';

const MLSandboxSection: React.FC = () => {
  return (
    <div 
      className="h-full bg-[#182437]/70 border border-[#4fd1c533] rounded-2xl shadow-2xl backdrop-blur-md p-6 lg:p-8 flex flex-col"
      style={{
        boxShadow: '0 6px 32px 0 rgba(76,201,240,0.14), 0 2px 8px rgba(10,20,30,0.18), 0 1.5px 36px 0 rgba(0,0,0,0.13)'
      }}
    >
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">
        ML Sandbox
      </h2>
      
      <p className="text-sm text-muted-foreground mb-6">
        Interactive Machine Learning Demos
      </p>
      
      <Tabs defaultValue="similarity" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="similarity" className="text-xs lg:text-sm">
            Similarity
          </TabsTrigger>
          <TabsTrigger value="vectorizer" className="text-xs lg:text-sm">
            Vectorizer
          </TabsTrigger>
          <TabsTrigger value="recommender" className="text-xs lg:text-sm">
            Recommender
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-y-auto pr-2">
          <TabsContent value="similarity" className="mt-0">
            <CosineSimilarityDemo />
          </TabsContent>
          
          <TabsContent value="vectorizer" className="mt-0">
            <VectorizationDemo />
          </TabsContent>
          
          <TabsContent value="recommender" className="mt-0">
            <RecommendationDemo />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MLSandboxSection;
