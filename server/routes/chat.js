import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const watsonResponse = await axios.post(
      "https://api.us-south.assistant.watson.cloud.ibm.com/v2/assistants/<your-assistant-id>/message",
      { input: { text: message } },
      {
        auth: { username: "apikey", password: "<your-api-key>" },
      }
    );

    const reply = watsonResponse.data.output.generic[0]?.text || "I'm here to help!";
    res.json({ reply });
  } catch (error) {
    console.error("Watsonx error:", error.message);
    res.status(500).json({ reply: "Something went wrong. Please try again later." });
  }
});

export default router;
