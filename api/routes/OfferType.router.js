const express = require("express");
const OfferTypeRouter = express.Router();

const {
  createOfferType,
  getJobsOfferType,
} = require("../controllers/OfferType.controllers");

OfferTypeRouter.post("/add", createOfferType);
OfferTypeRouter.get("/all", getJobsOfferType);

module.exports = OfferTypeRouter;
