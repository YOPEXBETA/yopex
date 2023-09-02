const userSchema = require("../models/user.model");
const companySchema = require("../models/company.model");
const challengeSchema = require("../models/Challenge.model");
const bcrypt = require("bcryptjs");
const Job = require("../models/job.model");
const { pick } = require("lodash");
const ChallengeModel = require("../models/Challenge.model");

// ==============================|| EditProfile ||============================== //
const editProfile = async (req, res) => {
  try {
    const updateFields = pick(req.body, [
      "firstname",
      "lastname",
      "email",
      "password",
      "picturePath",
      "country",
      "gender",
      "phoneNumber",
      "birthDate",
    ]);

    if (updateFields.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(updateFields.password, salt);
      updateFields.password = hashedPass;
    }
    const updatedUser = await userSchema
      .findByIdAndUpdate(req.userId, updateFields, { new: true })
      .select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// ==============================|| Search for  users ||============================== //
const SearchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.search || "";

    const userQuery = {
      $and: [
        {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ["$firstname", " ", "$lastname"] },
                  regex: searchTerm,
                  options: "i",
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ["$lastname", " ", "$firstname"] },
                  regex: searchTerm,
                  options: "i",
                },
              },
            },
          ],
        },
        { role: { $ne: "admin" } },
      ],
    };

    const companyQuery = {
      companyName: { $regex: searchTerm, $options: "i" },
    };

    const users = await userSchema.find(userQuery).select("-password");
    const companies = await companySchema.find(companyQuery);

    const results = [
      ...users,
      ...companies
    ];

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//getUserByid
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema
      .findById(id)
      .populate({ path: "badgesEarned" })
      .populate("jobs")
      .populate("challenges")
      .populate("companies");

    if (user) {
      res.status(200).json(user);
    } else {
      const company = await companySchema.findById(id);
      res.status(200).json(company);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//getAllUsers
const getUsers = async (req, res) => {
  try {
    const users = await userSchema.find({ role: { $ne: "admin" } });
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//getFollowers
const getUserFriends = async (req, res) => {
  try {
    // Find the current user by their ID using both userSchema and companySchema
    const [currentUser] = await Promise.all([
      userSchema.findById(req.params.userId).select("-password"),
    ]);

    // Fetch the details of all of the user's friends using their friend IDs
    const userFriends = await Promise.all(
      currentUser.followers.map(async (friendId) => {
        const friend = await userSchema.findById(friendId).select("-password");
        if (friend) {
          return friend;
        }
      })
    );

    const friends = [...userFriends].filter((friend) => friend !== null);

    // Return the list of the user's friends as a JSON response
    return res.status(200).json(friends);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserFollowings = async (req, res) => {
  try {
    // Find the current user by their ID using both userSchema and companySchema
    const [currentUser] = await Promise.all([
      userSchema.findById(req.params.userId).select("-password"),
    ]);

    // Fetch the details of all of the user's friends using their friend IDs
    const userFollowings = await Promise.all(
      currentUser.followings.map(async (friendId) => {
        const friend = await userSchema.findById(friendId).select("-password");
        if (friend) {
          return friend;
        }
      })
    );

    const followings = [...userFollowings].filter((friend) => friend !== null);

    // Return the list of the user's friends as a JSON response
    return res.status(200).json(followings);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const followUnfollowUser = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const otherUserId = req.params.otherUserId;

    if (currentUserId === otherUserId) {
      throw new Error("You can't follow yourself");
    }

    const currentUser = await userSchema.findById(currentUserId);
    const otherUser = await userSchema.findById(otherUserId);

    if (!currentUser.followings.includes(otherUserId)) {
      currentUser.followings.push(otherUserId);
      otherUser.followers.push(currentUserId);

      await currentUser.save();
      await otherUser.save();

      return res
        .status(200)
        .json({ msg: "You have successfully followed the user!" });
    } else {
      currentUser.followings = currentUser.followings.filter(
        (id) => id !== otherUserId
      );
      otherUser.followers = otherUser.followers.filter(
        (id) => id !== currentUserId
      );

      await currentUser.save();
      await otherUser.save();

      return res
        .status(200)
        .json({ msg: "You have successfully unfollowed the user!" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getsuggestedUsers = async (req, res) => {
  try {
    const users = await userSchema
      .find({ role: { $ne: "admin" } })
      .select("-password");
    const companies = await companySchema.find().select("-password");

    let suggestedUsers = [...users, ...companies].slice(0, 10);

    return res.status(200).json(suggestedUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//-------------------------------------------get User earned badges-----------------------------------------------//
const getBadgesEarnedByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userSchema.findById(userId).populate("badgesEarned");
    return res.status(200).json(user.badgesEarned);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to retrieve badges" });
  }
};
//-------------------------------------------get User stats-----------------------------------------------//

const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await userSchema.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
//-------------------------------------------CHALLENGES-----------------------------------------------//

const JoinChallenge = async (req, res) => {
  try {
    const user = await userSchema.findById(req.body.idUser).select("-password");
    const challenge = await challengeSchema.findById(req.body.idChallenge);
    console.log(challenge.users);
    console.log(user._id);
    if (challenge.users.includes(user._id)) {
      return res.status(400).json({ message: "User already joined challenge" });
    }
    // Add challenge to user's challenges array
    user.challenges.push(challenge._id);
    user.challengesDone = ++user.challengesDone;
    await user.save();
    // Add user to challenge's users array
    challenge.users.push({
      user:user._id,
      registrationDate: Date.now(),
    });
    await challenge.save();

    res.status(200).send(user);
  } catch (error) {
    console.log("Error joining challenge:", error);
    res.status(500).send("Error joining challenge.");
  }
};

const unjoinChallenge = async (req, res) => {
  try {
    const user = await userSchema.findById(req.body.idUser).select("-password");
    const challenge = await challengeSchema.findById(req.body.idChallenge);

    // Remove challenge from user's challenges array
    user.challenges = user.challenges.filter(
      (challengeId) => challengeId.toString() !== challenge._id.toString()
    );
    await user.save();

    // Remove user from challenge's users array
    
    challenge.users = challenge.users.filter(
      (part) => part.user.toString() !== user._id.toString()
    );
    await challenge.save();

    res.status(200).send(user);
  } catch (error) {
    console.log("Error unjoining challenge:", error);
    res.status(500).send("Error unjoining challenge.");
  }
};

const getUserChallenges = async (req, res) => {
  try {
    const userId = req.query.userId; // Get userId from the query parameter
    console.log(userId);
    const challenges = await userSchema.findById(userId).populate({
      path: "challenges",
      model: "Challenge",
      populate: {
        path: "company",
        model: "Company",
        select: "-password",
      },
    });
    res.status(200).json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUserNotifications = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.userId)
      .populate("notifications")
      .populate({
        path: "notifications",
        populate: {
          path: "job",
          populate: {
            path: "company",
            select: "companyName",
          },
        },
      })
      .populate({
        path: "notifications",
        populate: {
          path: "challenge",
          populate: {
            path: "company",
            select: "companyName",
          },
        },
      });
      if (!user) throw new Error("User not found");
    //const processedJobs = new Set();
    // const notifications = await Promise.all(
    //   user.notifications.map(async (notification) => {
    //     if (
    //       notification.job &&
    //       !processedJobs.has(notification.job.toString())
    //     ) {
    //       processedJobs.add(notification.job.toString());
    //       const job = await Job.findById(notification.job).populate("company");
    //       console.log(job);

    //       if (job) {
    //         notification.job = job;
    //         return {
    //           message: notification.message,
    //           createdAt: notification.createdAt,
    //           job: job,
    //           challenge: null,
    //         };
    //       }
    //     } else if (notification.challenge) {
    //       const challenge = await ChallengeModel.findById(
    //         notification.challenge
    //       ).populate("company");
    //       if (challenge) {
    //         return {
    //           message: notification.message,
    //           createdAt: notification.createdAt,
    //           job: null,
    //           challenge: challenge,
    //         };
    //       }
    //     }
    //   })
    // );
    
    const companies = user.companies;
    notifications = user.notifications;
    for (const companyId of companies) {
      const company = await companySchema
        .findById(companyId)
        .populate("notificationsCompany")
        .populate({
          path: "notificationsCompany",
          match: { seen: false },
          populate: {
            path: "user",
            select: "firstname lastname picturePath",
          },
        });

        notifications = notifications.concat(company.notificationsCompany);
    }
    notifications.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const banUser = async (req, res) => {
  try {
    const updatedUser = await userSchema
      .findOneAndUpdate(
        { _id: req.params.id },
        [{ $set: { isActive: { $eq: [false, "$isActive"] } } }],
        { new: true }
      )
      .select("-password");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

/*-----------------------------------------Create a Company -----------------------------------------*/

const CreateCompany = async (req, res) => {
  try {
    const { companyName, companyDescription, companyLogo } = req.body;
    const userId = req.userId;

    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const company = new companySchema({
      companyName,
      companyDescription,
      companyLogo,
      user: user._id,
    });

    await company.save();

    user.companies.push(company._id);
    await user.save();

    return res.status(200).json({ message: "Company created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await userSchema
      .findById(req.userId)
      .select("-password")
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  editProfile,
  SearchUsers,
  getUser,
  getUsers,
  getUserFriends,
  getUserFollowings,
  getsuggestedUsers,
  getBadgesEarnedByUser,
  followUnfollowUser,
  JoinChallenge,
  unjoinChallenge,
  getUserChallenges,
  getUserStats,
  getUserNotifications,
  banUser,
  CreateCompany,
  getCurrentUser
};
