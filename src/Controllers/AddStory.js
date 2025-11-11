// routes/storyRoutes.js
import Story from "../Models/story.model.js";
  
const addStory = async (req, res) => {
  try {
    const userId = req.params.id;
    const { mediaUrl, mediaType } = req.body;

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    const story = new Story({ userId, mediaUrl, mediaType, expiresAt });
    await story.save();

    res.status(201).json({ message: "Story uploaded", story });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error uploading story", error: err.message });
  }
};

export default addStory;
