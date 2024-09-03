const reviewModel = require("../models/Review.model");
const userModel = require("../models/user.model");
const TeamChallengeModel = require("../models/TeamChallenge.model");
const challengeModel = require("../models/Challenge.model");
const organizationModel = require("../models/Organization.model");
const ObjectId = require("mongoose").Types.ObjectId;
const Team = require("../models/team.model");

const createReview = async (req, res) => {
  try {
    if (req.body.star > 10 || req.body.star < 1) {
      return res
        .status(400)
        .json({ message: "Star value must be between 1 and 10" });
    }

    const review = await reviewModel.findOne({
      userId: req.body.userId,
      challengeId: req.body.challengeId,
    });

    if (review) {
      return res.status(400).json({ message: "Review already exists" });
    }

    const newReview = new reviewModel({
      organizationId: req.body.organizationId,
      userId: req.body.userId,
      description: req.body.description,
      star: req.body.star,
      challengeId: req.body.challengeId,
    });

    const challenge = await challengeModel.findById(req.body.challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    let userFound = false;
    challenge.users.forEach((user) => {
      if (user.user.toString() === req.body.userId) {
        userFound = true;
        user.review = true;
        user.star = req.body.star;
      }
    });

    if (!userFound) {
      return res.status(404).json({ message: "User not found in challenge" });
    }

    await challenge.save();

    const organization = await organizationModel.findById(req.body.organizationId);
    if (!organization) {
      newReview.organizationId = null;
      newReview.challengeOwnerId = req.body.organizationId;
    }

    const savedReview = await newReview.save();

    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Associate review with user
    user.reviews.push(savedReview._id);
    user.score = user.score + req.body.star * 10;
    await user.save();
    console.log("User updated with review:", user);

    return res.status(200).json(savedReview);
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

      .populate({
        path: "challengeOwnerId",
        model: "User",
        select: "firstname lastname picturePath",
      })
      .populate({
        path: "organizationId",
        model: "Organization",
        select: "organizationName organizationLogo",
      })
      .populate({ path: "challengeId", model: "Challenge", select: "title" });

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

const createTeamReview = async (req, res) => {
  try {
    const { teamChallengeId, teamId, star, description } = req.body;

    if (star > 10 || star < 1) {
      return res.status(400).json({ message: "Star value must be between 1 and 10" });
    }

    const existingReview = await reviewModel.findOne({
      teamId,
      teamChallengeId,
    });

    if (existingReview) {
      return res.status(400).json({ message: "Review for this team already exists" });
    }

    // Create a new review
    const newReview = new reviewModel({
      teamId,
      teamChallengeId,
      description,
      star,
      challengeOwnerId: req.body.challengeOwnerId,
    });

    const teamChallenge = await TeamChallengeModel.findById(teamChallengeId);
    if (!teamChallenge) {
      return res.status(404).json({ message: "Team challenge not found" });
    }

    const team = teamChallenge.teams.find(
        (teamEntry) => teamEntry.team.toString() === teamId
    );

    if (!team) {
      return res.status(404).json({ message: "Team not found in challenge" });
    }
    const currentTeam =await Team.findById(team.team)
    for (const member of currentTeam?.members) {
      const memberUser = await userModel.findById(member);
      if (memberUser) {
        memberUser.reviews.push(newReview._id);
        memberUser.score += star * 10;
        await memberUser.save();
      }
    }

    const teamLeader = await userModel.findById(currentTeam?.teamLeader);
    if (teamLeader) {
      teamLeader.reviews.push(newReview._id);
      teamLeader.score += star * 10;
      await teamLeader.save();
    }

    const savedReview = await newReview.save();

    return res.status(200).json(savedReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};


module.exports = {
  createReview,
  getReviews,
  deleteReview,
  getReviewsByChallengeUser,
  createTeamReview
};
