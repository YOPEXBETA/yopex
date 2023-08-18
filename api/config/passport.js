const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userSchema = require("../models/user.model");
const companySchema = require("../models/company.model");
const badgeSchema = require("../models/BadgeType.model");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      // Check if the user already exists in the userSchema collection
      const userExist = await userSchema.findOne({
        email: profile?._json?.email,
      });
      if (userExist) {
        // LoggedIn user here
        googleAuthSignIn(userExist, accessToken, refreshToken, profile, cb);
      } else {
        //register user here
        googleAuthSignup(accessToken, refreshToken, profile, cb);
      }
    },
  ),
);

const googleAuthSignup = async (accessToken, refreshToken, profile, cb) => {
  // Create a new user with the hashed password
  const newUser = new userSchema({
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    email: profile?._json?.email,
    picturePath: profile?._json?.picture,
  });
  // Check if the user is a first-time user and add the "Account Creation" badge
  const badge = await badgeSchema.findOne({
    badgeName: "Account Creation",
  });
  if (badge && !newUser.badgesEarned.includes(badge._id)) {
    newUser.badgesEarned.push(badge._id);
  }
  // Save the new user to the userSchema collection
  const user = await newUser.save();

  // Create a new badge for the user
  // const newBadge = new badgeSchema({
  //   userId: req.userId,
  //   badgeName: req.body.badgeName,
  //   badgeDescription: req.body.badgeDescription,
  //   badgeImg: req.body.badgeImg,
  //   Etat: true,
  // });
  // await newBadge.save();

  return cb(null, user);
};

const googleAuthSignIn = async (
  user,
  accessToken,
  refreshToken,
  profile,
  cb,
) => {
  //check user status
  if (user.isActive) {
    return cb(null, user);
  } else {
    return cb(null, { error: "Your account is banned" });
  }
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
