import express from "express";
import ConnectToDb from "./src/Connection/ConnectToDb.js";
import authRoutes from "./src/Routes/auth.routes.js";
import messageRoutes from "./src/Routes/message.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRoute from "./src/Routes/users.routes.js";
import { app, server } from "./src/Socket/socket.js";

app.use(express.json()); //to parse data from req.body
app.use(cookieParser()); // Use cookie-parser middleware
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoute);

server.listen(8081, () => {
  ConnectToDb();
  console.log("Server is running on port 8081");
});
