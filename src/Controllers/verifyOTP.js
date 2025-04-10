import Otp from "../Models/Otp.model.js";
import bcrypt from "bcrypt";
import User from "../Models/User.model.js";

export const verifyOTP = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const username = email;
  try {
    const existingOtp = await Otp.findOne({ email }); //email for otp.model
    const user = await User.findOne({ username }); // username for user.model
    if (!existingOtp) {
      return res.status(400).json({ msg: "OTP not found or expired" });
    }

    if (existingOtp.otp != otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (existingOtp.otpExpiry < new Date()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    await Otp.deleteOne({ email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log(hashedPassword);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default verifyOTP;
