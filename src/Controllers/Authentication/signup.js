import User from "../../Models/User.model.js";
import bcrypt from "bcrypt";

const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.\d@$!%*?&]{2,29}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signup = async (req, res) => {
  try {
    const { fullname, username, gender, password, confirmPassword } = req.body;
    const hashPassword = await bcrypt.hash(password, 7);
    if (!usernameRegex.test(username)) {
      return res.status(500).json({
        message:
          "Username should contain only alphanumeric characters, dot, underscore, and start with a letter",
      });
    } else if (!passwordRegex.test(password)) {
      return res.status(500).json({
        message:
          "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      });
    } else if (password != confirmPassword) {
      return res.status(500).json({ message: "Passwords do not match." });
    }
    const user = new User({
      fullname,
      username,
      gender,
      password: hashPassword,
    });
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      await user.save();
      //   const token = jwt.sign(
      //     { id: newUser._id, username: newUser.username },
      //     jwtSecret,
      //     { expiresIn: jwtExpiry }
      //   );
      return res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
      });
    } else {
      return res.status(409).json({ message: "Username already exists." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export default signup;
