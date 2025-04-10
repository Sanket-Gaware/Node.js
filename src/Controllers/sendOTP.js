import User from "../Models/User.model.js";
import Otp from "../Models/Otp.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOTP = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log("=>", user);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    const email = username;
    await Otp.findOneAndDelete({ email }); // remove old otp if any
    await Otp.create({
      email,
      otp: otpCode,
      otpExpiry,
    });

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: username,
      subject: "OTP Verification",
      html: `<div>Your OTP code is: <b>${otpCode}</b></div>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "OTP sent successfully to your email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export default sendOTP;
