const express = require("express");
const PayementRouter = express.Router();

const { isAdmin } = require("../middlewares/isAdmin.middleware");


const { Payment, Verify } = require("../controllers/Floucipayment.controller");
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");
const { getPayments, getPaymentByUser } = require("../controllers/payment.controllers");

PayementRouter.post("/payment",authenticateToken, Payment);
PayementRouter.post("/payment/:id",authenticateToken, Verify); 
PayementRouter.get("/allpayments",isAdmin, getPayments);
PayementRouter.get("/payment/user/:id",authenticateToken, getPaymentByUser);

module.exports = PayementRouter; 
