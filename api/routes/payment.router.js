const express = require("express");
const PayementRouter = express.Router();

const { Payment, Verify } = require("../controllers/Floucipayment.controller");

PayementRouter.post("/payment", Payment);
PayementRouter.post("/payment/:id", Verify);

module.exports = PayementRouter;
