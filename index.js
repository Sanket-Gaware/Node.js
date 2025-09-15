import express from "express";
import ConnectToDb from "./src/Connection/ConnectToDb.js";
import authRoutes from "./src/Routes/auth.routes.js";
import messageRoutes from "./src/Routes/message.routes.js";
import memesRoutes from "./src/Routes/memes.routes.js";
import cors from "cors";
import usersRoute from "./src/Routes/users.routes.js";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
const app = express();
// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
     origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  
  },
});

app.use((req, res, next) => {
  req.io = io; // Attach the Socket.IO instance to the request
  next();
}); 

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoute);
app.use("/api/memes", memesRoutes);

ConnectToDb();
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// server.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
server.listen(8082, () => {
  console.log(`Server is running on port 8082`);
});
