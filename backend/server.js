const express = require("express");
const app = express();
const port = 3000;
const io = require("socket.io")(port, {
  cors: {
    origin: "*",
  },
});
const users = {};

io.on("connection", (socket) => {
  console.log("user connected");
  
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      username: users[socket.id],
    });
  });

  socket.on("disconnect-user", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });

  socket.on("new-user", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("update", username);
  });
});
