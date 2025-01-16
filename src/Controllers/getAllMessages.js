import Conversation from "../Models/conversation.model.js";
import Message from "../Models/message.model.js";

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;
    const conversation = await Conversation.findOne({
      participients: { $all: [senderId, userToChatId] },
    });

    if (!conversation) return res.status(200).json([]);
    // Filter messages by the conversation id
    const messages = await Message.find({
      _id: { $in: conversation.messages },
    });
    // const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default getMessages;
