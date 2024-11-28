import mongoose, { Schema } from "mongoose";

const Earning = new Schema({
  userId: {
    type: String,
  },
  feedId: {
    type: String,
  },
  info: {
    type: Schema.Types.Mixed,
  },
  status: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const EarningSchema = mongoose.model("Earning", Earning);

export default EarningSchema;
