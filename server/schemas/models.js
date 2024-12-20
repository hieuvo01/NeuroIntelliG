import mongoose from "mongoose";

const aiModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  avatar: { type: String, required: true },
  voice: { type: String, required: true },
  introMessage: { type: String, default: "Hello, I am your assistant!" },
});

const AiModelSchema = mongoose.model("AiModel", aiModelSchema);

export default AiModelSchema;
