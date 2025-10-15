// import User from "../Models/User.model.js";

// // POST /api/:id/send-request
// export const sendFriendRequest = async (req, res) => {
//   try {
//     const senderId = req.user.id; // From auth middleware
//     const receiverId = req.params.id;
//     console.log(senderId);
//     if (senderId === receiverId)
//       return res.status(400).json({ message: "You can't add yourself." });

//     const sender = await User.findById(senderId);
//     const receiver = await User.findById(receiverId);

//     if (!receiver) return res.status(404).json({ message: "User not found" });

//     if (
//       sender.friends.includes(receiverId) ||
//       sender.sentRequests.includes(receiverId)
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Already friends or request sent" });
//     }

//     sender.sentRequests.push(receiverId);
//     receiver.friendRequests.push(senderId);

//     await sender.save();
//     await receiver.save();

//     res.status(200).json({ message: "Friend request sent" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import User from "../Models/User.model.js";

// POST /api/:id/send-request
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.id; // From auth middleware
    const receiverId = req.params.id;
    console.log(senderId);
    if (senderId === receiverId)
      return res.status(400).json({ message: "You can't add yourself." });

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!receiver) return res.status(404).json({ message: "User not found" });

    if (
      sender.friends.includes(receiverId) ||
      sender.sentRequests.includes(receiverId)
    ) {
      return res
        .status(400)
        .json({ message: "Already friends or request sent" });
    }

    sender.sentRequests.push(receiverId);
    if (!sender.allSentRequests.includes(receiverId)) {
      sender.allSentRequests.push(receiverId);
    }
    receiver.friendRequests.push(senderId);

    await sender.save();
    await receiver.save();

    // Emit socket event for new friend request
    if (req.io) {
      req.io.emit("friendRequest", {
        senderId,
        receiverId,
        message: "New friend request received",
      });
    }

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
