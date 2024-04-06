const ChallengeModel = require("../models/Challenge.model");
const notificationModel = require("../models/notification.model");
const Submission = require("../models/submission.model");
const User = require("../models/user.model");
const { updateUserSubmissionsBadges } = require("../utils/utilities");
const main = require("../server");

const CreateSubmission = async (req, res, next) => {
  try {
    const { challengeId, userId, title, description, filesPaths, links } =
      req.body;

    // Create submission object
    const submission = new Submission({
      challengeId,
      userId,
      title,
      description,
      filesPaths,
      links,
    });

    // check if challenge is started
    const challenge =
      await ChallengeModel.findById(challengeId).populate("company");
    if (!challenge) {
      return res.status(400).json({ message: "Challenge not found" });
    }

    if (!challenge.start) {
      return res.status(400).json({ message: "Challenge not started" });
    }
    if (challenge.deadline < Date.now()) {
      return res.status(400).json({ message: "Challenge is closed" });
    }

    // Save submission to database
    const savedSubmission = await submission.save();

    // Add submission to challenge

    const user = await User.findById(userId)
      .select("-password")
      .populate("submissions");

    challenge.submissions.push(savedSubmission._id);
    user.submissions.push(savedSubmission._id);

    updateUserSubmissionsBadges(user);

    challenge.users.map((user, index) => {
      if (user.user == userId) {
        challenge.users[index].submissionDate = new Date();
      }
    });
    await challenge.save();
    await user.save();
    // cretae notification
    const notification = new notificationModel({
      type: "submission",
      message: `You have submitted a solution for ${challenge.title}`,
      user: userId,
      picture: user.profilePicture,
    });
    await notification.save();
    main.sendNotification(userId.toString(), notification);
    const notification2 = new notificationModel({
      type: "submission",
      message: `A user (${user.firstname} ${user.lastname}) has submitted a solution for ${challenge.title}`,
      user: challenge.owner,
      picture: user.picturePath,
    });
    await notification2.save();
    main.sendNotification(challenge.owner.toString(), notification2);
    main.sendNotification(challenge.company.user.toString(), notification2);

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editsubmission = async (req, res) => {
  const { challengeId, userId, title, description, filesPaths, links } =
    req.body;
  try {
    const challenge = await ChallengeModel.findById(challengeId);
    if (!challenge) {
      return res.status(400).json({ message: "Challenge not found" });
    }
    if (challenge.deadline < Date.now()) {
      return res.status(400).json({ message: "Challenge is closed" });
    }
    const submission = await Submission.findOneAndUpdate(
      { challengeId, userId },
      { title, description, filesPaths, links }
    );
    res.status(201).json(submission);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  CreateSubmission,
  editsubmission,
};
