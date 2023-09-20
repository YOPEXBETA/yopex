const userSchema = require("../models/user.model");
const companySchema = require("../models/company.model");
const badgeSchema = require("../models/BadgeType.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");
const Token = require("../models/tokens.model");
const crypto = require("crypto");
const { sendEmail } = require("../middlewares/mail.middleware");

// ==============================|| Register ||============================== //

const signUp = async (req, res) => {
  try {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // Log the hashed password for debugging purposes
    // console.log(typeof hashedPass, hashedPass);

    // Check if the user already exists in the userSchema collection
    const userExist = await userSchema.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).send({ error: { msg: "User already exists" } });
    }
    if (req.body.password != req.body.repeatPassword) {
      return res
        .status(400)
        .send({ error: { msg: "Passwords do not match !" } });
    }

    // Check if the user already exists in the companySchema collection
    const companyExist = await companySchema.findOne({
      email: req.body.email,
    });
    if (companyExist) {
      return res.status(400).send({ error: { msg: "User already exists" } });
    }

    // If the role is "user"
    if (req.body.role === "user") {
      // Create a new user with the hashed password
      const newUser = new userSchema({
        ...req.body,
        password: hashedPass,
      });

      const token = new Token({
        userId: newUser._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await token.save();

      const link = `http://localhost:3000/emailverification/${token.token}`;
      await sendEmail(newUser.email, link);

      // Check if the user is a first-time user and add the "Account Creation" badge
      const badge = await badgeSchema.findOne({
        badgeName: "Account Creation",
      });

      if (badge && !newUser.badgesEarned.includes(badge._id)) {
        newUser.badgesEarned.push(badge._id);
      }

      // Save the new user to the userSchema collection
      const user = await newUser.save();

      // Return a success response with the new user data
      return res.status(200).json({ msg: "user successfully created", user });
    }
    // If the role is "company"
    else if (req.body.role === "company") {
      // Create a new company with the hashed password

      if (!req.body.firstname || !req.body.lastname) {
        return res.status(400).send({
          error: {
            msg: "First name and last name are required for company sign up",
          },
        });
      }

      const newCompany = new companySchema({
        ...req.body,
        password: hashedPass,
      });

      // Save the new company to the companySchema collection
      // const company = await newCompany.save();

      // Check if the company is a first-time user and add the "Account Creation" badge
      const badge = await badgeSchema.findOne({
        badgeName: "Account Creation",
      });
      if (badge && !newCompany.badgesEarned.includes(badge._id)) {
        newCompany.badgesEarned.push(badge._id);
      }

      await newCompany.save();
      // Return a success response with the new company data
      return res
        .status(200)
        .json({ msg: "Company successfully created", newCompany });
    }
  } catch (error) {
    // Log any errors that occur and return an error response with the error data
    console.log(error);
    return res.status(500).json(error);
  }
};

// ==============================|| Login ||============================== //

const signIn = async (req, res) => {
  try {
    //check if the email exist
    const user = await userSchema.findOne({ email: req.body.email });
    const company = await companySchema.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ error: "Email does not exist!" });

    if (user.isVerified == false)
      return res.status(400).json({ error: "Please verify your account !" });

    //check user status
    if (user.isActive) {
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
    //get only the user id
    const userId = decodedToken.id;
    // Fetch the user from the database
    const user = await userSchema.findById(userId);
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
      return res.status(400).json({ error: "User not found" });
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
      html: `<p>Please click the following link to reset your password:</p><a href="http://localhost:3000/reset-password/${resetToken}">http://localhost:3000/reset-password/${resetToken}</a>`,
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
  const cookiesOptions = {
    expires: moment().add("15", "days").toDate(),
  };
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.passwordToken
  );
  res.cookie("accessToken", token, cookiesOptions);

  res.redirect("http://localhost:3000/feed");
};

const emailconfirmation = async (req, res) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });
    console.log(token);
    await userSchema.updateOne(
      {
        _id: token.userId,
      },
      {
        $set: { isVerified: true },
      }
    );
    await Token.findByIdAndRemove(token._id);
    res.status(200).json({ message: "Account activated !" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = {
  signUp,
  signIn,
  logout,
  forgetpassword,
  resetpassword,
  signInWithGoogle,
  emailconfirmation,
};
