import Conversation from "../Models/conversation.model.js";
import Message from "../Models/message.model.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let conversation = await Conversation.findOne({
      participients: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participients: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //
    await Promise.all([conversation.save(), newMessage.save()]);
    // Emit the new message to the connected clients using Socket.IO
    if (req.io) {
      req.io.emit("sendMessage", {
        message: newMessage,
        participients: [senderId, receiverId],
      });
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default sendMessage;
