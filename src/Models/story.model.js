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

    //TTL index setup: this will automatically delete the document when it expires
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index triggers deletion at the given time
    },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
