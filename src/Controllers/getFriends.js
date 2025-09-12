// GET /api/users/friends
import User from "../Models/User.model.js";

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "friends",
      "username fullname profile"
    );
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
