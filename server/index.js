import express from "express";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import feedRoutes from "./routes/feeds.js";
import earningRoutes from "./routes/earning.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Cho phép client chạy trên cổng 3000
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/feeds", feedRoutes);
app.use("/api/earning", earningRoutes);
app.use("/", (req, res, next) => {
  res.status(404).json({ message: "Page not found" });
  next();
});

// Connect to MongoDB
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.HTTP_PORT, () => {
      console.log(`Server running on port ${process.env.HTTP_PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
