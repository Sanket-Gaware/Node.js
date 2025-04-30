import express from "express";
import sendMessage from "../Controllers/message.js";
import authenticateToken from "../Middleware/authenticateToken.js";
import getMessages from "../Controllers/getAllMessages.js";
import getLastMessage from "../Controllers/getLastMessage.js";

const router = express.Router();

router.post("/sendmessage/:id", authenticateToken, sendMessage);
router.get("/:id", authenticateToken, getMessages);
router.get("/getlastmessage/:id", authenticateToken, getLastMessage);
export default router;
