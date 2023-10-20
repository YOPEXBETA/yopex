const express = require("express");
const FirebaseRouter = express.Router();
const upload = require("../config/multer");

//imported controllers
const { FireBaseFileUpload } = require("../controllers/firebase.controllers");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

FirebaseRouter.post("/upload", authenticateToken, upload.single("filename"));

module.exports = FirebaseRouter;
