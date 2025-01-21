import express from "express";
import getUsers from "../Controllers/getUsers.js";
import authenticateToken from "../Middleware/authenticateToken.js";
const router = express.Router();

router.get("/", authenticateToken, getUsers);

export default router;
