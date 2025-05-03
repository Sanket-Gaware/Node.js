import express from "express";
import authenticateToken from "../Middleware/authenticateToken.js";
import addMeme from "../Controllers/addMeme.js";
import getUserMemes from "../Controllers/getUserMemes.js";
import deleteMeme from "../Controllers/deleteMeme.js";
import getAllMemes from "../Controllers/getAllMemes.js";

const router = express.Router();

router.post("/postmeme", authenticateToken, addMeme);
router.get("/getusermemes/:username", authenticateToken, getUserMemes);
router.get("/getallmemes", authenticateToken, getAllMemes);
router.delete("/delete-user-meme/:id", authenticateToken, deleteMeme);

export default router;
