const OfferTypeModel = require("../models/OfferType.model");

const createOfferType = async (req, res) => {
  try {
    const offerType = await OfferTypeModel.create({
      name: req.body.name,
    });
    res.status(201).json(offerType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobsOfferType = async (req, res) => {
  try {
    const offerType = await OfferTypeModel.find();
    res.status(200).json(offerType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOfferType,
  getJobsOfferType,
};
