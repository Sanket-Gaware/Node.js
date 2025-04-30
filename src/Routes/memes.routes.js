import express from "express";
import authenticateToken from "../Middleware/authenticateToken.js";
import addMeme from "../Controllers/addMeme.js";
import getUserMemes from "../Controllers/getUserMemes.js";

const router = express.Router();

router.post("/postmeme", authenticateToken, addMeme);
router.get("/getusermemes/:username", authenticateToken, getUserMemes);

export default router;
