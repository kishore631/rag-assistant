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

    const greetings = ["hi", "hello", "hey", "hii"];

    if (greetings.includes(query.toLowerCase())) {
      return res.json({
        answer: "Hello! 👋 Ask me something about exam rules or refund policy.",
        source: null,
        similarity: null
      });
    }

    const vectorStore = JSON.parse(
      fs.readFileSync("data/vector_store.json", "utf-8")
    );

    const queryEmbedding = await getEmbedding(query);

    let scoredDocs = [];

    for (const doc of vectorStore) {
      let cosineScore = cosineSimilarity(queryEmbedding, doc.embedding);

      const queryWords = Object.keys(queryEmbedding);
      const titleWords = doc.title.toLowerCase().split(" ");

      let boost = 0;

      for (let word of queryWords) {
        if (titleWords.includes(word)) {
          boost += 0.15;
        }
      }

      let finalScore = Math.min(cosineScore + boost, 1);

      scoredDocs.push({
        ...doc,
        score: finalScore
      });
    }

    scoredDocs.sort((a, b) => b.score - a.score);

    const bestMatch = scoredDocs[0];
    const highestScore = bestMatch?.score || 0;

    if (!bestMatch || highestScore < 0.15) {
      return res.json({
        answer: "I couldn't find relevant information in available documents.",
        source: null,
        similarity: 0
      });
    }

    return res.json({
      answer: bestMatch.content,
      source: bestMatch.title,
      similarity: Number((highestScore * 100).toFixed(2))
    });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;