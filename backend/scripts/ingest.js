import fs from "fs";
import { getEmbedding } from "../utils/embed.js";

async function run() {
  console.log("Starting ingestion...\n");

  const docs = JSON.parse(
    fs.readFileSync("data/docs.json", "utf-8")
  );

  const vectorStore = [];

  for (const doc of docs) {
    const embedding = await getEmbedding(doc.content);

    vectorStore.push({
      id: doc.id,
      title: doc.title,
      content: doc.content,
      embedding
    });

    console.log(`Embedded: ${doc.title}`);
  }

  fs.writeFileSync(
    "data/vector_store.json",
    JSON.stringify(vectorStore, null, 2)
  );

  console.log("\n✅ Vector store created successfully!");
}

run();