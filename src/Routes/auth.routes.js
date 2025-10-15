import express from "express";
import signup from "../Controllers/Authentication/signup.js";
import login from "../Controllers/Authentication/login.js";
import addProducts from "../Controllers/Crud/addProducts.js";
import getData from "../Controllers/Crud/getProduct.js";
import getProductById from "../Controllers/Crud/getProductById.js";
import deleteById from "../Controllers/Crud/deleteById.js";
import deleteByName from "../Controllers/Crud/deleteByName.js";
import updatedProduct from "../Controllers/Crud/updateProduct.js";
import sendOTP from "../Controllers/sendOTP.js";
import verifyOTP from "../Controllers/verifyOTP.js";
import authenticateToken from "../Middleware/authenticateToken.js";
import { sendFriendRequest } from "../Controllers/sendFriendRequest .js";
import { acceptFriendRequest } from "../Controllers/acceptFriendRequest.js";
import { rejectFriendRequest } from "../Controllers/rejectFriendRequest.js";
import { getFriends } from "../Controllers/getFriends.js";
import { getAllFriendRequests } from "../Controllers/getAllFriendRequests.js";
import { getAllSendReq } from "../Controllers/getAllSendReq.js";

const router = express.Router();
//signup
router.post("/signup", signup);
//login
router.post("/login", login);
//send-otp
router.post("/send-otp", sendOTP);
//verify-Otp
router.post("/reset-password", verifyOTP);

//add data
router.post("/products", addProducts);
//get all data
router.get("/products", getData);

//get data by id
router.get("/products/:id", getProductById);

//delete a data by id
router.delete("/products/:id", deleteById);

//delete by name
router.delete("/products/:name", deleteByName);

//update data
router.put("/products/:id", updatedProduct);

// Friend routes
router.post("/:id/send-request", authenticateToken, sendFriendRequest);
router.post("/:id/accept-request", authenticateToken, acceptFriendRequest);
router.post("/:id/reject-request", authenticateToken, rejectFriendRequest);
router.get("/friend-requests", authenticateToken, getAllFriendRequests);
router.get("/all-sent-requests", authenticateToken, getAllSendReq);
router.get("/friends", authenticateToken, getFriends);

export default router;
