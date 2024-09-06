const { Server } = require("socket.io");
const Course = require("../models/course");
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

    socket.on("updateLikesCount", async (data) => {
      try {
        const { courseId, type } = data;

        if (!courseId || !type) {
          console.log("Invalid data received");
          return;
        }

        // Find the course by its ID
        const course = await Course.findById(courseId);
        if (!course) {
          console.log("Course not found");
          return;
        }

        // Update likes based on the type (like or removeLike)
        if (type === "like") {
          course.likes += 1;
        } else if (type === "removeLike") {
          course.likes = Math.max(0, course.likes - 1);
        }

        // Save the updated course
        await course.save();

        // Broadcast the updated like count to all connected clients
        io.emit("updateLikesCount", {
          courseId: course._id,
          likes: course.likes,
        });
      } catch (error) {
        console.error("Error updating course likes:", error);
      }
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
