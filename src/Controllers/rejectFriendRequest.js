// POST /api/users/:id/reject-request
export const rejectFriendRequest = async (req, res) => {
  try {
    const receiverId = req.user.id;
    const senderId = req.params.id;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== senderId
    );
    sender.sentRequests = sender.sentRequests.filter(
      (id) => id.toString() !== receiverId
    );

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
