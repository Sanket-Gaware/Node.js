import User from "../Models/User.model.js";

// GET /api/all-sent-requests
export const getAllSendReq = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(userId);
    // Find user and populate allSentRequests with limited fields
    const user = await User.findById(userId).populate(
      "allSentRequests",
      "username fullname profile"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Emit socket event to notify user (optional)
    if (req.io) {
      req.io.to(userId).emit("allSentRequestsFetched", {
        allSentRequests: user.allSentRequests,
      });
    }

    res.status(200).json(user.allSentRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
