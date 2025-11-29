export interface Movie {
  id: number;
  title: string;
  tags: string[];
  poster: string;
}

export const movies: Movie[] = [
  { 
    id: 1, 
    title: "Inception", 
    tags: ["sci-fi", "thriller", "mind-bending", "dreams", "action"], 
    poster: "🎬" 
  },
  { 
    id: 2, 
    title: "The Matrix", 
    tags: ["sci-fi", "action", "cyberpunk", "reality", "philosophy"], 
    poster: "🤖" 
  },
  { 
    id: 3, 
    title: "Interstellar", 
    tags: ["sci-fi", "space", "time", "emotional", "adventure"], 
    poster: "🚀" 
  },
  { 
    id: 4, 
    title: "The Shawshank Redemption", 
    tags: ["drama", "hope", "prison", "friendship", "redemption"], 
    poster: "🏛️" 
  },
  { 
    id: 5, 
    title: "The Dark Knight", 
    tags: ["action", "thriller", "superhero", "crime", "batman"], 
    poster: "🦇" 
  },
  { 
    id: 6, 
    title: "Pulp Fiction", 
    tags: ["crime", "drama", "nonlinear", "dialogue", "gangster"], 
    poster: "🔫" 
  },
  { 
    id: 7, 
    title: "Forrest Gump", 
    tags: ["drama", "history", "romance", "inspirational", "heartwarming"], 
    poster: "🏃" 
  }
];
