const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB"); //connect to the database
const createAdminUser = require("./config/adminUser"); //create the admin user
app.use(
  session({
    secret: "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", // set your secret key
    resave: false,
    saveUninitialized: false,
  })
);

///login with google
const passportSetup = require("./config/passport");
const passport = require("passport");

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
connectDB();

//app routes
const indexRouter = require("./routes/index.router"); //the routes of all the project
app.use("/", indexRouter);

const PORT = process.env.PORT || 5000;

createAdminUser();

// async function addYearsRegisteredToUsers() {
//   const users = await User.find({});
//   for (const user of users) {
//     user.yearsRegistered = user.yearsRegistered || 0;
//     console.log(user.yearsRegistered);
//     await user.save();
//   }
//   console.log("Years registered added to all users.");
//   process.exit();
// }

// addYearsRegisteredToUsers();
  
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  console.log("Users array:", users);  
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  const user = users.find((user) => user.userId === userId);
  console.log("getUser called with userId:", userId);
  return user;
};

io.on("connection", (socket) => {
  console.log("a user connected.");
  socket.on("addUser", (data) => {
    socket.join(data.roomid);
    addUser(data.id, socket.id);
    
  });
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    
  });

  //send and get message
  socket.on("sendMessage", (data) => {
    console.log(`sendMessage called with data: ${JSON.stringify(data)}`);
    const user = getUser(data.receiverId);
    if (user) {
      //console.log(`Message sent to user ${user.userId}`);
      //io.emit("getMessage", data);
      io.to(data.conversationId).emit("getMessage", data);
    } else {
      console.log("User not found");
    }
  });
});

server.listen(PORT, (error) => {
  if (error) throw console.error(error);
  console.log("Server is listening on port" + " " + PORT);
});
