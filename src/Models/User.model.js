import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
