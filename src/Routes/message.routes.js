import express from "express";
import sendMessage from "../Controllers/message.js";
import authenticateToken from "../Middleware/authenticateToken.js";
import getMessages from "../Controllers/getAllMessages.js";

const router = express.Router();

router.post("/sendmessage/:id", authenticateToken, sendMessage);
router.get("/:id", authenticateToken, getMessages);

export default router;
