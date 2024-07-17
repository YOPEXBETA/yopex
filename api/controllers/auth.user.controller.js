const userSchema = require("../models/user.model");
const companySchema = require("../models/Organization.model");
const badgeSchema = require("../models/BadgeType.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");
const Organization = require("../models/Organization.model");
const Invitation = require('../models/organizationInvitations.model');
const notificationModel = require("../models/notification.model");

// ==============================|| Register ||============================== //

const signUp = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const userExist = await userSchema.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).send({ error: { msg: "User already exists" } });
    }

    const companyExist = await companySchema.findOne({
      email: req.body.email,
    });
    if (companyExist) {
      return res.status(400).send({ error: { msg: "User already exists" } });
    }
    const newUser = new userSchema({
      ...req.body,
      password: hashedPass,
    });

    const badge = await badgeSchema.findOne({
      badgeName: "Account Creation",
    });

    if (badge && !newUser.badgesEarned.includes(badge._id)) {
      newUser.badgesEarned.push(badge._id);
    }

    const user = await newUser.save();

    const invitation = await Invitation.findOne({ email: req.body.email });
    if (invitation) {

      invitation.user = user._id;
      await invitation.save();
      const organization = await Organization.findById(invitation.organization);
      const notification = new notificationModel({
        type: 'invitation',
        message: `You have been invited to join ${organization.organizationName} as a ${invitation.role}`,
        picture: "https://icones.pro/wp-content/uploads/2021/04/icone-cloche-notification-verte.png",
        user: user._id,
        invitation: invitation._id,
      });
      await notification.save();

      console.log("User invitation and notification created successfully");
    }

    const newBadge = new badgeSchema({
      userId: req.userId,
      badgeName: req.body.badgeName,
      badgeDescription: req.body.badgeDescription,
      badgeImg: req.body.badgeImg,
      Etat: true,
    });
    await newBadge.save();

    return res.status(200).json({ msg: "user successfully created", user });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// ==============================|| Login ||============================== //

const signIn = async (req, res) => {
  try {
    //check if the email exist
    const user = await userSchema.findOne({ email: req.body.email });
    const company = await companySchema.findOne({ email: req.body.email });

    if (!user && !company)
      return res.status(400).json({ error: "Email does not exist!" });

    //check user status
    if (user.status !== "banned") {
      //check if the password is valid
      if (user) {
        const validated = await bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!validated)
          return res.status(400).json({ error: "Wrong password or email." });
      } else if (company) {
        const validated = await bcrypt.compareSync(
          req.body.password,
          company.password
        );
        if (!validated)
          return res.status(400).json({ error: "Wrong password or email." });
      }

      const { password, ...info } = user ? user._doc : company._doc;

      //if the both are valid then
      const token = jwt.sign(
        {
          id: user ? user._id : company._id,
          role: user ? user.role : company.role,
          email: user ? user.email : company.email,
        },
        process.env.passwordToken
      );

      if (company && !company.verified) {
        return res.status(400).json({ error: "Company not verified!" });
      }
      // set default cookies options
      let cookiesOptions = {
        expires: moment().add("24", "hours").toDate(),
      };
      if (req.body.rememberMe) {
        cookiesOptions.expires = moment().add("15", "days").toDate();
      }
      // add token to info object
      info.token = token;
      res.cookie("accessToken", token, cookiesOptions).status(200).send(info);
    } else {
      return res.status(403).json({ error: "Your account is banned" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// ==============================|| Logout ||============================== //
const logout = async (req, res) => {
  try {
    // Get the token from the request headers
    const blacklistedToken = req.header("Authorization").split(" ")[1];
    // Decode the token to get the user ID
    const decodedToken = jwt.verify(
      blacklistedToken,
      process.env.passwordToken
    );
    console.log(decodedToken);
    //get only the user id
    const userId = decodedToken.id;
    console.log(userId);
    // Fetch the user from the database
    const user = await userSchema.findById(userId);
    console.log(user);
    return res
      .status(200)
      .send({ msg: "Logout successfully", blacklistedToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// ==============================|| forgetpassword ||============================== //
const forgetpassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.passwordToken,
      {
        expiresIn: "1h",
      }
    );
    user.resetToken = resetToken;
    await user.save();

    // Send email with password reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Password Reset",
      html: `<p>Please click the following link to reset your password:</p><a href="https://yopexhub.com/reset-password/${resetToken}">https://yopexhub.com//reset-password/${resetToken}</a>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Password reset email sent" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// ==============================|| reset password ||============================== //
const resetpassword = async (req, res) => {
  try {
    const resetToken = req.body.resetToken;
    const Password = req.body.password;
    const user = await userSchema.findOne({ resetToken: resetToken });
    if (!user) {
      return res.status(404).json({ error: "Invalid reset token" });
    }
    const decoded = jwt.verify(resetToken, process.env.passwordToken);
    if (decoded.userId !== user._id.toString()) {
      return res.status(404).json({ error: "Invalid reset token" });
    }
    user.password = await bcrypt.hash(Password, 10);
    user.resetToken = undefined;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// ==============================|| signInWithGoogle ||============================== //

const signInWithGoogle = async (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.passwordToken
  );
  const { ...info } = user ? user._doc : company._doc;

  info.token = token;
  // console.log({ info });

  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/feed/?token="
      : "https://yopexhub.com/feed/?token=";

  res.redirect(url + token);
  // return res.status(200).send(info);
};
module.exports = {
  signUp,
  signIn,
  logout,
  signInWithGoogle,
  forgetpassword,
  resetpassword,
};
