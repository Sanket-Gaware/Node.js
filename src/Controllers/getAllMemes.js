import Meme from "../Models/addmeme.model.js";

const getAllMemes = async (req, res) => {
  try {
    const memes = await Meme.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: memes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getAllMemes;
