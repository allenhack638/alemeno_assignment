const { Server } = require("socket.io");
require("dotenv").config(); // Load .env file

let io;

const initializeWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN || "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("likeCourse", (courseId) => {
      io.emit("courseLiked", { courseId });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

const emitCourseLiked = (courseId) => {
  io.emit("courseLiked", { courseId });
};

module.exports = { initializeWebSocket, emitCourseLiked };
