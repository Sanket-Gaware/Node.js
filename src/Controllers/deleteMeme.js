import Meme from "../Models/addmeme.model.js";
import User from "../Models/User.model.js";

const deleteMeme = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // userId sent from frontend

    // Step 1: Find the user by userId to get their email
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userEmail = user.username;

    // Step 2: Find the meme
    const meme = await Meme.findById(id);
    if (!meme) {
      return res.status(404).json({
        success: false,
        message: "Meme not found",
      });
    }

    // Step 3: Check if the email matches the uploader's email
    if (meme.uploadedBy !== userEmail) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can only delete your own memes",
      });
    }

    // Step 4: Delete the meme
    await meme.deleteOne();

    res.status(200).json({
      success: true,
      message: "Meme deleted successfully",
      data: meme,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default deleteMeme;
