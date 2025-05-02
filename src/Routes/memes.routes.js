import express from "express";
import authenticateToken from "../Middleware/authenticateToken.js";
import addMeme from "../Controllers/addMeme.js";
import getUserMemes from "../Controllers/getUserMemes.js";
import deleteMeme from "../Controllers/deleteMeme.js";

const router = express.Router();

router.post("/postmeme", authenticateToken, addMeme);
router.get("/getusermemes/:username", authenticateToken, getUserMemes);
router.delete("/delete-user-meme/:id", authenticateToken, deleteMeme);

export default router;
