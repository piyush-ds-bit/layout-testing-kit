/**
 * Extracts unique vocabulary from sentences
 */
export function extractVocabulary(sentences: string[]): string[] {
  const allWords = sentences
    .join(' ')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  return Array.from(new Set(allWords)).sort();
}

/**
 * Computes Bag of Words vector for a sentence
 */
export function computeBoW(sentence: string, vocabulary: string[]): number[] {
  const words = sentence
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  const termFrequency: { [key: string]: number } = {};
  words.forEach(word => {
    termFrequency[word] = (termFrequency[word] || 0) + 1;
  });
  
  return vocabulary.map(term => termFrequency[term] || 0);
}

/**
 * Computes TF-IDF vectors for multiple sentences
 */
export function computeTFIDF(sentences: string[], vocabulary: string[]): number[][] {
  const numDocs = sentences.length;
  
  // Compute document frequency for each term
  const documentFrequency: { [key: string]: number } = {};
  sentences.forEach(sentence => {
    const uniqueWords = new Set(
      sentence
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 0)
    );
    uniqueWords.forEach(word => {
      documentFrequency[word] = (documentFrequency[word] || 0) + 1;
    });
  });
  
  // Compute TF-IDF for each sentence
  return sentences.map(sentence => {
    const bow = computeBoW(sentence, vocabulary);
    const totalTerms = bow.reduce((sum, count) => sum + count, 0);
    
    return vocabulary.map((term, idx) => {
      const tf = bow[idx] / (totalTerms || 1);
      const df = documentFrequency[term] || 1;
      const idf = Math.log(numDocs / df);
      return tf * idf;
    });
  });
}
