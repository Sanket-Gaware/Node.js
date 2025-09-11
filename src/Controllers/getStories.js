// controllers/getStories.js
import Story from "../Models/story.model.js";
 
const getStories = async (req, res) => {
  try {
    const stories = await Story.find({
      expiresAt: { $gt: new Date() }, // Only active stories
    }).populate("userId", "username profilePic"); // Optional: populate user info

    if (!stories.length) {
      return res.status(200).json({
        stories: [],
        message: "No active stories available.",
      });
    }
    res.status(200).json({ stories });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching stories", error: err.message });
  }
};

export default getStories;
