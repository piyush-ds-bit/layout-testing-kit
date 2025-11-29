/**
 * Tokenizes text into lowercase words
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
}

/**
 * Creates a term frequency vector based on vocabulary
 */
export function createVector(tokens: string[], vocabulary: string[]): number[] {
  const termFrequency: { [key: string]: number } = {};
  
  tokens.forEach(token => {
    termFrequency[token] = (termFrequency[token] || 0) + 1;
  });
  
  return vocabulary.map(term => termFrequency[term] || 0);
}

/**
 * Computes cosine similarity between two vectors
 * Returns a value between 0 (completely different) and 1 (identical)
 */
export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length');
  }
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }
  
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Computes similarity between two text strings
 */
export function computeTextSimilarity(textA: string, textB: string): number {
  const tokensA = tokenize(textA);
  const tokensB = tokenize(textB);
  
  if (tokensA.length === 0 || tokensB.length === 0) {
    return 0;
  }
  
  // Create unified vocabulary
  const vocabulary = Array.from(new Set([...tokensA, ...tokensB]));
  
  // Create vectors
  const vectorA = createVector(tokensA, vocabulary);
  const vectorB = createVector(tokensB, vocabulary);
  
  return cosineSimilarity(vectorA, vectorB);
}
