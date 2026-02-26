export default function cosineSimilarity(vecA, vecB) {
  const keys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let key of keys) {
    const a = vecA[key] || 0;
    const b = vecB[key] || 0;

    dot += a * b;
    normA += a * a;
    normB += b * b;
  }

  if (normA === 0 || normB === 0) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}