import express from "express";
import Message from "../schemas/messages.js";

const route = express.Router();

// Backend - API to save message
route.post("/saveMessage", async (req, res) => {
  const { modelId, role, content, sender } = req.body;

  try {
    const newMessage = new Message({
      modelId,
      role,
      content,
      sender,
      timestamp: new Date(),
    });

    await newMessage.save();
    res.status(200).json({ message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

// API để lấy lịch sử tin nhắn của một model
route.get("/getMessages/:modelId", async (req, res) => {
  const { modelId } = req.params;

  try {
    const messages = await Message.find({ modelId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default route;
