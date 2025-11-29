import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import VectorVisualization from './components/VectorVisualization';
import { computeTextSimilarity } from './utils/cosineSimilarity';

const CosineSimilarityDemo: React.FC = () => {
  const [textA, setTextA] = useState('machine learning artificial intelligence');
  const [textB, setTextB] = useState('deep learning neural networks');
  const [similarity, setSimilarity] = useState(0);
  
  useEffect(() => {
    const sim = computeTextSimilarity(textA, textB);
    setSimilarity(sim);
  }, [textA, textB]);
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="textA" className="text-foreground mb-2 block">Text A</Label>
          <Input
            id="textA"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="Enter first text..."
            className="bg-background/50 border-border focus:border-accent"
          />
        </div>
        
        <div>
          <Label htmlFor="textB" className="text-foreground mb-2 block">Text B</Label>
          <Input
            id="textB"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder="Enter second text..."
            className="bg-background/50 border-border focus:border-accent"
          />
        </div>
      </div>
      
      <div className="border border-border rounded-lg p-4 bg-background/30">
        <div className="text-center mb-4">
          <div className="text-sm text-muted-foreground mb-2">Cosine Similarity</div>
          <div className="text-4xl font-bold text-accent">
            {(similarity * 100).toFixed(1)}%
          </div>
        </div>
        
        <VectorVisualization similarity={similarity} />
      </div>
    </div>
  );
};

export default CosineSimilarityDemo;
