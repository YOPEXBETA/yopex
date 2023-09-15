const express = require("express");
const PayementRouter = express.Router();

const { Payment, Verify } = require("../controllers/Floucipayment.controller");
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");

PayementRouter.post("/payment",authenticateToken, Payment);
PayementRouter.post("/payment/:id",authenticateToken, Verify); 

module.exports = PayementRouter;
