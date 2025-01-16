import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnected", () => {
    console.log("user disconnected");
  });
});

export { app, io, server };
