const reviewModel = require("../models/Review.model");
const userModel = require("../models/user.model");

const challengeModel = require("../models/Challenge.model");
const companyModel = require("../models/company.model");
const ObjectId = require("mongoose").Types.ObjectId;

const createReview = async (req, res) => {
  if (req.body.star > 10) {
    return res
      .status(400)
      .json({ message: "Star value must be between 1 and 10" });
  }
  const newReview = new reviewModel({
    companyId: req.body.companyId,
    userId: req.body.userId,
    description: req.body.description,
    star: req.body.star,
    challengeId: req.body.challengeId,
  });
  const challenge = await challengeModel.findById(req.body.challengeId);
  if (!challenge) {
    return res.status(404).json({ message: "Challenge not found" });
  }
  challenge.users.forEach((user) => {
    console.log(user);
    if (user.user.toString() === req.body.userId) {
      console.log(user);
      user.review = true;
    }
  });
  challenge.save();
  const company = await companyModel.findById(req.body.companyId);
  if (!company) {
    newReview.companyId = null;
    newReview.challengeOwnerId = req.body.companyId;
  }
  

  try {
    const savedReview = await newReview.save();

    const user = await userModel.findById(req.body.userId);
    user.score = user.score + req.body.star * 10;
    user.save();

    await res.status(200).json(savedReview);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        userId: new ObjectId(req.params.id),
      })
      
      .populate({ path: "challengeOwnerId", model: "User" ,select:"firstname lastname picturePath"})
      .populate({ path: "companyId", model: "Company" ,select:"companyName companyLogo"})
      .populate({ path: "challengeId", model: "Challenge",select:"title"});

    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const deleteReview = async (req, res) => {
  try {
    const review = await reviewModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await challengeModel.findByIdAndUpdate(review.challengeId, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getReviewsByChallengeUser = async (req, res) => {
  try {
    const review = await reviewModel.findOne({
      challengeId: new ObjectId(req.params.id),
      userId: new ObjectId(req.userId),
    });
    if (review) res.status(200).json(review);
    else res.status(404).json({ message: "Review not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
module.exports = {
  createReview,
  getReviews,
  deleteReview,
  getReviewsByChallengeUser,
};
