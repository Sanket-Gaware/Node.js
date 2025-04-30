import mongoose from "mongoose";

const MemeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Meme title is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    caption: {
      type: String,
      required: [true, "Caption cannot be empty"],
    },
    uploadedBy: {
      type: String,
      required: [true, "Uploader username is required"],
    },
  },
  { timestamps: true }
);

const Meme = mongoose.model("Meme", MemeSchema);
export default Meme;
