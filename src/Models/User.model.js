import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    profile: {
      type: String,
      required: [true, "please select profile"],
    },
    fullname: {
      type: String,
      required: [true, "name canot be empty"],
    },
    username: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // incoming
    sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // outgoing
    allSentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // incoming
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
