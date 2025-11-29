import React from 'react';
import { Movie } from '../utils/movieData';

interface MovieCardProps {
  movie: Movie;
  similarity: number;
  matchedKeywords: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, similarity, matchedKeywords }) => {
  return (
    <div className="bg-card/50 border border-border rounded-lg p-4 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
      <div className="flex items-start gap-4">
        {/* Poster */}
        <div className="text-4xl flex-shrink-0">{movie.poster}</div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-2 truncate">{movie.title}</h4>
          
          {/* Similarity Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Match</span>
              <span className="font-mono">{(similarity * 100).toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                style={{ width: `${similarity * 100}%` }}
              />
            </div>
          </div>
          
          {/* Matched Keywords */}
          {matchedKeywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {matchedKeywords.map((keyword, idx) => (
                <span 
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full border border-accent/30"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
