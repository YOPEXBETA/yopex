const badgeSchema = require("../models/BadgeType.model");

const updateUserChallengesBadges = async (User) => {
  const addedBadges = [];

  const firstChallengeBadge = await badgeSchema.findOne({
    badgeName: "Won a challenge",
  });

  addedBadges.push(firstChallengeBadge);

  if (User.challengesWon >= 5) {
    const secondChallengeBadge = await badgeSchema.findOne({
      badgeName: "Won five challenge",
    });
    addedBadges.push(secondChallengeBadge);
  }

  if (User.challengesWon >= 20) {
    const thirdChallengeBadge = await badgeSchema.findOne({
      badgeName: "Won twenty challenges",
    });
    addedBadges.push(thirdChallengeBadge);
  }

  addedBadges.forEach((badge) => {
    if (!User.badgesEarned.includes(badge._id)) {
      User.badgesEarned.push(badge._id);
    }
  });
};

const updateUserSubmissionsBadges = async (User) => {
  const addedBadges = [];

  const firstChallengeBadge = await badgeSchema.findOne({
    badgeName: "Completed a challenge",
  });

  addedBadges.push(firstChallengeBadge);

  if (User.submissions.length >= 10) {
    const secondChallengeBadge = await badgeSchema.findOne({
      badgeName: "Completed 10 challenges",
    });
    addedBadges.push(secondChallengeBadge);
  }

  if (User.submissions.length >= 50) {
    const thirdChallengeBadge = await badgeSchema.findOne({
      badgeName: "Completed 50 challenges",
    });
    addedBadges.push(thirdChallengeBadge);
  }

  addedBadges.forEach((badge) => {
    if (badge) {
      if (!User.badgesEarned.includes(badge._id)) {
        User.badgesEarned.push(badge._id);
      }
    }
  });
};

module.exports = {
  updateUserChallengesBadges,
  updateUserSubmissionsBadges,
};
