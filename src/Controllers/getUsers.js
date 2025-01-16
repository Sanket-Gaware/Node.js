import User from "../Models/User.model.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default getUsers;
