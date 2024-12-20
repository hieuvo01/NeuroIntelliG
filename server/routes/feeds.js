import express from "express";
import OpenAI from "openai";
const route = express.Router();
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import FeedsSchema from "../schemas/feeds.js";
import Tesseract from "tesseract.js";
import jwt from "jsonwebtoken";
import fs from "fs"; // Đảm bảo import fs
import EarningSchema from "../schemas/earning.js";
import multer from "multer";
import axios from "axios";
dotenv.config();

const customApi = axios.create({
  baseURL: "https://api.yescale.io/v1", // endpoint cua Yescale
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
});
// Cấu hình multer để lưu file tạm
const upload = multer({ dest: "uploads/" });

// ham tao feed (image)
route.post("/create", async (req, res, next) => {
  try {
    const { token } = req.query;
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json({ message: "Login first" });
    }
    const { title, description, price, type, url } = req.body;
    if (!title || !description || price === null || !type || !url) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // const cloud_url = await cloudinary.uploader.upload(url);
    const feed = await FeedsSchema.create({
      user_id: user._id,
      title,
      description,
      price,
      type,
      text: "",
      image: type === "image" ? url : "",
      video: type === "video" ? url : "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(200).json({ message: feed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//update feed
route.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json({ message: "Login required" });
    }
    const { title, description, price, type, url } = req.body;
    if (!title || !description || !price || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const feed_id = await FeedsSchema.findById(id);
    if (!feed_id) {
      return res.status(404).json({ message: "Feed not found" });
    }
    if (feed_id.user_id !== user._id) {
      return res.status(403).json({ message: "Forbidden" }); //kiem tra user co quyen xoa feed hay khong
    }
    const feed = await FeedsSchema.findByIdAndUpdate(id, {
      user_id: user._id,
      title,
      description,
      price,
      type,
      text: "",
      image: type === "image" ? url : "",
      video: type === "video" ? url : "",
      updatedAt: new Date(),
    });
    return res.status(200).json({ message: feed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//delete feed
route.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json({ message: "Login first" });
    }
    const feed_id = await FeedsSchema.findById(id);
    if (!feed_id) {
      return res.status(404).json({ message: "Feed not found" });
    }
    if (feed_id.user_id !== user._id) {
      return res.status(403).json({ message: "Forbidden" }); //kiem tra user co quyen xoa feed hay khong
    }
    await FeedsSchema.findByIdAndDelete(id);
    return res.status(200).json({ message: "Feed deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//search feed
//search feed
route.get("/search", async (req, res, next) => {
  const { token } = req.query;
  try {
    const query = {};
    let user;
    if (token) {
      user = jwt.decode(token, process.env.JWT_SECRET);
    }
    // Handle keywords for text search
    if (req.query.keywords) {
      const keyword = req.query.keywords.split(" ").join("|");
      const regex = new RegExp(keyword, "i");
      query.title = { $regex: regex };
    }

    // Handle type filtering
    if (req.query.type) {
      query.type = req.query.type;
    }
    // console.log(query);
    // Fetch feeds based on the query
    const feeds = await FeedsSchema.find(query).sort({ createdAt: -1 });

    // Check earnings for the fetched feeds
    const feedIds = feeds.map((feed) => feed._id);
    const earnings = await EarningSchema.find({ feedId: { $in: feedIds } });

    // Combine feeds with their corresponding earnings
    let data;
    if (user && user?._id) {
      data = feeds.map((feed) => {
        const earning = earnings.find(
          (earning) =>
            earning.feedId.toString() === feed._id.toString() &&
            earning?.userId?.toString() === user?._id?.toString()
        );
        return {
          ...feed.toObject(), // Convert Mongoose document to plain object
          earning: earning || null,
        };
      });
    } else {
      data = feeds;
    }

    return res.status(200).json({ feeds: data });
  } catch (error) {
    console.error(error); // Use console.error for better logging
    return res.status(500).json({ message: error.message });
  }
});

//get details feed
route.get("/:id/details", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json({ message: "Login first" });
    }
    const feed = await FeedsSchema.findById(id);
    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }
    return res.status(200).json({ data: feed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// gửi yêu cầu đến endpoint tùy chỉnh
async function analyzeTextWithCustomAPI(text) {
  try {
    const response = await customApi.post("/chat/completions", {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant trained to analyze extracted text from images.",
        },
        { role: "user", content: `Analyze the following text: ${text}` },
      ],
    });

    const analysis = response.data.choices[0].message.content;
    console.log("API Analysis:", analysis);
    // Trả về kết quả phân tích
    return analysis;
  } catch (error) {
    console.error("Error analyzing text with custom API:", error);
    throw new Error(`Failed to analyze text with custom API: ${error.message}`);
  }
}

// Route phân tích ảnh
route.post("/analyze-image", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;

  try {
    // Sử dụng Tesseract.js để nhận diện văn bản từ ảnh
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m), // Giám sát tiến trình
    });

    console.log("Extracted text:", text);

    if (!text || text.trim().length === 0) {
      res.status(400).json({ error: "No text extracted from image" });
      return;
    }

    // Gửi văn bản đến OpenAI để phân tích
    const analysis = await analyzeTextWithCustomAPI(text);

    // Trả về kết quả phân tích
    res.json({ text: analysis });
  } catch (error) {
    console.error("Error analyzing image:", error);
    res.status(500).json({ error: error.message || "Error analyzing image" });
  }
});

// Route để chatbot trả lời
route.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await customApi.post("/chat/completions", {
      model: "gpt-4o", // Chọn model phù hợp
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const chatbotReply = response.data.choices[0].message.content;
    return res.json({ reply: chatbotReply });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
});

route.post("/chat", async (req, res) => {
  const { message, persona } = req.body;
  const prompt = `${persona}: ${message}`;

  try {
    const response = await customApi.post("/chat/completions", {
      model: "gpt-4o",
      messages: [
        { role: "system", content: persona },
        { role: "user", content: message },
      ],
      max_tokens: 150,
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Error communicating with AI" });
  }
});

//quan ly feeds
route.get("/admin/feeds", async (req, res) => {
  try {
    const { token } = req.query;
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const feeds = await FeedsSchema.find().sort({ createdAt: -1 });
    res.status(200).json({ feeds });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//chinh sua feeds (admin)

// Route để lấy thông tin feed cần chỉnh sửa
route.get("/admin/feeds/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Lấy thông tin feed từ database
    const feed = await FeedsSchema.findById(id);
    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }

    // Trả về dữ liệu feed cho giao diện để chỉnh sửa
    return res.status(200).json({ feed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Route để cập nhật thông tin feed (Admin chỉnh sửa feed)
route.put("/admin/feeds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, price, type, url } = req.body;
    if (!title || !description || !price || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const feed = await FeedsSchema.findByIdAndUpdate(id, {
      title,
      description,
      price,
      type,
      image: type === "image" ? url : "",
      video: type === "video" ? url : "",
      updatedAt: new Date(),
    });

    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }

    return res.status(200).json({ message: "Feed updated successfully", feed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//xoa feeds (admin)
route.delete("/admin/feeds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const feed = await FeedsSchema.findByIdAndDelete(id);
    if (!feed) {
      return res.status(404).json({ message: "Feed not found" });
    }

    return res.status(200).json({ message: "Feed deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// route mac dinh
route.get("/", (req, res) => {
  res.send("hello world");
});

export default route;
