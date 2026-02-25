import { pipeline } from '@xenova/transformers';
import fs from 'fs';

let embedder;

// Load model once
async function loadModel() {
  if (!embedder) {
    console.log("Loading embedding model...");
    embedder = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
    console.log("Model loaded successfully!");
  }
}

// Generate embedding
async function getEmbedding(text) {
  await loadModel();

  const output = await embedder(text, {
    pooling: 'mean',
    normalize: true
  });

  return Array.from(output.data);
}

// Example documents
const documents = [
  {
    title: "Refund Policy",
    content: "Students can request a refund within 30 days of fee payment."
  },
  {
    title: "Exam Guidelines",
    content: "Students must carry their ID card during examinations."
  }
];

// Main function
async function run() {
  console.log("Starting ingestion process...\n");

  const vectorStore = [];

  for (const doc of documents) {
    const embedding = await getEmbedding(doc.content);

    console.log(`Embedded: ${doc.title}`);
    console.log(`Vector length: ${embedding.length}\n`);

    vectorStore.push({
      title: doc.title,
      content: doc.content,
      embedding
    });
  }

  // Save locally
  fs.writeFileSync("vectorStore.json", JSON.stringify(vectorStore, null, 2));

  console.log("✅ Vector store created successfully!");
}

run();