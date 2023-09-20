const express = require("express");
const session = require("express-session");
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB"); //connect to the database
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
// const corsOpts = {
//   origin: "*",

//   methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],

//   allowedHeaders: ["Content-Type"],
// };

// app.use(cors(corsOpts));

connectDB();

//app routes
const indexRouter = require("./routes/index.router"); //the routes of all the project
const initializeSocketIO = require("./config/socket");
const ContestConversationModel = require("./models/ContestConversation.model");
app.use("/", indexRouter);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const sendNotification = initializeSocketIO(server); // Pass the http server to the socket setup function

server.listen(PORT, (error) => {
  if (error) throw console.error(error);
  //console.log("Server is listening on port" + " " + PORT);
});

exports.sendNotification = sendNotification;
