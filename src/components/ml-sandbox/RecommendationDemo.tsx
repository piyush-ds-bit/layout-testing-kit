import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MovieCard from './components/MovieCard';
import { movies, Movie } from './utils/movieData';
import { tokenize, createVector, cosineSimilarity } from './utils/cosineSimilarity';

interface MovieMatch {
  movie: Movie;
  similarity: number;
  matchedKeywords: string[];
}

const RecommendationDemo: React.FC = () => {
  const [query, setQuery] = useState('sci-fi action movie with mind-bending plot');
  const [matches, setMatches] = useState<MovieMatch[]>([]);
  
  useEffect(() => {
    if (query.trim().length === 0) {
      setMatches([]);
      return;
    }
    
    const queryTokens = tokenize(query);
    
    // Compute similarity for each movie
    const results = movies.map(movie => {
      const movieText = movie.tags.join(' ');
      const movieTokens = tokenize(movieText);
      
      // Create unified vocabulary
      const vocabulary = Array.from(new Set([...queryTokens, ...movieTokens]));
      
      // Create vectors
      const queryVector = createVector(queryTokens, vocabulary);
      const movieVector = createVector(movieTokens, vocabulary);
      
      // Compute similarity
      const similarity = cosineSimilarity(queryVector, movieVector);
      
      // Find matched keywords
      const matchedKeywords = movie.tags.filter(tag => 
        queryTokens.some(token => tag.includes(token) || token.includes(tag))
      );
      
      return {
        movie,
        similarity,
        matchedKeywords
      };
    });
    
    // Sort by similarity and get top 3
    const topMatches = results
      .filter(r => r.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);
    
    setMatches(topMatches);
  }, [query]);
  
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="query" className="text-foreground mb-2 block">
          Search for Movies
        </Label>
        <Input
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe what you're looking for..."
          className="bg-background/50 border-border focus:border-accent"
        />
      </div>
      
      {matches.length > 0 ? (
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">
            Top {matches.length} Matches
          </h4>
          <div className="space-y-3">
            {matches.map((match, idx) => (
              <MovieCard 
                key={match.movie.id}
                movie={match.movie}
                similarity={match.similarity}
                matchedKeywords={match.matchedKeywords}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm">
          {query.trim().length === 0 
            ? 'Enter a search query to find matching movies' 
            : 'No matches found. Try different keywords.'}
        </div>
      )}
    </div>
  );
};

export default RecommendationDemo;
