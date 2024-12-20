const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

const CLIENT_URL = "https://yopexhub.com/";

//imported controllers
const {
  signIn,
  signInWithGoogle,
  signUp,
  logout,
  forgetpassword,
  resetpassword,
} = require("../controllers/auth.user.controller");

//imported schema validator
const validate = require("../middlewares/SchemaValidation.middleware");
//imported validators
const {
  userRegisterValidator,
  loginValidator,
} = require("../validators/user.auth.validators");

const {
  companyRegisterValidator,
} = require("../validators/company.auth.validators");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

authRouter.get("/currentUser", authenticateToken, async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (err) {
    res.send(err.message);
  }
});

authRouter.post(
  "/register",
  (req, res, next) => {
    if (req.body.role === "user") {
      return validate(userRegisterValidator)(req, res, next);
    } else if (req.body.role === "company") {
      return validate(companyRegisterValidator)(req, res, next);
    }
  },
  signUp
);
authRouter.post("/login", validate(loginValidator), signIn);
authRouter.post("/logout", logout);
authRouter.post("/forgetpassword", forgetpassword);
authRouter.post("/resetpassword", resetpassword);

//Google Authentication Success
authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    return res.cookie("accessToken", "test").res.status(200).json(req.user);
  }
});

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// authRouter.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL + "feed",
//     failureRedirect: "/login/failed",
//   }),
// );

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  signInWithGoogle
);
module.exports = authRouter;
