import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
const Story = mongoose.model("Story", storySchema);
export default Story;
