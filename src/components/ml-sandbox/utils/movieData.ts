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
  },
  { 
    id: 8,
    title: "Stree",
    tags: ["horror", "comedy", "folklore", "small-town", "hindi"],
    poster: "🧟‍♀️"
  },
  { 
    id: 9,
    title: "Bhool Bhulaiyaa",
    tags: ["horror", "comedy", "psychological", "classic", "funny"],
    poster: "👻"
  },
  { 
    id: 10,
    title: "Go Goa Gone",
    tags: ["horror", "comedy", "zombie", "adventure", "quest"],
    poster: "🧟"
  },
  { 
    id: 11,
    title: "Shaun of the Dead",
    tags: ["horror", "comedy", "zombie", "parody", "shaun"],
    poster: "🪓"
  },
  { 
    id: 12,
    title: "Ghostbusters",
    tags: ["horror", "comedy", "supernatural", "team", "vfx"],
    poster: "👻"
  },
  { 
    id: 13,
    title: "Scary Movie",
    tags: ["horror", "comedy", "parody", "fun", "scary"],
    poster: "😱"
  },
  { 
    id: 14, 
    title: "The Godfather", 
    tags: ["crime", "mafia", "classic", "drama", "family"], 
    poster: "🎩" 
  },
  { 
    id: 15, 
    title: "The Departed", 
    tags: ["crime", "thriller", "undercover", "action", "suspense"], 
    poster: "🔫" 
  }
];
