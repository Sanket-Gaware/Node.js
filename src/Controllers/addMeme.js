import Meme from "../Models/addmeme.model.js";

const addMeme = async (req, res) => {
  try {
    const { title, image, caption, uploadedBy } = req.body;

    const newMeme = new Meme({
      title,
      image,
      caption,
      uploadedBy,
    });

    await newMeme.save();

    res.status(201).json({
      success: true,
      message: "Meme uploaded successfully",
      data: newMeme,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default addMeme;
