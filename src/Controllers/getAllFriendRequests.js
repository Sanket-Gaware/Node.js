import User from "../Models/User.model.js";

// GET /api/friend-requests
export const getAllFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find user and populate friendRequests with limited fields
    const user = await User.findById(userId).populate(
      "friendRequests",
      "username fullname profile"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Emit socket event to notify user (optional)
    if (req.io) {
      req.io.to(userId).emit("friendRequestsFetched", {
        friendRequests: user.friendRequests,
      });
    }

    res.status(200).json(user.friendRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
