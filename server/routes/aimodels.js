import express from "express";
import AiModelSchema from "../schemas/models.js";

const route = express.Router();

// API endpoint to fetch AI models
route.get("/get", async (req, res) => {
  try {
    const ModelSchema = await AiModelSchema.find({});
    res.json(ModelSchema);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

route.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const model = await AiModelSchema.findById(id);

    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.json(model);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// API endpoint to add a new AI model
route.post("/add", async (req, res) => {
  const { name, description, avatar, voice } = req.body;

  if (!name || !description || !avatar || !voice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newModel = new AiModelSchema({ name, description, avatar, voice });

  try {
    await newModel.save();
    res.status(201).json(newModel);
  } catch (error) {
    res.status(500).json({ message: "Error saving model", error });
  }
});

// API endpoint to update an existing AI model
route.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updatedModel = req.body;

  try {
    const model = await AiModelSchema.findByIdAndUpdate(id, updatedModel, {
      new: true,
    });

    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: "Error updating model", error });
  }
});

// API endpoint to delete an AI model
route.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const model = await AiModelSchema.findByIdAndDelete(id);

    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.status(200).json({ message: "AI model deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting model", error });
  }
});

// API endpoint to update introMessage of an AI model
route.put("/updateIntroMessage/:id", async (req, res) => {
  const { id } = req.params;
  const { introMessage } = req.body;

  if (!introMessage) {
    return res.status(400).json({ message: "Intro message is required" });
  }

  try {
    const model = await AiModelSchema.findByIdAndUpdate(
      id,
      { introMessage }, // Cập nhật introMessage
      { new: true }
    );

    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: "Error updating introMessage", error });
  }
});

route.get("/getIntroMessage/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const model = await AiModelSchema.findById(id);

    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }

    res.json({ introMessage: model.introMessage });
  } catch (error) {
    res.status(500).json({ message: "Error fetching introMessage", error });
  }
});

export default route;
