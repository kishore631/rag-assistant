import express from "express";
import fs from "fs";
import cosineSimilarity from "../utils/cosine.js";
import { getEmbedding } from "../utils/embed.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Handle greetings separately
    const greetings = ["hi", "hello", "hey", "hii"];
    if (greetings.includes(query.toLowerCase())) {
      return res.json({
        answer: "Hello! 👋 Ask me something about exam rules or refund policy.",
        source: null,
        similarity: null,
      });
    }

    // Load vector store
    const vectorStore = JSON.parse(
      fs.readFileSync("vectorStore.json", "utf-8")
    );

    // Get query embedding
    const queryEmbedding = await getEmbedding(query);

    let bestMatch = null;
    let highestScore = -1;

    for (const doc of vectorStore) {
      const score = cosineSimilarity(queryEmbedding, doc.embedding);

      if (score > highestScore) {
        highestScore = score;
        bestMatch = doc;
      }
    }

    console.log("Query:", query);
    console.log("Best match:", bestMatch?.title);
    console.log("Similarity:", highestScore);

    // If similarity is very low
    if (highestScore < 0.40) {
      return res.json({
        answer:
          "I may not have exact information about that. Based on available documents, here is the closest match:\n\n" +
          bestMatch.content,
        source: bestMatch.title,
        similarity: highestScore,
      });
    }

    // Normal response
    return res.json({
      answer: bestMatch.content,
      source: bestMatch.title,
      similarity: highestScore,
    });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;