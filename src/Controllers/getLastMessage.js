import Message from "../Models/message.model.js";

const getLastMessage = async (req, res) => {
  const senderId = req.user.id;
  const { id: receiverId } = req.params;
  try {
    const message = await Message.findOne({
      senderId: senderId,
      receiverId: receiverId,
    })
      .sort({ createdAt: -1 })
      .exec();
    if (!message) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default getLastMessage;
