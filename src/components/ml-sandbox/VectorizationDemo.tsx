import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import VectorTable from './components/VectorTable';
import { extractVocabulary, computeBoW, computeTFIDF } from './utils/vectorizer';

const VectorizationDemo: React.FC = () => {
  const [input, setInput] = useState('I love machine learning.\nDeep learning is amazing.\nArtificial intelligence is the future.');
  const [vocabulary, setVocabulary] = useState<string[]>([]);
  const [bowVectors, setBowVectors] = useState<number[][]>([]);
  const [tfidfVectors, setTfidfVectors] = useState<number[][]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const handleGenerate = () => {
    const sentences = input.split('\n').filter(s => s.trim().length > 0);
    
    if (sentences.length === 0) return;
    
    const vocab = extractVocabulary(sentences);
    const bow = sentences.map(s => computeBoW(s, vocab));
    const tfidf = computeTFIDF(sentences, vocab);
    
    setVocabulary(vocab);
    setBowVectors(bow);
    setTfidfVectors(tfidf);
    setIsGenerated(true);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="sentences" className="text-foreground mb-2 block">
          Enter Sentences (one per line)
        </Label>
        <Textarea
          id="sentences"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter 2-3 sentences, one per line..."
          className="bg-background/50 border-border focus:border-accent min-h-[100px] font-mono text-sm"
          rows={4}
        />
      </div>
      
      <Button 
        onClick={handleGenerate}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        Generate Vectors
      </Button>
      
      {isGenerated && (
        <div className="space-y-6">
          {/* Vocabulary */}
          <div className="border border-border rounded-lg p-4 bg-background/30">
            <h4 className="text-sm font-semibold text-foreground mb-3">Vocabulary ({vocabulary.length} terms)</h4>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {vocabulary.map((term, idx) => (
                <span 
                  key={idx}
                  className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded font-mono"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
          
          {/* Bag of Words */}
          <div className="border border-border rounded-lg p-4 bg-background/30">
            <h4 className="text-sm font-semibold text-foreground mb-3">Bag of Words (Term Frequency)</h4>
            <div className="max-h-64 overflow-y-auto">
              <VectorTable 
                vocabulary={vocabulary}
                vectors={bowVectors}
                labels={bowVectors.map((_, idx) => `S${idx + 1}`)}
                type="bow"
              />
            </div>
          </div>
          
          {/* TF-IDF */}
          <div className="border border-border rounded-lg p-4 bg-background/30">
            <h4 className="text-sm font-semibold text-foreground mb-3">TF-IDF Scores</h4>
            <div className="max-h-64 overflow-y-auto">
              <VectorTable 
                vocabulary={vocabulary}
                vectors={tfidfVectors}
                labels={tfidfVectors.map((_, idx) => `S${idx + 1}`)}
                type="tfidf"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VectorizationDemo;
