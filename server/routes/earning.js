import express from "express";
const route = express.Router();
import dotenv from "dotenv";
import EarningSchema from "../schemas/earning.js";
import jwt from "jsonwebtoken";
dotenv.config();

//create earning
route.post("/create", async (req, res) => {
  try {
    const { token } = req.query;
    console.log(token);
    console.log(process.env.JWT_SECRET);
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json({ message: "Login is required" });
    }
    console.log(req.body);
    const { details, data, status, feedId } = req.body;
    if (!feedId) {
      return res.status(400).json({ message: "Feed id is required" });
    }
    const earning = await EarningSchema.create({
      userId: user._id,
      info: {
        details,
        data,
      },
      status,
      feedId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(200).json({ data: earning });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

route.get("/search", async (req, res, next) => {
  try {
    const query = {};
    if (req.query.feedId) {
      query.feedId = req.query.feedId;
    }
    if (req.query.userId) {
      query.userId = req.query.userId;
    }

    const earning = await EarningSchema.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ earning });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default route;
