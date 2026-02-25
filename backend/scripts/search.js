import { pipeline } from '@xenova/transformers';
import fs from 'fs';

let embedder;

async function loadModel() {
  if (!embedder) {
    embedder = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
  }
}

async function getEmbedding(text) {
  await loadModel();

  const output = await embedder(text, {
    pooling: 'mean',
    normalize: true
  });

  return Array.from(output.data);
}

// Cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  return dot; // normalized already
}

async function search(query) {
  const vectorStore = JSON.parse(
    fs.readFileSync('vectorStore.json')
  );

  const queryEmbedding = await getEmbedding(query);

  let bestMatch = null;
  let highestScore = -Infinity;

  for (const doc of vectorStore) {
    const score = cosineSimilarity(queryEmbedding, doc.embedding);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = doc;
    }
  }

  console.log("\n🔎 Query:", query);
  console.log("📄 Best Match:", bestMatch.title);
  console.log("📊 Similarity Score:", highestScore.toFixed(4));
  console.log("📌 Content:", bestMatch.content);
}

search("How can I get refund?");