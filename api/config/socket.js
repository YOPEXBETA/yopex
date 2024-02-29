const { Server } = require("socket.io");
const { sendNotification } = require("../server");

const initializeSocketIO = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: ["https://yopexhub.com", "http://localhost:3000"],
      methods: ["GET", "POST","PUT", "DELETE"],
    },
  });

  let users = [];

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const sendNotification = (userId, notification) => {
    io.to(userId).emit("notification", notification);
  };

  io.on("connection", (socket) => {
    socket.on("joinRoom", (data) => {
      socket.join(data.roomid);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });

    socket.on("sendMessage", (data) => {
      io.to(data.conversationId).emit("getMessage", data);
    });

    socket.on("sendMessageinContest", (data) => {
      io.to(data.conversationId).emit("getMessageinContest", data);
    });
  });
  return sendNotification;
};

module.exports = initializeSocketIO;
