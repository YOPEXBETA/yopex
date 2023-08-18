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

//server running
const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (client) => {
  console.log("socket is connected");
});
server.listen(PORT, (error) => {
  if (error) throw console.error(error);
  console.log("Server is listening on port" + " " + PORT);
});
