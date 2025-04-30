import Meme from "../Models/addmeme.model.js";

const getUserMemes = async (req, res) => {
  try {
    const { username } = req.params;

    const memes = await Meme.find({ uploadedBy: username }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: `Memes uploaded by ${username}`,
      data: memes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getUserMemes;
