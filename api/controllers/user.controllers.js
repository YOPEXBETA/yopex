const userSchema = require("../models/user.model");
const companySchema = require("../models/Organization.model");
const challengeSchema = require("../models/Challenge.model");
const roleSchema = require("../models/OrganizationRoles.model");
const bcrypt = require("bcryptjs");
const Job = require("../models/job.model");

const { pick } = require("lodash");
const ChallengeModel = require("../models/Challenge.model");
const notificationModel = require("../models/notification.model");
const { uploadFileToFirebase } = require("./firebase.controllers");
const userModel = require("../models/user.model");
const Skill = require("../models/skill.model");

// ==============================|| EditProfile ||============================== //

const editProfile = async (req, res) => {
  try {
    const {
      role,
      score,
      balance,
      email,
      historyPayment,
      isVerified,
      yearsRegistered,
      badgesEarned,
      reviews,
      posts,
      status,
      ...updateFields
    } = req.body;

    const updatedUser = await userSchema
      .findByIdAndUpdate(req.userId, updateFields, { new: true })
      .select(
        "firstname lastname email picturePath score country occupation skills"
      );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateSocialMediaLink = async (req, res) => {
  let { socialmedialinks } = req.body;
  try {
    if (socialmedialinks) {
      const validLinks = socialmedialinks.map((link) => {
        if (
          !["instagram", "github", "linkedin", "behance", "dribbble"].includes(
            link.platform
          )
        ) {
          return { error: "Invalid social media platform" };
        } else if (
          link.platform === "instagram" &&
          link.url &&
          !link.url.startsWith("https://www.instagram.com/")
        ) {
          return { error: "Invalid instagram link" };
        } else if (
          link.platform === "github" &&
          link.url &&
          !link.url.startsWith("https://github.com/")
        ) {
          return { error: "Invalid github link" };
        } else if (
          link.platform === "linkedin" &&
          link.url &&
          !link.url.startsWith("https://www.linkedin.com/")
        ) {
          return { error: "Invalid linkedin link" };
        } else if (
          link.platform === "behance" &&
          link.url &&
          !link.url.startsWith("https://www.behance.net/")
        ) {
          return { error: "Invalid behance link" };
        } else if (
          link.platform === "dribbble" &&
          link.url &&
          !link.url.startsWith("https://dribbble.com/")
        ) {
          return { error: "Invalid dribbble link" };
        }
        return link;
      });
      if (validLinks.some((link) => link.error)) {
        return res.status(400).json(validLinks.filter((link) => link.error));
      }

      socialmedialinks = validLinks;

      const user = await userSchema.findById(req.userId);
      user.socialMediaLinks = validLinks;

      user.save();
      return res.status(200).json(user);
    }
    res.status(400).json({ error: "Invalid social media links" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updatepassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);
    const user = await userSchema.findById(req.userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("mmm", error);

    return res.status(400).json({ message: "Invalid credentials" });
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
            {
              firstname: { $regex: searchTerm, $options: "i" },
            },
            {
              lastname: { $regex: searchTerm, $options: "i" },
            },
          ],
        },
        { role: { $ne: "admin" } },
      ],
    };

    const companyQuery = {
      companyName: { $regex: searchTerm, $options: "i" },
    };

    const users = await userSchema
      .find(userQuery)
      .select(
        "_id firstname lastname picturePath score country followers reviews"
      );
    const companies = await companySchema
      .find(companyQuery)
      .select("_id organizationName organizationLogo user");

    const results = [...users, ...companies];

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
      .select("-password")
      .populate("badgesEarned")
      .populate("jobs")
      .populate("challenges")
      .populate("organizations")
      .populate("skills")
        .populate("occupation");

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

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;

    const query = {};
    if (req.query.name) {
      const searchRegex = new RegExp(req.query.name, "i");
      query.$or = [
        { firstname: { $regex: searchRegex } },
        { lastname: { $regex: searchRegex } },
      ];
    }

    if (req.query.occupation) {
      query.occupation = req.query.occupation;
    }

    if (req.query.country) {
      query.country = req.query.country;
    }

    if (req.query.skills) {
      const skills = req.query.skills.split(',');
      query.skills = { $in: skills };
    }
    query.role = { $ne: 'admin' };
    const users = await userSchema
        .find(query)
        .select(
            "_id firstname lastname picturePath score country occupation followers reviews challengesDone skills"
        )
        .populate("reviews")
        .populate("occupation")
        .sort({ score: -1, createdAt: 1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec();

    // For test purposes
    users.forEach((user, index) => {
      user.rank = index + 1 + pageSize * (page - 1);
    });

    const totalCount = await userSchema.countDocuments(query);

    res.status(200).json({ users, userCount: totalCount });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


//getFollowers
const getUserFriends = async (req, res) => {
  try {
    const [currentUser] = await Promise.all([
      userSchema.findById(req.params.userId).select("-password"),
    ]);

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
    const id = req.params.userId;
    const user = await userSchema.findById(id).select("-password");

    if (user) {
      const userFollowingss = [];
      const companyFollowings = [];

      const userFollowings = await Promise.all(
        user.followings.map(async (friendId) => {
          const friend = await userSchema
            .findById(friendId)
            .select("-password");
          if (friend) {
            userFollowingss.push(friend);
          } else {
            const company = await companySchema.findById(friendId);
            companyFollowings.push(company);
          }
        })
      );
      const followings = userFollowings.filter((friend) => friend !== null);
      return res.status(200).json({ userFollowingss, companyFollowings });
    } else {
      const company = await companySchema.findById(id);
      if (company) {
        // Fetch company followings
        const companyFollowings = await Promise.all(
          user.followings.map(async (companyId) => {
            const company = await companySchema.findById(companyId);
            if (company) {
              return company;
            }
          })
        );

        const followings = companyFollowings.filter(
          (company) => company !== null
        );

        return res
          .status(200)
          .json({ userFollowings: [], companyFollowings: followings });
      } else {
        return res.status(404).json({ message: "ID not found" });
      }
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserFollowingsCompanies = async (req, res) => {
  try {
    const [currentUser] = await Promise.all([
      userSchema.findById(req.params.userId).select("-password"),
    ]);

    const companyFollowings = await Promise.all(
      currentUser.followings.map(async (companyId) => {
        const company = await companySchema.findById(companyId);
        if (company) {
          return company;
        }
      })
    );

    const followings = companyFollowings.filter((company) => company !== null);

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

const followUnfollowCompany = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const companyId = req.params.companyId;
    const currentUser = await userSchema.findById(currentUserId);

    if (!currentUser.followings.includes(companyId)) {
      currentUser.followings.push(companyId);
      await currentUser.save();
      return res
        .status(200)
        .json({ msg: "You have successfully followed the company!" });
    } else {
      currentUser.followings = currentUser.followings.filter(
        (id) => id !== companyId
      );
      await currentUser.save();
      return res
        .status(200)
        .json({ msg: "You have successfully unfollowed the company!" });
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
    const user = await userSchema.findById(req.userId).select("-password");
    const challenge = await challengeSchema.findById(req.body.idChallenge);
    if (
      challenge.users.length > challenge.nbruser ||
      challenge.banned.includes(user._id.toString())
    ) {
      return res
        .status(200)
        .json({ message: "you cannot join this challenge" });
    }
    if (challenge.users.includes(user._id)) {
      return res.status(200).json({ message: "User already joined challenge" });
    }
    // Add challenge to user's challenges array
    user.challenges.push(challenge._id);
    user.challengesDone = ++user.challengesDone;
    await user.save();
    // Add user to challenge's users array
    challenge.users.push({
      user: user._id,
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
    const user = await userSchema.findById(req.userId).select("-password");
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
    const challenges = await userSchema.findById(userId).populate({
      path: "challenges",
      model: "Challenge",
      populate: {
        path: "organization",
        model: "Organization",
      },
    });

    res.status(200).json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");
    const organizations = user.organizations;
    let notifications = await notificationModel
      .find({ user: userId })
      .populate("job")
      .populate("challenge")
      .sort({ createdAt: -1 });
    for (const companyId of organizations) {
      const notif = await notificationModel
        .find({ company: companyId })
        .populate("job")
        .populate("challenge")
        .sort({ createdAt: -1 });

      notifications = notifications.concat(notif);
    }

    const countNotSeenNotifications = await notificationModel.countDocuments({
      user: userId,
      seen: false,
    });

    res
      .status(200)
      .json({ notification: notifications, countNotSeenNotifications });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/*-----------------------------------------Create a Company -----------------------------------------*/

const CreateCompany = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const organization = new companySchema({
      ...req.body,
      user: user._id,
    });
    await organization.save();

    // Check if user is defined before pushing organization._id
    if (user.organizations) {
      user.organizations.push(organization._id);
      await user.save();
    } else {
      console.error("User object does not have 'organizations' property.");
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({ message: "Company created successfully", organizationId: organization._id });

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
      .populate("skills")
        .populate("occupation");

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const seeNotification = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userSchema.findById(userId).select("notifications");
    const unseenNotifications = await notificationModel.find({
      seen: false,
      user: userId,
    });

    // Update each notification to set seen=true
    for (const notification of unseenNotifications) {
      notification.seen = true;
      await notification.save();
    }
    res.status(200).json({ message: "Notification seen" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getStatistic = async (req, res) => {
  try {
    const countusers = await userSchema.countDocuments();
    const countcompanies = await companySchema.countDocuments();
    const countjobs = await Job.countDocuments();
    const countchallenges = await ChallengeModel.countDocuments();
    return res
      .status(200)
      .send({ countusers, countcompanies, countjobs, countchallenges });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const type = req.body.type || "undefined";

    const downloadURL = await uploadFileToFirebase(file, type);

    res
      .status(200)
      .json({ message: "File uploaded to Firebase Storage", downloadURL });
  } catch (error) {
    res
      .status(500)
      .json({ error: "File upload failed", details: error.message });
  }
};


const updateUserWorkspace = async (req, res) => {
  try {
    const { userId } = req.params;
    const { workspace, organizationID } = req.body;


    if (!['User', 'Organization'].includes(workspace)) {
      console.error('Invalid workspace type:', workspace);
      return res.status(400).json({ message: 'Invalid workspace type' });
    }

    const update = {
      'currentWorkspace.label': workspace,
      'currentWorkspace.organizationID': organizationID,
    };

    // Perform the update
    const user = await userSchema.findByIdAndUpdate(
        userId,
        update,
        { new: true }
    );

    if (!user) {
      console.error('User not found for ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }


    res.json({ currentWorkspace: user.currentWorkspace });
  } catch (error) {
    // Log the error stack
    console.error('Error updating workspace:', error);
    res.status(500).json({ message: 'Error updating workspace' });
  }
};




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
  CreateCompany,
  getCurrentUser,
  followUnfollowCompany,
  getUserFollowingsCompanies,
  seeNotification,
  getStatistic,
  uploadFile,
  updatepassword,
  updateSocialMediaLink,
  updateUserWorkspace
};
