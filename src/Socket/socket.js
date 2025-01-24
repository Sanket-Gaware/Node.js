// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Replace with your frontend URL for production
//     methods: ["GET", "POST"],
//   },
// });

// app.use((req, res, next) => {
//   req.io = io; // Attach the Socket.IO instance to the request
//   next();
// });

// // Listen for incoming socket connections
// io.on("connection", (socket) => {
//   console.log("a user connected " + socket.id);

//   socket.on("disconnected", () => {
//     console.log("user disconnected " + socket.id);
//   });
// });

// export { app, io, server };
