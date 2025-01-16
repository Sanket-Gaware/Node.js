import User from "../../Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtExpiry, jwtSecret } from "./jwtConfig.js";

const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.\d@$!%*?&]{2,29}$/;

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!usernameRegex.test(username)) {
      return res.status(422).json({
        message:
          "Username should contain only alphanumeric characters, dot, underscore, and start with a letter",
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(409).json({ message: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password!" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      jwtSecret,
      { expiresIn: jwtExpiry }
    );
    res.cookie("token", token, {
      httpOnly: true, // Accessible only by web server
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return res.status(200).json({ success: true, token: token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export default login;
