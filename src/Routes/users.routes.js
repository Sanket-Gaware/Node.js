import express from "express";
import getUsers from "../Controllers/getUsers.js";
const router = express.Router();

router.get("/", getUsers);

export default router;
