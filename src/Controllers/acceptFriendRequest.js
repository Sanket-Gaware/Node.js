// import User from "../Models/User.model.js";

// // POST /api/:id/accept-request
// export const acceptFriendRequest = async (req, res) => {
//   try {
//     const receiverId = req.user.id;
//     const senderId = req.params.id;

//     const sender = await User.findById(senderId);
//     const receiver = await User.findById(receiverId);

//     if (!receiver.friendRequests.includes(senderId)) {
//       return res.status(400).json({ message: "No request from this user" });
//     }

//     // Remove from requests
//     receiver.friendRequests = receiver.friendRequests.filter(
//       (id) => id.toString() !== senderId
//     );
//     sender.sentRequests = sender.sentRequests.filter(
//       (id) => id.toString() !== receiverId
//     );

//     // Add to friends
//     receiver.friends.push(senderId);
//     sender.friends.push(receiverId);

//     await sender.save();
//     await receiver.save();

//     res.status(200).json({ message: "Friend request accepted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import User from "../Models/User.model.js";

// POST /api/:id/accept-request
export const acceptFriendRequest = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const senderId = req.params.id;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ message: "No request from this user" });
    }
 
    // Remove from requests
    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== senderId
    );
    sender.sentRequests = sender.sentRequests.filter(
      (id) => id.toString() !== receiverId
    );

    // Add to friends
    receiver.friends.push(senderId);
    sender.friends.push(receiverId);

    await sender.save();
    await receiver.save();

    // Emit socket event for friend request accepted
    if (req.io) {
      req.io.emit("friendRequestAccepted", {
        senderId,
        receiverId,
        message: "Friend request accepted",
      });
    }

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
