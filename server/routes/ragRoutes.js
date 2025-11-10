import express from "express";
import Product from "../models/Product.js";
import { generateEmbedding } from "../utils/embed.js";
import axios from "axios";

const router = express.Router();

// Simple cosine similarity function
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

// RAG route
router.post("/query", async (req, res) => {
  try {
    const { query } = req.body;

    // Generate embedding for user query
    const queryEmbedding = await generateEmbedding(query);

    // Fetch products from MongoDB
    const products = await Product.find().lean();

    // Compare embeddings
    const ranked = await Promise.all(
      products.map(async (p) => {
        const prodEmbed =
          p.embedding || (await generateEmbedding(p.description || p.name));
        return { ...p, score: cosineSimilarity(queryEmbedding, prodEmbed) };
      })
    );

    // Sort and pick top results
    const topResults = ranked.sort((a, b) => b.score - a.score).slice(0, 3);

    // Build context
    const context = topResults
      .map(
        (p) =>
          `${p.name} (${p.category}) - ₹${p.price}.\n${p.description}`
      )
      .join("\n\n");

    // Ask LLM (Watsonx or OpenAI)
    const aiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an assistant for a local e-commerce platform.",
          },
          {
            role: "user",
            content: `User Query: ${query}\n\nProducts:\n${context}\n\nGenerate a helpful answer.`,
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );

    res.json({
      answer: aiResponse.data.choices[0].message.content,
      topResults,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "RAG query failed" });
  }
});

export default router;
