import { pipeline } from "@xenova/transformers";

let extractor = null;

export async function getEmbedding(text) {
  if (!extractor) {
    console.log("Loading embedding model...");
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    console.log("Model loaded!");
  }

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}