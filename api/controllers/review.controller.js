const reviewModel = require("../models/Review.model");
const userModel = require("../models/user.model");

const challengeModel = require("../models/Challenge.model");
const ObjectId = require("mongoose").Types.ObjectId;

const createReview = async (req, res) => {
  if (req.body.star > 10) {
    return res
      .status(400)
      .json({ message: "Star value must be between 1 and 5" });
  }
  const newReview = new reviewModel({
    companyId: req.body.companyId,
    userId: req.body.userId,
    description: req.body.description,
    star: req.body.star,
    challengeId: req.body.challengeId,
  });

  try {

    const savedReview = await newReview.save();
    const user = await userModel.findById(req.body.userId);
    const updatedScore = user.score + (req.body.star*10);
    await userModel.findByIdAndUpdate(req.body.userId, { score: updatedScore });
    //we should update our challenge after we are giving a review and i'm going to increment my total stars

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
      .populate({ path: "companyId", model: "Company" })
      .populate({ path: "challengeId", model: "Challenge"});

    console.log(new ObjectId(req.params.id));
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

    console.log(req.params.id);
    console.log(req.userId);
    console.log(review);

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
    const review = await reviewModel
      .findOne({
        challengeId: new ObjectId(req.params.id),
        userId: new ObjectId(req.userId),
      });
    if (review) res.status(200).json(review);
    else res.status(404).json({ message: "Review not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
module.exports = {
  createReview,
  getReviews,
  deleteReview,
  getReviewsByChallengeUser,
};
