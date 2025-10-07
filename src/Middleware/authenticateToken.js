import jwt from "jsonwebtoken";
import { jwtSecret } from "../Controllers/Authentication/jwtConfig.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token1 = authHeader && authHeader.split(" ")[1];
  if (!token1) {
    return res.status(401).json({ message: "Access Denied " });
  }
 
  try {
    const verified = jwt.verify(token1, jwtSecret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default authenticateToken;
