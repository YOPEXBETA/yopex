const express = require("express");
const levelRouter = express.Router();

const { updateUserLevel } = require("../controllers/levels.controller");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

levelRouter.post("/:userId/updateLevel", updateUserLevel);

module.exports = levelRouter;
