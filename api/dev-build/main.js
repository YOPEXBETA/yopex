/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./config/adminUser.js":
      /*!*****************************!*\
  !*** ./config/adminUser.js ***!
  \*****************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");\nconst UserSchema = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nmodule.exports = function createAdminUser() {\n  UserSchema.findOne({\n    email: "admin@admin.com",\n    role: "admin"\n  }).then(adminUser => {\n    if (!adminUser) {\n      const password = "52525875"; // Replace with actual password\n      bcrypt.hash(password, 10, function (err, hash) {\n        if (err) {\n          console.error(err);\n        } else {\n          const newAdminUser = new UserSchema({\n            firstname: "admin",\n            lastname: "admin",\n            email: "admin@admin.com",\n            password: hash,\n            role: "admin",\n            country: "tunisia"\n          });\n          newAdminUser.save().then(savedUser => {\n            console.log("Admin user created:", savedUser);\n          }).catch(err => {\n            console.error(err);\n          });\n        }\n      });\n    }\n  }).catch(err => {\n    console.error(err);\n  });\n};\n\n//# sourceURL=webpack://api/./config/adminUser.js?'
        );

        /***/
      },

    /***/ "./config/connectDB.js":
      /*!*****************************!*\
  !*** ./config/connectDB.js ***!
  \*****************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst connectDB = async () => {\n  try {\n    await mongoose.connect(process.env.MONGO_URI);\n    console.log("connected to mongoDb");\n  } catch (error) {\n    console.log(error);\n  }\n};\nmodule.exports = connectDB;\n\n//# sourceURL=webpack://api/./config/connectDB.js?'
        );

        /***/
      },

    /***/ "./config/passport.js":
      /*!****************************!*\
  !*** ./config/passport.js ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval(
          'const GoogleStrategy = (__webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20").Strategy);\nconst passport = __webpack_require__(/*! passport */ "passport");\nconst userSchema = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst companySchema = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst badgeSchema = __webpack_require__(/*! ../models/BadgeType.model */ "./models/BadgeType.model.js");\n(__webpack_require__(/*! dotenv */ "dotenv").config)();\npassport.use(new GoogleStrategy({\n  clientID: process.env.GOOGLE_CLIENT_ID,\n  clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n  callbackURL: "http://localhost:8000/auth/google/callback"\n}, async (accessToken, refreshToken, profile, cb) => {\n  // Check if the user already exists in the userSchema collection\n  const userExist = await userSchema.findOne({\n    email: profile?._json?.email\n  });\n  if (userExist) {\n    // LoggedIn user here\n    googleAuthSignIn(userExist, accessToken, refreshToken, profile, cb);\n  } else {\n    //register user here\n    googleAuthSignup(accessToken, refreshToken, profile, cb);\n  }\n}));\nconst googleAuthSignup = async (accessToken, refreshToken, profile, cb) => {\n  // Create a new user with the hashed password\n  const newUser = new userSchema({\n    firstname: profile.name.givenName,\n    lastname: profile.name.familyName,\n    email: profile?._json?.email,\n    picturePath: profile?._json?.picture\n  });\n  // Check if the user is a first-time user and add the "Account Creation" badge\n  const badge = await badgeSchema.findOne({\n    badgeName: "Account Creation"\n  });\n  if (badge && !newUser.badgesEarned.includes(badge._id)) {\n    newUser.badgesEarned.push(badge._id);\n  }\n  // Save the new user to the userSchema collection\n  const user = await newUser.save();\n\n  // Create a new badge for the user\n  // const newBadge = new badgeSchema({\n  //   userId: req.userId,\n  //   badgeName: req.body.badgeName,\n  //   badgeDescription: req.body.badgeDescription,\n  //   badgeImg: req.body.badgeImg,\n  //   Etat: true,\n  // });\n  // await newBadge.save();\n\n  return cb(null, user);\n};\nconst googleAuthSignIn = async (user, accessToken, refreshToken, profile, cb) => {\n  //check user status\n  if (user.isActive) {\n    return cb(null, user);\n  } else {\n    return cb(null, {\n      error: "Your account is banned"\n    });\n  }\n};\npassport.serializeUser((user, done) => {\n  done(null, user);\n});\npassport.deserializeUser((user, done) => {\n  done(null, user);\n});\n\n//# sourceURL=webpack://api/./config/passport.js?'
        );

        /***/
      },

    /***/ "./config/swagger.js":
      /*!***************************!*\
  !*** ./config/swagger.js ***!
  \***************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const swaggerJsdoc = __webpack_require__(/*! swagger-jsdoc */ "swagger-jsdoc");\nconst path = __webpack_require__(/*! path */ "path");\nconst options = {\n  definition: {\n    openapi: "3.0.0",\n    info: {\n      title: "REST API Docs for SkillRise project",\n      version: "1.0.0",\n      description: "express library API for the skillrise project"\n    },\n    servers: [{\n      url: "http://localhost:3000"\n    }]\n    //find the api in the route folder\n  },\n\n  apis: [path.join(__dirname, "../routes/*.js")]\n};\nconst specs = swaggerJsdoc(options);\nmodule.exports = specs;\n\n//# sourceURL=webpack://api/./config/swagger.js?'
        );

        /***/
      },

    /***/ "./controllers/BadgeType.controllers.js":
      /*!**********************************************!*\
  !*** ./controllers/BadgeType.controllers.js ***!
  \**********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const BadgeType = __webpack_require__(/*! ../models/BadgeType.model */ "./models/BadgeType.model.js");\nconst addBadgeType = async (req, res, next) => {\n  try {\n    const {\n      badgeName,\n      badgeDescription,\n      badgeImg\n    } = req.body;\n    const newBType = new BadgeType({\n      badgeName,\n      badgeDescription,\n      badgeImg\n    });\n    await newBType.save();\n    res.status(201).json({\n      btype: newBType\n    });\n  } catch (error) {\n    res.status(500).json({\n      message: error.message\n    });\n  }\n};\nconst getBadgeType = async (req, res, next) => {\n  try {\n    const btype = await BadgeType.find();\n    if (!btype || btype.length === 0) {\n      throw new Error("btype not found!");\n    }\n    res.status(200).json(btype);\n  } catch (error) {\n    res.status(500).json({\n      message: error.message\n    });\n  }\n};\nconst deleteBadgeType = async (req, res, next) => {\n  try {\n    const {\n      id\n    } = req.params;\n    const btype = await BadgeType.findById(id);\n    if (!btype) {\n      throw new Error("btype not found!");\n    }\n    await BadgeType.findByIdAndDelete(id);\n    res.status(200).json({\n      message: "btype deleted successfully!"\n    });\n  } catch (error) {\n    res.status(500).json({\n      message: error.message\n    });\n  }\n};\nmodule.exports = {\n  addBadgeType,\n  getBadgeType,\n  deleteBadgeType\n};\n\n//# sourceURL=webpack://api/./controllers/BadgeType.controllers.js?'
        );

        /***/
      },

    /***/ "./controllers/Category.controllers.js":
      /*!*********************************************!*\
  !*** ./controllers/Category.controllers.js ***!
  \*********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const Category = __webpack_require__(/*! ../models/Category.model */ "./models/Category.model.js");\nconst SocialMediaPost = __webpack_require__(/*! ../models/SocialMediaPost.model */ "./models/SocialMediaPost.model.js");\nconst categoryController = {\n  getCategories: async (req, res) => {\n    try {\n      const categories = await Category.find();\n      res.json(categories);\n    } catch (err) {\n      return res.status(500).json({\n        msg: err.message\n      });\n    }\n  },\n  createCategory: async (req, res) => {\n    try {\n      const {\n        name\n      } = req.body;\n      const category = await Category.findOne({\n        name\n      });\n      if (category) return res.status(400).json({\n        msg: "This category already exists."\n      });\n      const newCategory = new Category({\n        name\n      });\n      await newCategory.save();\n      res.json({\n        newCategory\n      });\n    } catch (err) {\n      return res.status(500).json({\n        msg: err.message\n      });\n    }\n  },\n  deleteCategory: async (req, res) => {\n    try {\n      const posts = await SocialMediaPost.findOne({\n        category: req.params.id\n      });\n      if (posts) return res.status(400).json({\n        msg: "Please delete all products with a relationship."\n      });\n      await Category.findByIdAndDelete(req.params.id);\n      res.json({\n        msg: "Deleted a Category"\n      });\n    } catch (err) {\n      return res.status(500).json({\n        msg: err.message\n      });\n    }\n  },\n  updateCategory: async (req, res) => {\n    try {\n      const {\n        name\n      } = req.body;\n      await Category.findOneAndUpdate({\n        _id: req.params.id\n      }, {\n        name\n      });\n      res.json({\n        msg: "Updated a category"\n      });\n    } catch (err) {\n      return res.status(500).json({\n        msg: err.message\n      });\n    }\n  }\n};\nmodule.exports = categoryController;\n\n//# sourceURL=webpack://api/./controllers/Category.controllers.js?'
        );

        /***/
      },

    /***/ "./controllers/Challenge.controller.js":
      /*!*********************************************!*\
  !*** ./controllers/Challenge.controller.js ***!
  \*********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const ChallengeModel = __webpack_require__(/*! ../models/Challenge.model */ "./models/Challenge.model.js");\nconst CompanyModel = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst UserModel = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst CreateChallenge = async (req, res, next) => {\n  try {\n    const {\n      title,\n      description,\n      category,\n      price,\n      companyId,\n      deadline\n    } = req.body;\n    const userId = req.userId;\n    console.log("userId:", userId);\n    const user = await UserModel.findById(userId);\n    console.log("user:", user);\n    const company = await CompanyModel.findOne({\n      user: user._id,\n      _id: companyId\n    });\n    console.log("company:", company);\n    if (!company) {\n      return res.status(400).json({\n        error: "Company not found"\n      });\n    }\n    const challenge = new ChallengeModel({\n      company: company._id,\n      title,\n      description,\n      category,\n      deadline,\n      price\n    });\n    await challenge.save();\n    company.challenges.push(challenge._id);\n    await company.save();\n    res.status(201).json({\n      message: "Challenge created successfully",\n      challenge\n    });\n  } catch (error) {\n    res.status(500).json({\n      error: `Failed to create challenge: ${error.message}`\n    });\n  }\n};\nconst getChallengeById = async (req, res) => {\n  const challengeId = req.params.challengeId; // Assuming you\'re passing the challenge ID as a URL parameter\n\n  try {\n    const challenge = await ChallengeModel.findById(challengeId).populate("company");\n    if (!challenge) {\n      return res.status(404).json({\n        message: "Challenge not found"\n      });\n    }\n    res.status(200).json(challenge);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\n\n// ...\n\nconst deleteChallenge = async (req, res) => {\n  try {\n    console.log(req.params.id);\n    const challenge = await ChallengeModel.findByIdAndDelete(req.params.id);\n    const message = "challenge has been deleted";\n    res.status(200).send({\n      challenge,\n      message\n    });\n  } catch (err) {\n    res.status(500).json(err);\n  }\n};\nconst getCompanyChallenges = async (req, res) => {\n  try {\n    const companyId = req.params.companyId;\n    const company = await CompanyModel.findOne({\n      _id: companyId\n    });\n    if (!company) {\n      return res.status(400).json({\n        error: "Company not found"\n      });\n    }\n    const challenges = await ChallengeModel.find({\n      company: companyId\n    }).populate("company");\n    res.status(200).json(challenges);\n  } catch (error) {\n    res.status(500).json({\n      error: `Failed to retrieve challenges: ${error.message}`\n    });\n  }\n};\nconst getAllChallenges = async (req, res) => {\n  const q = req.query;\n  const filters = {\n    ...(q.userId && {\n      userId: q.userId\n    }),\n    ...(q.category && {\n      category: q.category\n    }),\n    ...((q.min || q.max) && {\n      price: {\n        ...(q.min && {\n          $gte: q.min\n        }),\n        ...(q.max && {\n          $lte: q.max\n        })\n      }\n    }),\n    ...(q.search && {\n      title: {\n        $regex: q.search,\n        $options: "i"\n      }\n    })\n  };\n  try {\n    const ChallengePosts = await ChallengeModel.find(filters).populate("company");\n    res.status(200).json(ChallengePosts);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\nconst getChallengeUsers = async (req, res) => {\n  try {\n    const idChallenge = req.query.idChallenge; // Get idChallenge from the query parameter\n    const ChallengePost = await ChallengeModel.findById(idChallenge).populate({\n      path: "users",\n      select: "-password"\n    });\n    const ChallengeUsers = ChallengePost.users;\n    res.status(200).json(ChallengeUsers);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\nconst getChallengeUserSubmit = async (req, res) => {\n  try {\n    const challengeId = req.query.challengeId; // Get idChallenge from the query parameter\n    const userId = req.query.userId; // Get idUser from the query parameter\n    const Challenge = await ChallengeModel.findById(challengeId).populate({\n      path: "submissions"\n    });\n    const ChallengeUserSubmit = Challenge.submissions.filter(submission => submission.userId == userId);\n    res.status(200).json(ChallengeUserSubmit);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\nmodule.exports = {\n  CreateChallenge,\n  deleteChallenge,\n  getChallengeById,\n  getCompanyChallenges,\n  getAllChallenges,\n  getChallengeUsers,\n  getChallengeUserSubmit\n};\n\n//# sourceURL=webpack://api/./controllers/Challenge.controller.js?'
        );

        /***/
      },

    /***/ "./controllers/Comment.controllers.js":
      /*!********************************************!*\
  !*** ./controllers/Comment.controllers.js ***!
  \********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const Comment = __webpack_require__(/*! ../models/Comment.model */ "./models/Comment.model.js");\nconst SocialPost = __webpack_require__(/*! ../models/SocialMediaPost.model */ "./models/SocialMediaPost.model.js");\nconst addComment = async (req, res, next) => {\n  try {\n    const newComment = new Comment({\n      ...req.body,\n      userId: req.userId\n    });\n    const savedComment = await newComment.save();\n    const postId = req.body.postId;\n    const post = await SocialPost.findById(postId);\n    post.comments.push(savedComment._id);\n    post.commentCount += 1; // increment comment count\n    await post.save();\n    res.status(200).send(savedComment);\n  } catch (err) {\n    next(err);\n  }\n};\nconst deleteComment = async (req, res, next) => {\n  try {\n    const comment = await Comment.findById(res.params.id);\n    const post = await SocialPost.findById(res.params.id);\n    if (req.userId === comment.userId || req.userId === post.userId) {\n      await Comment.findByIdAndDelete(req.params.id);\n      res.status(200).json("The comment has been deleted.");\n    } else {\n      return next(createError(403, "You can delete ony your comment!"));\n    }\n  } catch (err) {\n    next(err);\n  }\n};\nconst getComments = async (req, res, next) => {\n  try {\n    const comments = await Comment.find({\n      postId: req.params.postId\n    }).populate({\n      path: "userId",\n      model: "User"\n    });\n    res.status(200).json(comments);\n  } catch (err) {\n    next(err);\n  }\n};\nmodule.exports = {\n  addComment,\n  getComments,\n  deleteComment\n};\n\n//# sourceURL=webpack://api/./controllers/Comment.controllers.js?'
        );

        /***/
      },

    /***/ "./controllers/Company.controllers.js":
      /*!********************************************!*\
  !*** ./controllers/Company.controllers.js ***!
  \********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const userSchema = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst companySchema = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");\nconst {\n  pick\n} = __webpack_require__(/*! lodash */ "lodash");\nconst ChallengeModel = __webpack_require__(/*! ../models/Challenge.model */ "./models/Challenge.model.js");\nconst Company = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst userModel = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");\nconst {\n  sendEmail\n} = __webpack_require__(/*! ../middlewares/mail.middleware */ "./middlewares/mail.middleware.js");\nconst {\n  updateUserChallengesBadges\n} = __webpack_require__(/*! ../utils/utilities */ "./utils/utilities.js");\nconst editProfile = async (req, res) => {\n  try {\n    console.log("editProfile");\n    const updateFields = pick(req.body, ["companyName", "email", "password", "picturePath", "country", "dateoffoundation", "phoneNumber"]);\n    if (updateFields.password) {\n      const salt = await bcrypt.genSalt(10);\n      const hashedPass = await bcrypt.hash(updateFields.password, salt);\n      updateFields.password = hashedPass;\n    }\n    const updatedCompany = await companySchema.findByIdAndUpdate(req.params.id, updateFields, {\n      new: true\n    }).select("-password");\n    res.status(200).json(updatedCompany);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n\n/*const getCompany = async (req, res) => {\n  try {\n    const { id } = req.params;\n    const company = await companySchema.findById(id).populate("challenges");\n    res.status(200).json(company);\n  } catch (err) {\n    res.status(404).json({ message: err.message });\n  }\n};*/\n\nconst getCompany = async (req, res) => {\n  try {\n    const {\n      companyId\n    } = req.params;\n    const company = await companySchema.findById(companyId);\n    if (!company) {\n      return res.status(404).json({\n        message: "Company not found"\n      });\n    }\n    res.status(200).json(company);\n  } catch (err) {\n    res.status(500).json({\n      message: "Internal server error"\n    });\n  }\n};\nconst getCompanyChallenges = async (req, res) => {\n  try {\n    const idCompany = req.query.idCompany; // Get idChallenge from the query parameter\n    const Company = await CompanyModel.findById(idCompany).populate({\n      path: "challenges",\n      select: "-password"\n    });\n    res.status(200).json(Company);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\nconst ChallengeWinner = async (req, res) => {\n  try {\n    const idCompany = req.body.idCompany; // Get idChallenge from the query parameter\n    const idChallenge = req.body.idChallenge; // Get idChallenge from the query parameter\n    const idUser = req.body.idUser; // Get idUser from the query parameter\n    const Challenge = await ChallengeModel.findById(idChallenge);\n    const company = await Company.findById(idCompany).select("-password");\n    const User = await userModel.findById(idUser);\n    console.log(Challenge);\n\n    // get Admin account\n    const AdminUser = await userModel.findOne({\n      role: "admin"\n    });\n    User.balance = User.balance + Challenge.price * 0.9;\n    AdminUser.balance = AdminUser.balance + Challenge.price * 0.1;\n    company.balance = company.balance - Challenge.price;\n    Challenge.winner = User._id;\n    User.challengesWon = (User.challengesWon ? User.challengesWon : 0) + 1;\n    updateUserChallengesBadges(User);\n    console.log("passed the badges challenges");\n    User.score += 100;\n    User.notifications.push({\n      message: `You won the challenge ${Challenge.title}`\n    });\n    sendEmail(User.email, `You won the challenge ${Challenge.title}`);\n    newChallenge = await Challenge.save();\n    User.save();\n    AdminUser.save();\n    newCompany = await company.save();\n    console.log(newCompany);\n    res.status(200).json({\n      newCompany,\n      newChallenge\n    });\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\nconst getCompanyNotifications = async (req, res) => {\n  try {\n    const company = await companySchema.findById(req.params.companyId).populate({\n      path: "notificationsCompany",\n      populate: {\n        path: "user",\n        select: "firstname lastname picturePath"\n      }\n    });\n    if (!company) throw new Error("Company not found");\n    res.json(company.notificationsCompany);\n  } catch (error) {\n    console.error(error.message);\n    res.status(500).json({\n      error: "Server Error"\n    });\n  }\n};\nmodule.exports = {\n  editProfile,\n  getCompany,\n  getCompanyChallenges,\n  ChallengeWinner,\n  getCompanyNotifications\n};\n\n//# sourceURL=webpack://api/./controllers/Company.controllers.js?'
        );

        /***/
      },

    /***/ "./controllers/Floucipayment.controller.js":
      /*!*************************************************!*\
  !*** ./controllers/Floucipayment.controller.js ***!
  \*************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const axios = __webpack_require__(/*! axios */ "axios");\nconst Payment = async (req, res) => {\n  const url = "https://developers.flouci.com/api/generate_payment";\n  const payload = {\n    app_token: "53598d91-0e66-4a64-b320-9b3e57a40719",\n    app_secret: process.env.FLOUCI_SECRET,\n    amount: req.body.amount,\n    accept_card: "true",\n    session_timeout_secs: 1200,\n    success_link: "http://localhost:3000/success",\n    fail_link: "http://localhost:3000/fail",\n    developer_tracking_id: "b3db2b71-3d31-4135-922b-cd7d76979066"\n  };\n  try {\n    const result = await axios.post(url, payload);\n    res.send(result.data);\n  } catch (err) {\n    console.log(err);\n    res.status(500).send("An error occurred");\n  }\n};\nconst Verify = async (req, res) => {\n  const id_payment = req.params.id;\n  try {\n    const result = await axios.get(`https://developers.flouci.com/api/verify_payment/${id_payment}`, {\n      headers: {\n        "Content-Type": "application/json",\n        apppublic: "b9a38d39-a2e6-4928-81bf-8c27eebb9c1e",\n        appsecret: process.env.FLOUCI_SECRET\n      }\n    });\n    res.json(result.data);\n  } catch (err) {\n    console.log(err);\n    res.status(500).send("An error occurred");\n  }\n};\nmodule.exports = {\n  Payment,\n  Verify\n};\n\n//# sourceURL=webpack://api/./controllers/Floucipayment.controller.js?'
        );

        /***/
      },

    /***/ "./controllers/SocialMediaPost.controllers.js":
      /*!****************************************************!*\
  !*** ./controllers/SocialMediaPost.controllers.js ***!
  \****************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const Post = __webpack_require__(/*! ../models/SocialMediaPost.model */ "./models/SocialMediaPost.model.js");\nconst UserModel = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst CompanyModel = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\n\n//create a post\n\nconst CreatePost = async (req, res) => {\n  try {\n    // Find the current user by ID\n    const user = await UserModel.findById(req.userId);\n    const company = await CompanyModel.findById(req.userId);\n\n    // Determine whether the current user is a UserModel or CompanyModel\n    let owner;\n    let isUser = true;\n    let Model;\n    if (user) {\n      owner = user;\n      Model = UserModel;\n    } else if (company) {\n      owner = company;\n      isUser = false;\n      Model = CompanyModel;\n    } else {\n      throw new Error("User not found");\n    }\n\n    // Create a new post with the current user\'s information\n    const newPost = new Post({\n      userId: req.userId,\n      firstname: isUser ? owner.firstname : undefined,\n      lastname: isUser ? owner.lastname : undefined,\n      companyName: !isUser ? owner.companyName : undefined,\n      userPicturePath: owner.picturePath || owner.picturePath,\n      description: req.body.description,\n      postPicturePath: req.body.postPicturePath,\n      postVideoePath: req.body.postVideoPath,\n      categories: req.body.categories\n    });\n    savedpost = await newPost.save();\n    const data = await Model.findOneAndUpdate({\n      _id: req.userId\n    }, {\n      $push: {\n        posts: savedpost._id\n      }\n    }, {\n      new: true\n    }).populate("posts");\n    res.status(201).json(data);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\n\n//update a post\n\nconst updateAPost = async (req, res) => {\n  try {\n    const postId = req.params.id;\n    const updates = req.body;\n    const post = await Post.findOneAndUpdate({\n      _id: postId\n    }, updates, {\n      new: true\n    });\n    if (!post) {\n      return res.status(404).json({\n        message: "Post not found"\n      });\n    }\n    return res.status(200).json({\n      message: "Post updated successfully",\n      post\n    });\n  } catch (err) {\n    res.status(500).json({\n      error: err.message\n    });\n  }\n};\n\n//getFeedPosts\nconst getFeedPosts = async (req, res) => {\n  const q = req.query;\n  const filters = {\n    ...(q.categories && {\n      "categories.name": q.categories\n    })\n  };\n  try {\n    const posts = await Post.find(filters).populate({\n      path: "userId",\n      model: "User"\n    }).sort({\n      createdAt: "desc"\n    });\n    res.status(200).json(posts);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\n\n//delete a post\nconst deletePost = async (req, res) => {\n  try {\n    const post = await Post.findById(req.params.id);\n    if (post.userId.toString() === req.userId) {\n      response = await Post.findByIdAndDelete(req.params.id);\n      res.status(200).send("Post has been deleted");\n    } else {\n      res.status(403).send("You are not authorized to delete this post");\n    }\n  } catch (err) {\n    res.status(500).json(err);\n  }\n};\n\n//getUserPosts\nconst getUserPosts = async (req, res) => {\n  try {\n    const userId = req.params.userId;\n\n    // Find the owner of the posts by ID\n    let owner;\n    let isUser = true;\n    if (userId) {\n      owner = await UserModel.findById(userId);\n    } else {\n      owner = await CompanyModel.findById(userId);\n      isUser = false;\n    }\n    let posts;\n    if (isUser) {\n      const sharedPostIds = owner.posts;\n      posts = await Post.find({\n        $or: [{\n          userId: userId\n        }, {\n          companyId: userId\n        }, {\n          _id: {\n            $in: sharedPostIds\n          }\n        }]\n      }).populate({\n        path: "userId",\n        model: "User"\n      });\n    } else {\n      posts = await Post.find({\n        companyId: userId\n      }).populate({\n        path: "companyId",\n        model: "User"\n      });\n    }\n    res.status(200).json(posts);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\n\n//like/dislike post\nconst likePost = async (req, res) => {\n  try {\n    const {\n      id\n    } = req.params; //the id of the post\n    const {\n      userId\n    } = req.body; //the user Id\n    const post = await Post.findById(id);\n    const isLiked = post.likes.get(userId);\n    let likesCount = post.likesCount;\n    if (isLiked) {\n      post.likes.delete(userId);\n      if (likesCount > 0) {\n        likesCount -= 1;\n      }\n    } else {\n      post.likes.set(userId, true);\n      likesCount += 1;\n    }\n    const updatedPost = await Post.findByIdAndUpdate(id, {\n      likes: post.likes,\n      likesCount\n    }, {\n      new: true\n    });\n    res.status(200).json(updatedPost);\n  } catch (err) {\n    res.status(404).json({\n      message: err.message\n    });\n  }\n};\nconst sharePost = async (req, res) => {\n  try {\n    const {\n      postId,\n      userId\n    } = req.body;\n\n    // Find the post to share\n    const post = await Post.findById(postId);\n\n    // Check if the post exists\n    if (!post) {\n      return res.status(404).json({\n        message: "Post not found"\n      });\n    }\n\n    // Check if the user already shared the post\n    const user = await UserModel.findById(userId);\n    if (user.posts.includes(postId)) {\n      return res.status(400).json({\n        message: "Post already shared"\n      });\n    }\n\n    // Add the post to the user\'s shared posts\n    user.posts.push(postId);\n    await user.save();\n\n    // Increment the share count of the post\n    post.shareCount += 1;\n    await post.save();\n    return res.status(200).json({\n      message: "Post shared successfully"\n    });\n  } catch (error) {\n    console.error(error);\n    return res.status(500).json({\n      message: "Internal server error"\n    });\n  }\n};\nmodule.exports = {\n  CreatePost,\n  updateAPost,\n  getFeedPosts,\n  deletePost,\n  getUserPosts,\n  likePost,\n  sharePost\n};\n\n//# sourceURL=webpack://api/./controllers/SocialMediaPost.controllers.js?'
        );

        /***/
      },

    /***/ "./controllers/admin.controllers.js":
      /*!******************************************!*\
  !*** ./controllers/admin.controllers.js ***!
  \******************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const User = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");\nconst Company = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst companySchema = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst getUsers = async (req, res) => {\n  try {\n    const users = await User.find({\n      role: "user"\n    }).select("-password");\n    res.json(users);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\nconst getCompanies = async (req, res) => {\n  try {\n    const companies = await Company.find().select("-password");\n    res.json(companies);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\nconst addUser = async (req, res) => {\n  try {\n    const salt = await bcrypt.genSalt(10);\n    console.log(typeof req.body.password, req.body.password);\n    const hashedPass = await bcrypt.hash(req.body.password, salt);\n    const newUser = new User({\n      firstname: req.body.firstname,\n      lastname: req.body.lastname,\n      email: req.body.email,\n      password: hashedPass,\n      role: req.body.role\n    });\n\n    //see if user exist or not\n    const userExist = await User.findOne({\n      email: req.body.email\n    });\n    if (userExist) {\n      return res.status(400).send({\n        msg: "User already exists"\n      });\n    }\n    //create the user if not existed in the database\n    const user = await newUser.save();\n    return res.status(200).json({\n      msg: "user successfully created",\n      user\n    });\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\nconst updUser = async (req, res) => {\n  try {} catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\nconst delUser = async (req, res) => {\n  try {\n    const user = await User.findByIdAndDelete(req.params.id);\n    res.send(user);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n\n// ==============================|| disableUser ||============================== //\n\nconst disableUser = async (req, res) => {\n  const {\n    id,\n    action\n  } = req.params;\n  try {\n    let status;\n    if (action === "active") {\n      status = "active";\n    } else if (action === "disabled") {\n      status = "disabled";\n    } else {\n      return res.status(400).json({\n        message: "Invalid action"\n      });\n    }\n    const updatedUser = await userSchema.findByIdAndUpdate(id, {\n      status\n    }, {\n      new: true\n    });\n    res.status(200).json(updatedUser);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n// if user role is admin he can ban or unban an account\nconst BanAccount = async (req, res) => {\n  try {\n    const user = await userSchema.findById(req.params.id);\n    if (!user) {\n      return res.status(404).json({\n        error: "User not found"\n      });\n    }\n    user.isBanned = !user.isBanned; // toggle the user\'s banned status\n    await user.save();\n    res.json({\n      msg: "User successfully Banned",\n      user\n    });\n  } catch (err) {\n    console.error(err);\n    res.status(500).json({\n      error: "Server error"\n    });\n  }\n};\nconst approveCompany = async (req, res) => {\n  try {\n    console.log("zzz  ", req.body.companyId);\n    const updatedCompany = await companySchema.findByIdAndUpdate(req.body.companyId, {\n      verified: true\n    }, {\n      new: true\n    });\n    res.status(200).json(updatedCompany);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\nmodule.exports = {\n  getUsers,\n  addUser,\n  updUser,\n  delUser,\n  disableUser,\n  BanAccount,\n  approveCompany,\n  getCompanies\n};\n\n//# sourceURL=webpack://api/./controllers/admin.controllers.js?'
        );

        /***/
      },

    /***/ "./controllers/auth.user.controller.js":
      /*!*********************************************!*\
  !*** ./controllers/auth.user.controller.js ***!
  \*********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const userSchema = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst companySchema = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst badgeSchema = __webpack_require__(/*! ../models/BadgeType.model */ "./models/BadgeType.model.js");\nconst bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");\nconst nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");\nconst moment = __webpack_require__(/*! moment */ "moment");\n\n// ==============================|| Register ||============================== //\n\nconst signUp = async (req, res) => {\n  try {\n    // Generate a salt for password hashing\n    const salt = await bcrypt.genSalt(10);\n\n    // Log the request body and password for debugging purposes\n    // console.log(req.body);\n    // console.log(typeof req.body.password, req.body.password);\n\n    // Hash the password using the generated salt\n    const hashedPass = await bcrypt.hash(req.body.password, salt);\n\n    // Log the hashed password for debugging purposes\n    // console.log(typeof hashedPass, hashedPass);\n\n    // Check if the user already exists in the userSchema collection\n    const userExist = await userSchema.findOne({\n      email: req.body.email\n    });\n    if (userExist) {\n      return res.status(400).send({\n        error: {\n          msg: "User already exists"\n        }\n      });\n    }\n\n    // Check if the user already exists in the companySchema collection\n    const companyExist = await companySchema.findOne({\n      email: req.body.email\n    });\n    if (companyExist) {\n      return res.status(400).send({\n        error: {\n          msg: "User already exists"\n        }\n      });\n    }\n\n    // If the role is "user"\n    if (req.body.role === "user") {\n      // Create a new user with the hashed password\n      const newUser = new userSchema({\n        ...req.body,\n        password: hashedPass\n      });\n\n      // Check if the user is a first-time user and add the "Account Creation" badge\n      const badge = await badgeSchema.findOne({\n        badgeName: "Account Creation"\n      });\n      if (badge && !newUser.badgesEarned.includes(badge._id)) {\n        newUser.badgesEarned.push(badge._id);\n      }\n\n      // Save the new user to the userSchema collection\n      const user = await newUser.save();\n\n      // Create a new badge for the user\n      const newBadge = new badgeSchema({\n        userId: req.userId,\n        badgeName: req.body.badgeName,\n        badgeDescription: req.body.badgeDescription,\n        badgeImg: req.body.badgeImg,\n        Etat: true\n      });\n      await newBadge.save();\n\n      // Return a success response with the new user data\n      return res.status(200).json({\n        msg: "user successfully created",\n        user\n      });\n    }\n    // If the role is "company"\n    else if (req.body.role === "company") {\n      // Create a new company with the hashed password\n\n      if (!req.body.firstname || !req.body.lastname) {\n        return res.status(400).send({\n          error: {\n            msg: "First name and last name are required for company sign up"\n          }\n        });\n      }\n      const newCompany = new companySchema({\n        ...req.body,\n        password: hashedPass\n      });\n\n      // Save the new company to the companySchema collection\n      // const company = await newCompany.save();\n\n      // Check if the company is a first-time user and add the "Account Creation" badge\n      const badge = await badgeSchema.findOne({\n        badgeName: "Account Creation"\n      });\n      if (badge && !newCompany.badgesEarned.includes(badge._id)) {\n        newCompany.badgesEarned.push(badge._id);\n      }\n      await newCompany.save();\n      // Return a success response with the new company data\n      return res.status(200).json({\n        msg: "Company successfully created",\n        newCompany\n      });\n    }\n  } catch (error) {\n    // Log any errors that occur and return an error response with the error data\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n\n// ==============================|| Login ||============================== //\n\nconst signIn = async (req, res) => {\n  try {\n    //check if the email exist\n    const user = await userSchema.findOne({\n      email: req.body.email\n    });\n    const company = await companySchema.findOne({\n      email: req.body.email\n    });\n    if (!user && !company) return res.status(400).json({\n      error: "Email does not exist!"\n    });\n\n    //check user status\n    if (user.isActive) {\n      //check if the password is valid\n      if (user) {\n        const validated = await bcrypt.compareSync(req.body.password, user.password);\n        if (!validated) return res.status(400).json({\n          error: "Wrong password or email."\n        });\n      } else if (company) {\n        const validated = await bcrypt.compareSync(req.body.password, company.password);\n        if (!validated) return res.status(400).json({\n          error: "Wrong password or email."\n        });\n      }\n      const {\n        password,\n        ...info\n      } = user ? user._doc : company._doc;\n\n      //if the both are valid then\n      const token = jwt.sign({\n        id: user ? user._id : company._id,\n        role: user ? user.role : company.role,\n        email: user ? user.email : company.email\n      }, process.env.passwordToken);\n      if (company && !company.verified) {\n        return res.status(400).json({\n          error: "Company not verified!"\n        });\n      }\n      // set default cookies options\n      let cookiesOptions = {\n        expires: moment().add("24", "hours").toDate()\n      };\n      if (req.body.rememberMe) {\n        cookiesOptions.expires = moment().add("15", "days").toDate();\n      }\n      res.cookie("accessToken", token, cookiesOptions).status(200).send(info);\n    } else {\n      return res.status(403).json({\n        error: "Your account is banned"\n      });\n    }\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n// ==============================|| Logout ||============================== //\nconst logout = async (req, res) => {\n  try {\n    // Get the token from the request headers\n    const blacklistedToken = req.header("Authorization").split(" ")[1];\n    // Decode the token to get the user ID\n    const decodedToken = jwt.verify(blacklistedToken, process.env.passwordToken);\n    console.log(decodedToken);\n    //get only the user id\n    const userId = decodedToken.id;\n    console.log(userId);\n    // Fetch the user from the database\n    const user = await userSchema.findById(userId);\n    console.log(user);\n    return res.status(200).send({\n      msg: "Logout successfully",\n      blacklistedToken,\n      user\n    });\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n// ==============================|| forgetpassword ||============================== //\nconst forgetpassword = async (req, res) => {\n  try {\n    const email = req.body.email;\n    const user = await userSchema.findOne({\n      email: email\n    });\n    if (!user) {\n      return res.status(404).json({\n        error: "User not found"\n      });\n    }\n    const resetToken = jwt.sign({\n      userId: user._id\n    }, process.env.passwordToken, {\n      expiresIn: "1h"\n    });\n    user.resetToken = resetToken;\n    await user.save();\n\n    // Send email with password reset link\n    const transporter = nodemailer.createTransport({\n      service: "gmail",\n      auth: {\n        user: process.env.EMAIL_ADDRESS,\n        pass: process.env.EMAIL_PASSWORD\n      }\n    });\n    const mailOptions = {\n      from: process.env.EMAIL_ADDRESS,\n      to: email,\n      subject: "Password Reset",\n      html: `<p>Please click the following link to reset your password:</p><a href="http://localhost:3000/reset-password/${resetToken}">http://localhost:3000/reset-password/${resetToken}</a>`\n    };\n    transporter.sendMail(mailOptions, function (error, info) {\n      if (error) {\n        console.log(error);\n        return res.status(500).json({\n          error: "Error sending email"\n        });\n      } else {\n        console.log("Email sent: " + info.response);\n        return res.status(200).json({\n          message: "Password reset email sent"\n        });\n      }\n    });\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n\n// ==============================|| reset password ||============================== //\nconst resetpassword = async (req, res) => {\n  try {\n    const resetToken = req.body.resetToken;\n    const Password = req.body.password;\n    const user = await userSchema.findOne({\n      resetToken: resetToken\n    });\n    if (!user) {\n      return res.status(404).json({\n        error: "Invalid reset token"\n      });\n    }\n    const decoded = jwt.verify(resetToken, process.env.passwordToken);\n    if (decoded.userId !== user._id.toString()) {\n      return res.status(404).json({\n        error: "Invalid reset token"\n      });\n    }\n    user.password = await bcrypt.hash(Password, 10);\n    user.resetToken = undefined;\n    await user.save();\n    return res.status(200).json({\n      message: "Password reset successfully"\n    });\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n// ==============================|| signInWithGoogle ||============================== //\n\nmodule.exports = {\n  signUp,\n  signIn,\n  logout,\n  forgetpassword,\n  resetpassword\n};\n\n//# sourceURL=webpack://api/./controllers/auth.user.controller.js?'
        );

        /***/
      },

    /***/ "./controllers/conversation.controller.js":
      /*!************************************************!*\
  !*** ./controllers/conversation.controller.js ***!
  \************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const ConversationModel = __webpack_require__(/*! ../models/Conversation.model */ "./models/Conversation.model.js");\nconst MessageModel = __webpack_require__(/*! ../models/Message.model */ "./models/Message.model.js");\nconst UserModel = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst createConversation = async (req, res) => {\n  try {\n    const {\n      senderId,\n      receiverId\n    } = req.body;\n    if (senderId === receiverId) {\n      throw new Error("Cannot create conversation with yourself");\n    }\n    const existingConversation = await ConversationModel.findOne({\n      members: {\n        $all: [senderId, receiverId]\n      }\n    });\n    if (existingConversation) {\n      throw new Error("Conversation already exists");\n    }\n    const newCoversation = new ConversationModel({\n      members: [senderId, receiverId]\n    });\n    await newCoversation.save();\n    const userId = req.body.senderId;\n    const conversations = await ConversationModel.find({\n      members: {\n        $in: [userId]\n      }\n    }).select("_id members");\n\n    // Get the user details for each member of the conversation\n    const conversationsWithUsers = await Promise.all(conversations.map(async conversation => {\n      const membersWithDetails = await Promise.all(conversation.members.map(async member => {\n        const user = await UserModel.findById(member);\n        // Only include the other user in the conversation\n        if (user._id.toString() !== userId) {\n          return {\n            id: user._id,\n            firstname: user.firstname,\n            lastname: user.lastname,\n            picturePath: user.picturePath\n          };\n        }\n      }));\n      // Remove any undefined members from the array\n      const filteredMembers = membersWithDetails.filter(Boolean);\n\n      // Get the latest message for the conversation\n      const latestMessage = await MessageModel.findOne({\n        conversationId: conversation._id\n      }).sort({\n        createdAt: -1\n      }).populate("sender", "firstname lastname picturePath").lean();\n\n      // Set the latestMessage property for the member who is not the user\n      filteredMembers.forEach(member => {\n        if (member.id.toString() !== userId && latestMessage) {\n          member.latestMessage = latestMessage.message;\n          member.createdAt = latestMessage.createdAt;\n        }\n      });\n      return {\n        conversationId: conversation._id,\n        members: filteredMembers\n      };\n    }));\n    res.status(200).json(conversationsWithUsers);\n  } catch (error) {\n    console.log(error, "Error");\n    res.status(400).send(error.message);\n  }\n};\nconst getConversations = async (req, res) => {\n  try {\n    const userId = req.params.userId;\n    const conversations = await ConversationModel.find({\n      members: {\n        $in: [userId]\n      }\n    }).select("_id members");\n\n    // Get the user details for each member of the conversation\n    const conversationsWithUsers = await Promise.all(conversations.map(async conversation => {\n      const membersWithDetails = await Promise.all(conversation.members.map(async member => {\n        const user = await UserModel.findById(member);\n        // Only include the other user in the conversation\n        if (user && user._id.toString() !== userId) {\n          return {\n            id: user._id,\n            firstname: user.firstname,\n            lastname: user.lastname,\n            picturePath: user.picturePath\n          };\n        }\n      }));\n      // Remove any undefined members from the array\n      const filteredMembers = membersWithDetails.filter(Boolean);\n\n      // Get the latest message for the conversation\n      const latestMessage = await MessageModel.findOne({\n        conversationId: conversation._id\n      }).sort({\n        createdAt: -1\n      }).populate("sender", "firstname lastname picturePath").lean();\n\n      // Set the latestMessage property for the member who is not the user\n      filteredMembers.forEach(member => {\n        if (member.id.toString() !== userId && latestMessage) {\n          member.latestMessage = latestMessage.message;\n          member.createdAt = latestMessage.createdAt;\n        }\n      });\n      return {\n        conversationId: conversation._id,\n        members: filteredMembers\n      };\n    }));\n    res.status(200).json(conversationsWithUsers);\n  } catch (error) {\n    console.log(error, "Error");\n    res.status(500).json({\n      error: error.message\n    });\n  }\n};\nmodule.exports = {\n  createConversation,\n  getConversations\n};\n\n//# sourceURL=webpack://api/./controllers/conversation.controller.js?'
        );

        /***/
      },

    /***/ "./controllers/job.controller.js":
      /*!***************************************!*\
  !*** ./controllers/job.controller.js ***!
  \***************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst User = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst Job = __webpack_require__(/*! ../models/job.model */ "./models/job.model.js");\nconst Company = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst {\n  sendEmail\n} = __webpack_require__(/*! ../middlewares/mail.middleware */ "./middlewares/mail.middleware.js");\nconst {\n  sortappliers\n} = __webpack_require__(/*! ../tensorflow/anotherz */ "./tensorflow/anotherz.js");\n\n// companyRoutes.js\n\nconst addJob = async (req, res, next) => {\n  try {\n    const {\n      title,\n      description,\n      companyId\n    } = req.body;\n    const userId = req.userId;\n    console.log("userId:", userId);\n    const user = await User.findById(userId);\n    console.log("userId:", user);\n    const company = await Company.findOne({\n      user: user._id,\n      _id: companyId\n    });\n    console.log("company:", company);\n    if (!company) {\n      return res.status(400).json({\n        error: "Company not found"\n      });\n    }\n    const jobOffer = new Job({\n      company: company._id,\n      title,\n      description\n    });\n    await jobOffer.save();\n    company.jobs.push(jobOffer._id);\n    await company.save();\n    res.status(201).json({\n      message: "Job offer created successfully",\n      jobOffer\n    });\n  } catch (error) {\n    res.status(500).json({\n      error: `Failed to create job offer: ${error.message}`\n    });\n  }\n};\nconst getAllJobs = async (req, res, next) => {\n  try {\n    const jobs = await Job.find().populate("company");\n    if (jobs.length === 0) {\n      return res.status(404).json({\n        message: "No Jobs Found"\n      });\n    }\n    return res.status(200).json(jobs);\n  } catch (error) {\n    console.error(error);\n    return res.status(500).json({\n      message: "An error occurred while fetching jobs."\n    });\n  }\n};\nconst updateJob = async (req, res, next) => {\n  const {\n    title,\n    description\n  } = req.body;\n  const jobId = req.params.id;\n  let job;\n  try {\n    job = await Job.findByIdAndUpdate(jobId, {\n      title,\n      description\n    });\n  } catch (err) {\n    return console.log(err);\n  }\n  if (!job) {\n    return res.status(500).json({\n      message: "Unable To Update The Job"\n    });\n  }\n  return res.status(200).json({\n    job\n  });\n};\n//\n\nconst geJobById = async (req, res, next) => {\n  try {\n    const companyId = req.params.companyId;\n\n    // Find the company based on the companyId\n    const company = await Company.findOne({\n      _id: companyId\n    });\n    if (!company) {\n      return res.status(400).json({\n        error: "Company not found"\n      });\n    }\n\n    // Find all job offers related to the company and populate the \'company\' field\n    const jobOffers = await Job.find({\n      company: companyId\n    }).populate("company");\n    res.status(200).json(jobOffers);\n  } catch (error) {\n    res.status(500).json({\n      error: `Failed to retrieve job offers: ${error.message}`\n    });\n  }\n};\nconst deleteJob = async (req, res, next) => {\n  const id = req.params.id;\n  let job;\n  try {\n    job = await Job.findByIdAndRemove(id).populate("company");\n    await job.company.jobs.pull(job);\n    await job.company.save();\n  } catch (err) {\n    console.log(err);\n  }\n  if (!job) {\n    return res.status(500).json({\n      message: "Unable To Delete"\n    });\n  }\n  return res.status(200).json({\n    message: "Successfully Delete"\n  });\n};\n//// get compnay jobs\nconst getByUserId = async (req, res, next) => {\n  const companyId = req.params.id;\n  let companyJobs;\n  try {\n    companyJobs = await Company.findById(companyId).populate("jobs"); //in populte you use the Ref in user.model\n  } catch (err) {\n    return console.log(err);\n  }\n  if (!companyJobs) {\n    return res.status(404).json({\n      message: "No Job Found"\n    });\n  }\n  return res.status(200).json({\n    company: companyJobs\n  });\n};\n////\nconst applyJob = async (req, res) => {\n  try {\n    const job = await Job.findById(req.params.jobId).exec();\n    if (!job) return res.status(400).json("Job not found");\n    const user = await User.findById(req.params.userId).exec();\n    if (!user) return res.status(400).json("User not found");\n\n    // Check if user has already applied\n    if (job.appliers.includes(req.params.userId)) return res.status(400).json("You have already applied for this job");\n\n    // Check if user has already been accepted\n    if (job.acceptedAppliers.includes(req.params.userId)) return res.status(400).json("You have already been accepted for this job");\n    job.appliers.push(req.params.userId);\n    await job.save();\n\n    // add notification to company\n    const company = await Company.findById(job.company).exec();\n    company.notificationsCompany.push({\n      message: `Applied for your job of : ${job.title}`,\n      job: job._id,\n      user: user._id,\n      userFirstname: user.firstname,\n      userLastname: user.lastname,\n      userPicture: user.picturePath,\n      createdAt: new Date()\n    });\n    await company.save();\n    return res.status(200).json("Applied successfully");\n  } catch (err) {\n    return res.status(500).json({\n      error: err.message\n    });\n  }\n};\nconst unapplyJob = async (req, res) => {\n  try {\n    const job = await Job.findById(req.params.jobId).exec();\n    if (!job) return res.status(400).json("Job not found");\n\n    // Check if user has applied\n    const applierIndex = job.appliers.indexOf(req.params.userId);\n    if (applierIndex === -1) return res.status(400).json("You have not applied for this job");\n\n    // Remove user from appliers array\n    job.appliers.splice(applierIndex, 1);\n\n    // Remove user from acceptedAppliers array if they were accepted\n    const acceptedApplierIndex = job.acceptedAppliers.indexOf(req.params.userId);\n    if (acceptedApplierIndex !== -1) {\n      job.acceptedAppliers.splice(acceptedApplierIndex, 1);\n    }\n    await job.save();\n    return res.status(200).json("Unapplied successfully");\n  } catch (err) {\n    return res.status(500).json({\n      error: err.message\n    });\n  }\n};\nconst getAppliers = async (req, res) => {\n  try {\n    const job = await Job.findById(req.params.jobId).populate({\n      path: "appliers",\n      select: "firstname lastname email"\n    }).select({\n      appliers: 1\n    }).lean().exec();\n    if (job.appliers.length === 0) return res.status(204).json(job.appliers);\n    return res.status(200).json(job.appliers);\n  } catch (err) {\n    return res.status(500).json({\n      error: err.message\n    });\n  }\n};\nconst getSortedAppliers = async (req, res) => {\n  try {\n    const job = await Job.findById(req.params.jobId).populate("appliers");\n    if (job.appliers.length === 0) return res.status(204).json(job.appliers);\n    const sortedappliers = await sortappliers(job.appliers);\n    return res.status(200).json(sortedappliers);\n  } catch (err) {\n    return res.status(500).json({\n      error: err.message\n    });\n  }\n};\nconst acceptApplier = async (req, res) => {\n  const {\n    jobId,\n    userId\n  } = req.params;\n  try {\n    // Find the job and the user\n    const job = await Job.findById(jobId);\n    const user = await User.findById(userId);\n\n    // Check if the job and user exist\n    if (!job || !user) {\n      return res.status(404).json({\n        message: "Job or user not found"\n      });\n    }\n\n    // Check if the user has applied to the job\n    if (!job.appliers.includes(user._id)) {\n      return res.status(400).json({\n        message: "User has not applied to this job"\n      });\n    }\n\n    // Add the user to the acceptedAppliers array of the job\n    job.acceptedAppliers.push(user._id);\n    user.notifications.push({\n      message: "You have been accepted for The Job: ",\n      job: job._id\n    });\n    sendEmail(user.email, "You have been accepted for a Job: ");\n    await user.save();\n    await job.save();\n    return res.status(200).json({\n      message: "User has been accepted for this job"\n    });\n  } catch (error) {\n    console.error(error);\n    return res.status(500).json({\n      message: "Server error"\n    });\n  }\n};\nconst getAcceptedAppliers = async (req, res) => {\n  try {\n    const job = await Job.findById(req.params.jobId).exec();\n    if (!job) return res.status(400).json("Job not found");\n    const acceptedAppliers = job.acceptedAppliers;\n\n    // create notifications for accepted users\n    for (const userId of acceptedAppliers) {\n      const user = await User.findById(userId).exec();\n    }\n    return res.status(200).json(acceptedAppliers);\n  } catch (err) {\n    return res.status(500).json({\n      error: err.message\n    });\n  }\n};\nmodule.exports = {\n  addJob,\n  getAllJobs,\n  updateJob,\n  deleteJob,\n  getByUserId,\n  acceptApplier,\n  getAppliers,\n  unapplyJob,\n  applyJob,\n  getAcceptedAppliers,\n  getSortedAppliers,\n  geJobById\n};\n\n//# sourceURL=webpack://api/./controllers/job.controller.js?'
        );

        /***/
      },

    /***/ "./controllers/messages.controllers.js":
      /*!*********************************************!*\
  !*** ./controllers/messages.controllers.js ***!
  \*********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const MessageModel = __webpack_require__(/*! ../models/Message.model */ "./models/Message.model.js");\nconst createMessage = async (req, res) => {\n  if (!req.body.message) {\n    return res.status(400).json({\n      error: "Message cannot be empty"\n    });\n  }\n  const newMessage = new MessageModel(req.body);\n  console.log(req.body);\n  try {\n    const savedMessage = await newMessage.save();\n    res.status(200).json(savedMessage);\n  } catch (err) {\n    res.status(500).json(err);\n  }\n};\nconst getMessages = async (req, res) => {\n  try {\n    const messages = await MessageModel.find({\n      conversationId: req.params.conversationId\n    }).populate("sender", "firstname picturePath") // join sender information\n    .exec();\n\n    // map messages to include sender and receiver information\n\n    res.status(200).json(messages);\n  } catch (err) {\n    res.status(500).json(err);\n  }\n};\nmodule.exports = {\n  createMessage,\n  getMessages\n};\n\n//# sourceURL=webpack://api/./controllers/messages.controllers.js?'
        );

        /***/
      },

    /***/ "./controllers/review.controller.js":
      /*!******************************************!*\
  !*** ./controllers/review.controller.js ***!
  \******************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const reviewModel = __webpack_require__(/*! ../models/Review.model */ "./models/Review.model.js");\nconst challengeModel = __webpack_require__(/*! ../models/Challenge.model */ "./models/Challenge.model.js");\nconst ObjectId = (__webpack_require__(/*! mongoose */ "mongoose").Types.ObjectId);\nconst createReview = async (req, res) => {\n  if (req.body.star > 5) {\n    return res.status(400).json({\n      message: "Star value must be between 1 and 5"\n    });\n  }\n  const newReview = new reviewModel({\n    companyId: req.userId,\n    userId: req.body.userId,\n    description: req.body.description,\n    star: req.body.star\n  });\n  try {\n    //fetch our reviews\n    const review = await reviewModel.findOne({\n      userId: req.userId,\n      companyId: req.body.companyId\n    });\n    console.log(review);\n    const savedReview = await newReview.save();\n    //we should update our challenge after we are giving a review and i\'m going to increment my total stars\n\n    await res.status(200).json(savedReview);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\nconst getReviews = async (req, res) => {\n  try {\n    const reviews = await reviewModel.find({\n      userId: new ObjectId(req.params.id)\n    }).populate({\n      path: "companyId",\n      model: "User"\n    });\n    console.log(new ObjectId(req.params.id));\n    res.status(200).json(reviews);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\nconst deleteReview = async (req, res) => {\n  try {\n    const review = await reviewModel.findOneAndDelete({\n      _id: req.params.id,\n      userId: req.userId\n    });\n    console.log(req.params.id);\n    console.log(req.userId);\n    console.log(review);\n    if (!review) {\n      return res.status(404).json({\n        message: "Review not found"\n      });\n    }\n    await challengeModel.findByIdAndUpdate(review.challengeId, {\n      $inc: {\n        totalStars: -review.star,\n        starNumber: -1\n      }\n    });\n    return res.status(200).json({\n      message: "Review deleted successfully"\n    });\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\nmodule.exports = {\n  createReview,\n  getReviews,\n  deleteReview\n};\n\n//# sourceURL=webpack://api/./controllers/review.controller.js?'
        );

        /***/
      },

    /***/ "./controllers/stripe.controllers.js":
      /*!*******************************************!*\
  !*** ./controllers/stripe.controllers.js ***!
  \*******************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          '// This is your test secret API key.\nconst stripe = __webpack_require__(/*! stripe */ "stripe")("sk_test_51MqGZlHTmGj5Wyovfhm6boql6vfTCiLs0m9LpCKgZ6mvltOoMS9ybEcdbeFvVROLI2JC38Db9kMS0tz3JIuhQK5Z001Ma9dAH0");\nconst express = __webpack_require__(/*! express */ "express");\nconst app = express();\napp.use(express.static("public"));\nconst bodyParser = __webpack_require__(/*! body-parser */ "body-parser");\nconst User = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst Company = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst {\n  sendEmail\n} = __webpack_require__(/*! ../middlewares/mail.middleware */ "./middlewares/mail.middleware.js");\n\n// Add middleware to parse incoming request bodies\n\nconst YOUR_DOMAIN = "http://localhost:3000/settings";\nconst stripePayment = async (req, res) => {\n  const userId = req.userId;\n  const session = await stripe.checkout.sessions.create({\n    line_items: [{\n      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell\n      price: "price_1MqGiJHTmGj5WyovLbfQtIrp",\n      quantity: 1\n    }],\n    mode: "payment",\n    success_url: `${YOUR_DOMAIN}?success=true`,\n    cancel_url: `${YOUR_DOMAIN}?canceled=true`,\n    metadata: {\n      userId: userId\n    },\n    payment_intent_data: {\n      metadata: {\n        userId: userId\n      }\n    }\n  });\n  console.log("1", session);\n  res.redirect(303, session.url);\n};\nconst endpointSecret = "whsec_aa6e74acff9d46da6694fb845f98b64f3df5642b944b9fb4552ca419177afce9";\nconst stripeUpdate = async (req, res) => {\n  const event = req.body;\n  const session = event.data.object;\n  console.log(session);\n  try {\n    // Handle the event\n    switch (event.type) {\n      case "checkout.session.completed":\n        const session = event.data.object;\n        const metadata = session.metadata;\n        console.log("checkout", metadata);\n        break;\n      case "payment_intent.succeeded":\n        const paymentIntent = event.data.object;\n        const paymentIntentMetadata = paymentIntent.metadata;\n        console.log("payment_intent", paymentIntentMetadata);\n        const user = await User.findById(paymentIntentMetadata.userId);\n        if (user) {\n          user.balance = user.balance + paymentIntent.amount / 100;\n          user.notifications.push({\n            message: `You Added ${paymentIntent.amount / 100}$ to your balance`\n          });\n          sendEmail(user.email, `You Added ${paymentIntent.amount / 100}$ to your balance`);\n          const newUser = await user.save();\n          console.log(newUser);\n        } else {\n          const company = await Company.findById(paymentIntentMetadata.userId);\n          company.balance = company.balance + paymentIntent.amount / 100;\n          const newCompany = await company.save();\n          console.log(newCompany);\n        }\n        const subscription = await stripe.subscriptions.retrieve(subscriptionId);\n        console.log("sub", subscriptionId);\n        await stripe.subscriptions.del(subscriptionId);\n        break;\n      case "payment_method.attached":\n        const paymentMethod = event.data.object;\n        console.log("PaymentMethod was attached to a Customer!");\n        break;\n      // ... handle other event types\n      default:\n        console.log(`Unhandled event type ${event.type}`);\n    }\n  } catch (error) {}\n\n  // Return a 200 response to acknowledge receipt of the event\n  res.json({\n    received: true\n  });\n};\nmodule.exports = {\n  stripePayment,\n  stripeUpdate\n};\n\n//# sourceURL=webpack://api/./controllers/stripe.controllers.js?'
        );

        /***/
      },

    /***/ "./controllers/submission.controllers.js":
      /*!***********************************************!*\
  !*** ./controllers/submission.controllers.js ***!
  \***********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const ChallengeModel = __webpack_require__(/*! ../models/Challenge.model */ "./models/Challenge.model.js");\nconst Submission = __webpack_require__(/*! ../models/submission.model */ "./models/submission.model.js");\nconst User = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst {\n  updateUserSubmissionsBadges\n} = __webpack_require__(/*! ../utils/utilities */ "./utils/utilities.js");\nconst CreateSubmission = async (req, res, next) => {\n  const {\n    challengeId,\n    userId,\n    title,\n    description,\n    filesPaths\n  } = req.body;\n\n  // Create submission object\n  const submission = new Submission({\n    challengeId,\n    userId,\n    title,\n    description,\n    filesPaths\n  });\n  try {\n    // Save submission to database\n    const savedSubmission = await submission.save();\n\n    // Add submission to challenge\n    const challenge = await ChallengeModel.findById(challengeId);\n    const user = await User.findById(userId).select("-password").populate("submissions");\n    challenge.submissions.push(savedSubmission._id);\n    user.submissions.push(savedSubmission._id);\n    updateUserSubmissionsBadges(user);\n    user.score += 10;\n    await challenge.save();\n    await user.save();\n    res.status(201).json(user);\n  } catch (error) {\n    console.log(error);\n    res.status(500).json({\n      message: "Server error"\n    });\n  }\n};\nmodule.exports = {\n  CreateSubmission\n};\n\n//# sourceURL=webpack://api/./controllers/submission.controllers.js?'
        );

        /***/
      },

    /***/ "./controllers/user.controller.js":
      /*!****************************************!*\
  !*** ./controllers/user.controller.js ***!
  \****************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const userSchema = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst companySchema = __webpack_require__(/*! ../models/company.model */ "./models/company.model.js");\nconst challengeSchema = __webpack_require__(/*! ../models/Challenge.model */ "./models/Challenge.model.js");\nconst bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");\nconst Job = __webpack_require__(/*! ../models/job.model */ "./models/job.model.js");\nconst {\n  pick\n} = __webpack_require__(/*! lodash */ "lodash");\n\n// ==============================|| EditProfile ||============================== //\nconst editProfile = async (req, res) => {\n  try {\n    const updateFields = pick(req.body, ["firstname", "lastname", "email", "password", "picturePath", "country", "gender", "phoneNumber", "birthDate"]);\n    if (updateFields.password) {\n      const salt = await bcrypt.genSalt(10);\n      const hashedPass = await bcrypt.hash(updateFields.password, salt);\n      updateFields.password = hashedPass;\n    }\n    const updatedUser = await userSchema.findByIdAndUpdate(req.params.id, updateFields, {\n      new: true\n    }).select("-password");\n    res.status(200).json(updatedUser);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n\n// ==============================|| Search for  users ||============================== //\nconst SearchUsers = async (req, res) => {\n  try {\n    const searchTerm = req.query.search || "";\n    const userQuery = {\n      $and: [{\n        $or: [{\n          $expr: {\n            $regexMatch: {\n              input: {\n                $concat: ["$firstname", " ", "$lastname"]\n              },\n              regex: searchTerm,\n              options: "i"\n            }\n          }\n        }, {\n          $expr: {\n            $regexMatch: {\n              input: {\n                $concat: ["$lastname", " ", "$firstname"]\n              },\n              regex: searchTerm,\n              options: "i"\n            }\n          }\n        }]\n      }, {\n        role: {\n          $ne: "admin"\n        }\n      }]\n    };\n    const companyQuery = {\n      companyName: {\n        $regex: searchTerm,\n        $options: "i"\n      }\n    };\n    const users = await userSchema.find(userQuery);\n    const companies = await companySchema.find(companyQuery);\n    const results = {\n      users,\n      companies\n    };\n    res.status(200).json(results);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\n\n//getUserByid\nconst getUser = async (req, res) => {\n  try {\n    const {\n      id\n    } = req.params;\n    const user = await userSchema.findById(id).populate({\n      path: "badgesEarned"\n    }).populate("jobs").populate("challenges").populate("companies");\n    if (user) {\n      res.status(200).json(user);\n    } else {\n      const company = await companySchema.findById(id);\n      res.status(200).json(company);\n    }\n  } catch (err) {\n    res.status(404).json({\n      message: err.message\n    });\n  }\n};\n\n//getAllUsers\nconst getUsers = async (req, res) => {\n  try {\n    const users = await userSchema.find({\n      role: {\n        $ne: "admin"\n      }\n    });\n    res.status(200).json(users);\n  } catch (err) {\n    res.status(404).json({\n      message: err.message\n    });\n  }\n};\n\n//getFollowers\nconst getUserFriends = async (req, res) => {\n  try {\n    // Find the current user by their ID using both userSchema and companySchema\n    const [currentUser] = await Promise.all([userSchema.findById(req.params.userId).select("-password")]);\n\n    // Fetch the details of all of the user\'s friends using their friend IDs\n    const userFriends = await Promise.all(currentUser.followers.map(async friendId => {\n      const friend = await userSchema.findById(friendId).select("-password");\n      if (friend) {\n        return friend;\n      }\n    }));\n    const friends = [...userFriends].filter(friend => friend !== null);\n\n    // Return the list of the user\'s friends as a JSON response\n    return res.status(200).json(friends);\n  } catch (error) {\n    return res.status(500).json(error.message);\n  }\n};\nconst getUserFollowings = async (req, res) => {\n  try {\n    // Find the current user by their ID using both userSchema and companySchema\n    const [currentUser] = await Promise.all([userSchema.findById(req.params.userId).select("-password")]);\n\n    // Fetch the details of all of the user\'s friends using their friend IDs\n    const userFollowings = await Promise.all(currentUser.followings.map(async friendId => {\n      const friend = await userSchema.findById(friendId).select("-password");\n      if (friend) {\n        return friend;\n      }\n    }));\n    const followings = [...userFollowings].filter(friend => friend !== null);\n\n    // Return the list of the user\'s friends as a JSON response\n    return res.status(200).json(followings);\n  } catch (error) {\n    return res.status(500).json(error.message);\n  }\n};\nconst followUnfollowUser = async (req, res) => {\n  try {\n    const currentUserId = req.userId;\n    const otherUserId = req.params.otherUserId;\n    if (currentUserId === otherUserId) {\n      throw new Error("You can\'t follow yourself");\n    }\n    const currentUser = await userSchema.findById(currentUserId);\n    const otherUser = await userSchema.findById(otherUserId);\n    if (!currentUser.followings.includes(otherUserId)) {\n      currentUser.followings.push(otherUserId);\n      otherUser.followers.push(currentUserId);\n      await currentUser.save();\n      await otherUser.save();\n      return res.status(200).json({\n        msg: "You have successfully followed the user!"\n      });\n    } else {\n      currentUser.followings = currentUser.followings.filter(id => id !== otherUserId);\n      otherUser.followers = otherUser.followers.filter(id => id !== currentUserId);\n      await currentUser.save();\n      await otherUser.save();\n      return res.status(200).json({\n        msg: "You have successfully unfollowed the user!"\n      });\n    }\n  } catch (error) {\n    return res.status(500).json(error.message);\n  }\n};\nconst getsuggestedUsers = async (req, res) => {\n  try {\n    const users = await userSchema.find({\n      role: {\n        $ne: "admin"\n      }\n    }).select("-password");\n    const companies = await companySchema.find().select("-password");\n    let suggestedUsers = [...users, ...companies].slice(0, 10);\n    return res.status(200).json(suggestedUsers);\n  } catch (error) {\n    return res.status(500).json(error.message);\n  }\n};\n\n//-------------------------------------------get User earned badges-----------------------------------------------//\nconst getBadgesEarnedByUser = async (req, res) => {\n  try {\n    const userId = req.userId;\n    const user = await userSchema.findById(userId).populate("badgesEarned");\n    return res.status(200).json(user.badgesEarned);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json({\n      error: "Failed to retrieve badges"\n    });\n  }\n};\n//-------------------------------------------get User stats-----------------------------------------------//\n\nconst getUserStats = async (req, res) => {\n  const date = new Date();\n  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));\n  try {\n    const data = await userSchema.aggregate([{\n      $match: {\n        createdAt: {\n          $gte: lastYear\n        }\n      }\n    }, {\n      $group: {\n        _id: {\n          year: {\n            $year: "$createdAt"\n          },\n          month: {\n            $month: "$createdAt"\n          }\n        },\n        total: {\n          $sum: 1\n        }\n      }\n    }, {\n      $sort: {\n        "_id.year": 1,\n        "_id.month": 1\n      }\n    }]);\n    res.status(200).json(data);\n  } catch (err) {\n    res.status(500).json(err);\n  }\n};\n//-------------------------------------------CHALLENGES-----------------------------------------------//\n\nconst JoinChallenge = async (req, res) => {\n  try {\n    const user = await userSchema.findById(req.body.idUser).select("-password");\n    const challenge = await challengeSchema.findById(req.body.idChallenge);\n\n    // Add challenge to user\'s challenges array\n    user.challenges.push(challenge._id);\n    user.challengesDone = ++user.challengesDone;\n    await user.save();\n    // Add user to challenge\'s users array\n    challenge.users.push(user._id);\n    await challenge.save();\n    res.status(200).send(user);\n  } catch (error) {\n    console.log("Error joining challenge:", error);\n    res.status(500).send("Error joining challenge.");\n  }\n};\nconst unjoinChallenge = async (req, res) => {\n  try {\n    const user = await userSchema.findById(req.body.idUser).select("-password");\n    const challenge = await challengeSchema.findById(req.body.idChallenge);\n\n    // Remove challenge from user\'s challenges array\n    user.challenges = user.challenges.filter(challengeId => challengeId.toString() !== challenge._id.toString());\n    await user.save();\n\n    // Remove user from challenge\'s users array\n    challenge.users = challenge.users.filter(userId => userId.toString() !== user._id.toString());\n    await challenge.save();\n    res.status(200).send(user);\n  } catch (error) {\n    console.log("Error unjoining challenge:", error);\n    res.status(500).send("Error unjoining challenge.");\n  }\n};\nconst getUserChallenges = async (req, res) => {\n  try {\n    const userId = req.query.userId; // Get idChallenge from the query parameter\n    console.log(userId);\n    const challenges = await userSchema.findById(userId).populate({\n      path: "challenges",\n      model: "Challenge",\n      populate: {\n        path: "companyId",\n        model: "Company",\n        select: "-password"\n      }\n    });\n    res.status(200).json(challenges);\n  } catch (err) {\n    res.status(500).json({\n      message: err.message\n    });\n  }\n};\nconst getUserNotifications = async (req, res) => {\n  try {\n    const user = await userSchema.findById(req.params.userId);\n    if (!user) throw new Error("User not found");\n    console.log(user.notifications);\n    const processedJobs = new Set();\n    const notifications = await Promise.all(user.notifications.map(async notification => {\n      if (notification.job && !processedJobs.has(notification.job.toString())) {\n        processedJobs.add(notification.job.toString());\n        const job = await Job.findById(notification.job).populate("company");\n        console.log(job);\n        if (job) {\n          notification.job = job;\n          return {\n            message: notification.message,\n            createdAt: notification.createdAt,\n            job: job,\n            challenge: null\n          };\n        }\n      } else if (notification.challenge) {\n        const challenge = await Challenge.findById(notification.challenge).populate("company");\n        if (challenge) {\n          return {\n            message: notification.message,\n            createdAt: notification.createdAt,\n            job: null,\n            challenge: challenge\n          };\n        }\n      }\n    }));\n    console.log("test : ", user.notifications);\n    res.status(200).json(user.notifications);\n  } catch (error) {\n    console.error(error.message);\n    res.status(500).json({\n      message: "Server Error"\n    });\n  }\n};\nconst banUser = async (req, res) => {\n  try {\n    const updatedUser = await userSchema.findOneAndUpdate({\n      _id: req.params.id\n    }, [{\n      $set: {\n        isActive: {\n          $eq: [false, "$isActive"]\n        }\n      }\n    }], {\n      new: true\n    }).select("-password");\n    res.status(200).json(updatedUser);\n  } catch (error) {\n    console.log(error);\n    return res.status(500).json(error);\n  }\n};\n\n/*-----------------------------------------Create a Company -----------------------------------------*/\n\nconst CreateCompany = async (req, res) => {\n  try {\n    const {\n      companyName,\n      companyDescription,\n      companyLogo\n    } = req.body;\n    const userId = req.userId;\n    const user = await userSchema.findById(userId);\n    if (!user) {\n      return res.status(404).json({\n        message: "User not found"\n      });\n    }\n    const company = new companySchema({\n      companyName,\n      companyDescription,\n      companyLogo,\n      user: user._id\n    });\n    await company.save();\n    user.companies.push(company._id);\n    await user.save();\n    return res.status(200).json({\n      message: "Company created successfully"\n    });\n  } catch (error) {\n    console.error(error);\n    return res.status(500).json({\n      message: "Internal server error"\n    });\n  }\n};\nmodule.exports = {\n  editProfile,\n  SearchUsers,\n  getUser,\n  getUsers,\n  getUserFriends,\n  getUserFollowings,\n  getsuggestedUsers,\n  getBadgesEarnedByUser,\n  followUnfollowUser,\n  JoinChallenge,\n  unjoinChallenge,\n  getUserChallenges,\n  getUserStats,\n  getUserNotifications,\n  banUser,\n  CreateCompany\n};\n\n//# sourceURL=webpack://api/./controllers/user.controller.js?'
        );

        /***/
      },

    /***/ "./middlewares/SchemaValidation.middleware.js":
      /*!****************************************************!*\
  !*** ./middlewares/SchemaValidation.middleware.js ***!
  \****************************************************/
      /***/ (module) => {
        eval(
          "module.exports = schema => {\n  return async (req, res, next) => {\n    try {\n      // Validate the request body using the schema provided\n      const validBody = await schema.validate(req.body);\n\n      // Strip any unknown properties from the request body and update it with the validated data\n      req.body = schema.cast(validBody, {\n        stripUnknown: true\n      });\n\n      // Call the next middleware or route handler in the chain\n      return next();\n    } catch (err) {\n      // If there's an error, respond with a 400 status code and a JSON error message\n      res.status(400).json({\n        error: {\n          path: err.path,\n          msg: err.message\n        }\n      });\n    }\n  };\n};\n\n//# sourceURL=webpack://api/./middlewares/SchemaValidation.middleware.js?"
        );

        /***/
      },

    /***/ "./middlewares/authenticateToken.middleware.js":
      /*!*****************************************************!*\
  !*** ./middlewares/authenticateToken.middleware.js ***!
  \*****************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");\nconst authenticateToken = async (req, res, next) => {\n  try {\n    const token = req.cookies.accessToken;\n    if (!token) return res.status(401).send("You are not authenticated!");\n    const payload = await jwt.verify(token, process.env.passwordToken);\n    req.userId = payload.id;\n    req.role = payload.role;\n    next();\n  } catch (err) {\n    return res.status(403).send("Token is not valid!");\n  }\n};\nmodule.exports = {\n  authenticateToken\n};\n\n//# sourceURL=webpack://api/./middlewares/authenticateToken.middleware.js?'
        );

        /***/
      },

    /***/ "./middlewares/isAdmin.middleware.js":
      /*!*******************************************!*\
  !*** ./middlewares/isAdmin.middleware.js ***!
  \*******************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");\nconst User = __webpack_require__(/*! ../models/user.model */ "./models/user.model.js");\nconst isAdmin = async (req, res, next) => {\n  const token = req.cookies.accessToken;\n  if (!token) {\n    return res.status(401).json({\n      error: "Unauthorized"\n    });\n  }\n  try {\n    const decoded = jwt.verify(token, process.env.passwordToken);\n    console.log(decoded);\n    const user = await User.findOne({\n      email: decoded.email\n    });\n    console.log(decoded);\n    console.log(user);\n    if (!user) {\n      throw new Error();\n    }\n    if (user.role !== "admin") {\n      throw new Error();\n    }\n    req.user = user;\n    req.token = token;\n    next();\n  } catch (error) {\n    res.status(401).json({\n      error: "Unauthorized"\n    });\n  }\n};\nmodule.exports = {\n  isAdmin\n};\n\n//# sourceURL=webpack://api/./middlewares/isAdmin.middleware.js?'
        );

        /***/
      },

    /***/ "./middlewares/mail.middleware.js":
      /*!****************************************!*\
  !*** ./middlewares/mail.middleware.js ***!
  \****************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");\nasync function sendEmail(userEmail, message) {\n  let transporter = nodemailer.createTransport({\n    service: "gmail",\n    auth: {\n      user: process.env.EMAIL_ADDRESS,\n      pass: process.env.EMAIL_PASSWORD\n    }\n  });\n  let mailOptions = {\n    from: process.env.EMAIL_ADDRESS,\n    // replace with your email address\n    to: userEmail,\n    subject: "Message from your app!",\n    text: message\n  };\n  let info = await transporter.sendMail(mailOptions);\n  console.log("Message sent: %s", info.messageId);\n}\nmodule.exports = {\n  sendEmail\n};\n\n//# sourceURL=webpack://api/./middlewares/mail.middleware.js?'
        );

        /***/
      },

    /***/ "./models/BadgeType.model.js":
      /*!***********************************!*\
  !*** ./models/BadgeType.model.js ***!
  \***********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst badgeTypeSchema = new mongoose.Schema({\n  userId: {\n    type: String\n  },\n  badgeName: String,\n  badgeDescription: String,\n  badgeImg: String,\n  Etat: Boolean\n}, {\n  timestamps: true\n});\nconst BadgeType = mongoose.model("BadgeType", badgeTypeSchema);\nmodule.exports = BadgeType;\n\n//# sourceURL=webpack://api/./models/BadgeType.model.js?'
        );

        /***/
      },

    /***/ "./models/Category.model.js":
      /*!**********************************!*\
  !*** ./models/Category.model.js ***!
  \**********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst categorySchema = new mongoose.Schema({\n  name: {\n    type: String,\n    required: true,\n    trim: true,\n    unique: true\n  }\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model("Category", categorySchema);\n\n//# sourceURL=webpack://api/./models/Category.model.js?'
        );

        /***/
      },

    /***/ "./models/Challenge.model.js":
      /*!***********************************!*\
  !*** ./models/Challenge.model.js ***!
  \***********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst ChallengeSchema = new mongoose.Schema({\n  company: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "Company"\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  description: {\n    type: String,\n    required: true\n  },\n  totalStars: {\n    type: Number,\n    default: 0\n  },\n  starNumber: {\n    type: Number,\n    default: 0\n  },\n  category: {\n    type: String,\n    required: true\n  },\n  RecommendedSkills: {\n    type: Array,\n    default: []\n  },\n  price: {\n    type: Number,\n    required: false\n  },\n  cover: {\n    type: String\n  },\n  images: {\n    type: [String]\n  },\n  //array that include string\n  deliveryTime: {\n    type: Number\n  },\n  features: {\n    type: [String]\n  },\n  deadline: {\n    type: Date\n  },\n  winner: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "User"\n  },\n  users: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "User"\n    }],\n    default: []\n  },\n  submissions: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "Submission"\n    }],\n    default: []\n  }\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model("Challenge", ChallengeSchema);\n\n//# sourceURL=webpack://api/./models/Challenge.model.js?'
        );

        /***/
      },

    /***/ "./models/Comment.model.js":
      /*!*********************************!*\
  !*** ./models/Comment.model.js ***!
  \*********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst commentSchema = mongoose.Schema({\n  userId: {\n    type: String,\n    required: true\n  },\n  postId: {\n    type: String,\n    required: true\n  },\n  desc: {\n    type: String,\n    required: true\n  },\n  commentCount: {\n    type: Number,\n    default: 0\n  }\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model("Comment", commentSchema);\n\n//# sourceURL=webpack://api/./models/Comment.model.js?'
        );

        /***/
      },

    /***/ "./models/Conversation.model.js":
      /*!**************************************!*\
  !*** ./models/Conversation.model.js ***!
  \**************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst ConversationSchema = new mongoose.Schema({\n  members: [{\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "User"\n  }],\n  latestMessage: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "Message"\n  }\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model("Conversation", ConversationSchema);\n\n//# sourceURL=webpack://api/./models/Conversation.model.js?'
        );

        /***/
      },

    /***/ "./models/Message.model.js":
      /*!*********************************!*\
  !*** ./models/Message.model.js ***!
  \*********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst MessageSchema = new mongoose.Schema({\n  conversationId: {\n    type: String,\n    required: true\n  },\n  sender: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "User"\n  },\n  message: {\n    type: String\n  }\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model("Message", MessageSchema);\n\n//# sourceURL=webpack://api/./models/Message.model.js?'
        );

        /***/
      },

    /***/ "./models/Review.model.js":
      /*!********************************!*\
  !*** ./models/Review.model.js ***!
  \********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst User = __webpack_require__(/*! ./user.model */ "./models/user.model.js");\nconst Company = __webpack_require__(/*! ./company.model */ "./models/company.model.js");\nconst ReviewSchema = new mongoose.Schema({\n  userId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: User,\n    required: true\n  },\n  companyId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: Company,\n    required: true\n  },\n  description: {\n    type: String,\n    required: true\n  },\n  //the number of stars of the user who put the review\n  star: {\n    type: Number,\n    required: true,\n    enum: [1, 2, 3, 4, 5]\n  }\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model("Review", ReviewSchema);\n\n//# sourceURL=webpack://api/./models/Review.model.js?'
        );

        /***/
      },

    /***/ "./models/SocialMediaPost.model.js":
      /*!*****************************************!*\
  !*** ./models/SocialMediaPost.model.js ***!
  \*****************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst SocialMediaPostSchema = new mongoose.Schema({\n  userId: {\n    type: String,\n    required: true\n  },\n  firstname: {\n    type: String,\n    required: false\n  },\n  lastname: {\n    type: String,\n    required: false\n  },\n  companyName: {\n    type: String,\n    required: false\n  },\n  description: {\n    type: String,\n    max: 500,\n    required: true\n  },\n  postPicturePath: {\n    type: Array\n  },\n  userPicturePath: {\n    type: String\n  },\n  likes: {\n    type: Map,\n    of: Boolean,\n    default: {}\n  },\n  likesCount: {\n    type: Number,\n    default: 0\n  },\n  shareCount: {\n    type: Number,\n    default: 0\n  },\n  categories: {\n    type: Array,\n    required: false\n  },\n  comments: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "Comment"\n    }],\n    default: []\n  },\n  commentCount: {\n    type: Number,\n    default: 0\n  },\n  user: {\n    type: mongoose.Types.ObjectId,\n    ref: "User"\n  }\n}, {\n  timestamps: true\n});\nconst SocialMediaPost = mongoose.model("SocialMediaPost", SocialMediaPostSchema);\nmodule.exports = SocialMediaPost;\n\n//# sourceURL=webpack://api/./models/SocialMediaPost.model.js?'
        );

        /***/
      },

    /***/ "./models/company.model.js":
      /*!*********************************!*\
  !*** ./models/company.model.js ***!
  \*********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst companySchema = new mongoose.Schema({\n  companyName: {\n    type: String,\n    maxLength: 255,\n    trim: true,\n    unique: true\n  },\n  companyDescription: {\n    type: String\n  },\n  companyLogo: {\n    type: String\n  },\n  country: {\n    type: String\n  },\n  picturePath: {\n    type: String\n  },\n  websiteUrl: {\n    type: String\n  },\n  verified: {\n    type: Boolean,\n    default: false\n  },\n  isDocumentSubmitted: {\n    type: Boolean,\n    default: false\n  },\n  // Document submission status\n\n  user: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "User"\n  },\n  jobs: [{\n    type: mongoose.Types.ObjectId,\n    ref: "Job"\n  }],\n  challenges: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "Challenge"\n    }],\n    default: []\n  },\n  balance: {\n    type: Number,\n    default: 0.0\n  },\n  dateofFoundation: {\n    type: Date\n  },\n  posts: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "SocialMediaPost"\n    }],\n    default: []\n  },\n  notificationsCompany: [{\n    message: String,\n    createdAt: {\n      type: Date,\n      default: Date.now\n    },\n    job: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "Job"\n    },\n    challenge: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "Challenge"\n    },\n    user: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "User"\n    }\n  }]\n}, {\n  timestamps: true\n});\nconst Company = mongoose.model("Company", companySchema);\nmodule.exports = Company;\n\n//# sourceURL=webpack://api/./models/company.model.js?'
        );

        /***/
      },

    /***/ "./models/job.model.js":
      /*!*****************************!*\
  !*** ./models/job.model.js ***!
  \*****************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst Company = __webpack_require__(/*! ./company.model */ "./models/company.model.js");\nconst JobSchema = new mongoose.Schema({\n  companyId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "Company"\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  description: {\n    type: String,\n    required: true\n  },\n  image: {\n    type: String,\n    required: false\n  },\n  salary: {\n    type: Number,\n    required: false\n  },\n  company: {\n    type: mongoose.Types.ObjectId,\n    ref: "Company",\n    required: true\n  },\n  appliers: [{\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "User"\n  }],\n  acceptedAppliers: [{\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "User"\n  }]\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model("Job", JobSchema);\n\n//# sourceURL=webpack://api/./models/job.model.js?'
        );

        /***/
      },

    /***/ "./models/submission.model.js":
      /*!************************************!*\
  !*** ./models/submission.model.js ***!
  \************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst SubmissionSchema = new mongoose.Schema({\n  //we need the challenge Id\n  challengeId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "Challenge",\n    required: true\n  },\n  //the id of the user that put the review\n  userId: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "User",\n    required: true\n  },\n  title: {\n    type: String,\n    required: true\n  },\n  description: {\n    type: String,\n    required: true\n  },\n  filesPaths: {\n    type: [String],\n    required: true\n  }\n}, {\n  timestamps: true\n});\nmodule.exports = mongoose.model("Submission", SubmissionSchema);\n\n//# sourceURL=webpack://api/./models/submission.model.js?'
        );

        /***/
      },

    /***/ "./models/user.model.js":
      /*!******************************!*\
  !*** ./models/user.model.js ***!
  \******************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst UserSchema = new mongoose.Schema({\n  firstname: {\n    type: String,\n    required: true\n  },\n  lastname: {\n    type: String,\n    required: true\n  },\n  email: {\n    type: String,\n    required: true,\n    unique: true,\n    lowercase: true\n  },\n  password: {\n    type: String,\n    required: false\n  },\n  country: {\n    type: String\n  },\n  picturePath: {\n    type: String,\n    required: false\n  },\n  userDescription: {\n    type: String,\n    required: false\n  },\n  birthDate: {\n    type: Date\n  },\n  score: {\n    type: Number,\n    default: 0\n  },\n  gender: {\n    type: String,\n    enum: ["Male", "Female", "Other"]\n  },\n  balance: {\n    type: Number,\n    default: 0.0\n  },\n  yearsRegistered: {\n    type: Number,\n    default: 0\n  },\n  challengesDone: {\n    type: Number,\n    default: 0\n  },\n  challengesWon: {\n    type: Number,\n    default: 0\n  },\n  reviews: {\n    type: Number,\n    default: 0\n  },\n  phoneNumber: {\n    type: String,\n    maxLength: 14,\n    default: ""\n  },\n  followers: {\n    type: Array,\n    default: []\n  },\n  followings: {\n    type: Array,\n    default: []\n  },\n  viewedProfile: {\n    type: Number\n  },\n  impressions: {\n    type: Number\n  },\n  //role to switch between company and user\n  role: {\n    type: String,\n    enum: ["user", "admin", "company"],\n    default: "user"\n  },\n  resetToken: {\n    type: String,\n    default: undefined\n  },\n  //need it for forget password(verification)\n  isFaceRecognition: {\n    type: Boolean,\n    default: false\n  },\n  isActive: {\n    type: Boolean,\n    default: true\n  },\n  posts: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "SocialMediaPost"\n    }],\n    default: []\n  },\n  challenges: [{\n    type: mongoose.Types.ObjectId,\n    ref: "Challenge"\n  }],\n  badgesEarned: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "BadgeType"\n    }],\n    default: []\n  },\n  submissions: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "Submission"\n    }],\n    default: []\n  },\n  messages: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "Message"\n    }],\n    default: []\n  },\n  jobs: [{\n    type: mongoose.Types.ObjectId,\n    ref: "Job",\n    required: true\n  }],\n  notifications: [{\n    job: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "Job"\n    },\n    message: String,\n    createdAt: {\n      type: Date,\n      default: Date.now\n    }\n  }],\n  companies: {\n    type: [{\n      type: mongoose.Schema.Types.ObjectId,\n      ref: "Company"\n    }],\n    default: []\n  }\n}, {\n  timestamps: true\n});\nUserSchema.virtual("yearsRegisteredCalcu").get(function () {\n  const now = new Date();\n  const createdAt = new Date(this.createdAt);\n  const yearsRegisteredCalcu = now.getFullYear() - createdAt.getFullYear();\n  if (now.getMonth() < createdAt.getMonth() || now.getMonth() === createdAt.getMonth() && now.getDate() < createdAt.getDate()) {\n    yearsRegisteredCalcu--;\n  }\n  this.yearsRegistered = yearsRegisteredCalcu || 0;\n  return this.yearsRegistered;\n});\nmodule.exports = mongoose.model("User", UserSchema);\n\n//# sourceURL=webpack://api/./models/user.model.js?'
        );

        /***/
      },

    /***/ "./routes/BadgeType.router.js":
      /*!************************************!*\
  !*** ./routes/BadgeType.router.js ***!
  \************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst BadgeTypeRouter = express.Router();\nconst {\n  addBadgeType,\n  getBadgeType,\n  deleteBadgeType\n} = __webpack_require__(/*! ../controllers/BadgeType.controllers */ "./controllers/BadgeType.controllers.js");\n// Require authentication middleware\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nBadgeTypeRouter.post("/add", authenticateToken, addBadgeType);\nBadgeTypeRouter.get("/badgeTypes", getBadgeType);\nBadgeTypeRouter.delete("/:id", deleteBadgeType);\nmodule.exports = BadgeTypeRouter;\n\n//# sourceURL=webpack://api/./routes/BadgeType.router.js?'
        );

        /***/
      },

    /***/ "./routes/Category.router.js":
      /*!***********************************!*\
  !*** ./routes/Category.router.js ***!
  \***********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst CategoryRouter = express.Router();\nconst controller = __webpack_require__(/*! ../controllers/Category.controllers */ "./controllers/Category.controllers.js");\nconst {\n  isAdmin\n} = __webpack_require__(/*! ../middlewares/isAdmin.middleware */ "./middlewares/isAdmin.middleware.js");\nCategoryRouter.post("/addCategory", controller.createCategory);\nCategoryRouter.get("/getCategories", controller.getCategories);\nCategoryRouter.put("/updateCategory/:id", isAdmin, controller.updateCategory);\nCategoryRouter.delete("/deleteCategory/:id", isAdmin, controller.deleteCategory);\nmodule.exports = CategoryRouter;\n\n//# sourceURL=webpack://api/./routes/Category.router.js?'
        );

        /***/
      },

    /***/ "./routes/Challenge.router.js":
      /*!************************************!*\
  !*** ./routes/Challenge.router.js ***!
  \************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst ChallengeRouter = express.Router();\n\n//imported controllers\nconst {\n  CreateChallenge,\n  deleteChallenge,\n  getChallengeById,\n  getCompanyChallenges,\n  getAllChallenges,\n  getChallengeUsers,\n  getChallengeUserSubmit\n} = __webpack_require__(/*! ../controllers/Challenge.controller */ "./controllers/Challenge.controller.js");\nconst {\n  CreateSubmission\n} = __webpack_require__(/*! ../controllers/submission.controllers */ "./controllers/submission.controllers.js");\n\n// Require authentication middleware\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nconst validate = __webpack_require__(/*! ../middlewares/SchemaValidation.middleware */ "./middlewares/SchemaValidation.middleware.js");\nconst {\n  challengeSchemaValidator\n} = __webpack_require__(/*! ../validators/challenge.validators */ "./validators/challenge.validators.js");\nChallengeRouter.post("/add", authenticateToken, CreateChallenge, validate(challengeSchemaValidator));\nChallengeRouter.get("/single/:challengeId", authenticateToken, getChallengeById);\nChallengeRouter.get("/:companyId", authenticateToken, getCompanyChallenges);\nChallengeRouter.get("/challenges/all", authenticateToken, getAllChallenges);\nChallengeRouter.get("/getChallengeUsers", authenticateToken, getChallengeUsers);\nChallengeRouter.get("/getChallengeUserSubmit", authenticateToken, getChallengeUserSubmit);\nChallengeRouter.delete("/deleteChallenge/:id", authenticateToken, deleteChallenge);\nChallengeRouter.post("/submission", authenticateToken, CreateSubmission);\nChallengeRouter.delete("/:id", authenticateToken, deleteChallenge);\nmodule.exports = ChallengeRouter;\n\n//# sourceURL=webpack://api/./routes/Challenge.router.js?'
        );

        /***/
      },

    /***/ "./routes/SocialMediaPost.router.js":
      /*!******************************************!*\
  !*** ./routes/SocialMediaPost.router.js ***!
  \******************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst SocialMediaPostRouter = express.Router();\n\n//imported controllers\nconst {\n  CreatePost,\n  updateAPost,\n  getFeedPosts,\n  deletePost,\n  getUserPosts,\n  likePost,\n  sharePost\n} = __webpack_require__(/*! ../controllers/SocialMediaPost.controllers */ "./controllers/SocialMediaPost.controllers.js");\n\n// Require authentication middleware\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nSocialMediaPostRouter.post("/", authenticateToken, CreatePost);\nSocialMediaPostRouter.get("/posts", authenticateToken, getFeedPosts);\nSocialMediaPostRouter.get("/:userId", authenticateToken, getUserPosts);\nSocialMediaPostRouter.delete("/:id", authenticateToken, deletePost);\nSocialMediaPostRouter.put("/:id", authenticateToken, updateAPost);\nSocialMediaPostRouter.patch("/:id/like", authenticateToken, likePost);\nSocialMediaPostRouter.patch("/share", authenticateToken, sharePost);\nmodule.exports = SocialMediaPostRouter;\n\n//# sourceURL=webpack://api/./routes/SocialMediaPost.router.js?'
        );

        /***/
      },

    /***/ "./routes/admin.router.js":
      /*!********************************!*\
  !*** ./routes/admin.router.js ***!
  \********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst adminRouter = express.Router();\nconst {\n  isAdmin\n} = __webpack_require__(/*! ../middlewares/isAdmin.middleware */ "./middlewares/isAdmin.middleware.js");\nconst {\n  addUser,\n  getUsers,\n  updUser,\n  delUser,\n  disableUser,\n  BanAccount,\n  getCompanies,\n  approveCompany\n} = __webpack_require__(/*! ../controllers/admin.controllers */ "./controllers/admin.controllers.js");\nadminRouter.get("/Users", isAdmin, getUsers);\nadminRouter.get("/Companies", isAdmin, getCompanies);\nadminRouter.post("/addUser", addUser);\nadminRouter.put("/updUsers/:id", updUser);\nadminRouter.delete("/delUsers/:id", delUser);\nadminRouter.put("/users/:id/ban", isAdmin, BanAccount);\nadminRouter.put("/users/:id/:action", isAdmin, disableUser);\nadminRouter.post("/appCompany", approveCompany);\nmodule.exports = adminRouter;\n\n//# sourceURL=webpack://api/./routes/admin.router.js?'
        );

        /***/
      },

    /***/ "./routes/auth.user.router.js":
      /*!************************************!*\
  !*** ./routes/auth.user.router.js ***!
  \************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst authRouter = express.Router();\nconst passport = __webpack_require__(/*! passport */ "passport");\nconst CLIENT_URL = "http://localhost:3000/";\n\n//imported controllers\nconst {\n  signIn,\n  signUp,\n  logout,\n  forgetpassword,\n  resetpassword\n} = __webpack_require__(/*! ../controllers/auth.user.controller */ "./controllers/auth.user.controller.js");\n\n//imported schema validator\nconst validate = __webpack_require__(/*! ../middlewares/SchemaValidation.middleware */ "./middlewares/SchemaValidation.middleware.js");\n//imported validators\nconst {\n  userRegisterValidator,\n  loginValidator\n} = __webpack_require__(/*! ../validators/user.auth.validators */ "./validators/user.auth.validators.js");\nconst {\n  companyRegisterValidator\n} = __webpack_require__(/*! ../validators/company.auth.validators */ "./validators/company.auth.validators.js");\n\n//imported MiddleWare\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nauthRouter.get("/currentUser", authenticateToken, async (req, res) => {\n  try {\n    res.send({\n      user: req.user\n    });\n  } catch (err) {\n    res.send(err.message);\n  }\n});\nauthRouter.post("/register", (req, res, next) => {\n  if (req.body.role === "user") {\n    return validate(userRegisterValidator)(req, res, next);\n  } else if (req.body.role === "company") {\n    return validate(companyRegisterValidator)(req, res, next);\n  }\n}, signUp);\nauthRouter.post("/login", validate(loginValidator), signIn);\nauthRouter.post("/logout", logout);\nauthRouter.post("/forgetpassword", forgetpassword);\nauthRouter.post("/resetpassword", resetpassword);\n\n//Google Authentication Success\nauthRouter.get("/login/success", (req, res) => {\n  if (req.user) {\n    return res.cookie("accessToken", "test").res.status(200).json(req.user);\n  }\n});\nauthRouter.get("/login/failed", (req, res) => {\n  res.status(401).json({\n    success: false,\n    message: "failure"\n  });\n});\nauthRouter.get("/google", passport.authenticate("google", {\n  scope: ["profile", "email"]\n}));\nauthRouter.get("/google/callback", passport.authenticate("google", {\n  successRedirect: CLIENT_URL + "feed",\n  failureRedirect: "/login/failed"\n}));\nmodule.exports = authRouter;\n\n//# sourceURL=webpack://api/./routes/auth.user.router.js?'
        );

        /***/
      },

    /***/ "./routes/comment.router.js":
      /*!**********************************!*\
  !*** ./routes/comment.router.js ***!
  \**********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst CommentRouter = express.Router();\nconst {\n  addComment,\n  getComments,\n  deleteComment\n} = __webpack_require__(/*! ../controllers/Comment.controllers */ "./controllers/Comment.controllers.js");\n// Require authentication middleware\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nCommentRouter.post("/", authenticateToken, addComment);\nCommentRouter.get("/:postId", authenticateToken, getComments);\nCommentRouter.delete("/:id", authenticateToken, deleteComment);\nmodule.exports = CommentRouter;\n\n//# sourceURL=webpack://api/./routes/comment.router.js?'
        );

        /***/
      },

    /***/ "./routes/company.router.js":
      /*!**********************************!*\
  !*** ./routes/company.router.js ***!
  \**********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst companyRouter = express.Router();\n\n//imported controllers\nconst {\n  approveCompany\n} = __webpack_require__(/*! ../controllers/admin.controllers */ "./controllers/admin.controllers.js");\nconst {\n  editProfile,\n  ChallengeWinner,\n  getCompanyNotifications\n} = __webpack_require__(/*! ../controllers/Company.controllers */ "./controllers/Company.controllers.js");\nconst {\n  getCompany\n} = __webpack_require__(/*! ../controllers/Company.controllers */ "./controllers/Company.controllers.js");\nconst validate = __webpack_require__(/*! ../middlewares/SchemaValidation.middleware */ "./middlewares/SchemaValidation.middleware.js");\n\n//imported MiddleWare\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nconst {\n  companyEditProfileValidator\n} = __webpack_require__(/*! ../validators/company.auth.validators */ "./validators/company.auth.validators.js");\ncompanyRouter.put("/approve/:id/", authenticateToken, approveCompany);\ncompanyRouter.put("/:id/", validate(companyEditProfileValidator), authenticateToken, editProfile);\ncompanyRouter.get("/get/:companyId/", authenticateToken, getCompany);\ncompanyRouter.post("/challengeWinner", authenticateToken, ChallengeWinner);\ncompanyRouter.get("/company/:companyId/notifications", authenticateToken, getCompanyNotifications);\nmodule.exports = companyRouter;\n\n//# sourceURL=webpack://api/./routes/company.router.js?'
        );

        /***/
      },

    /***/ "./routes/conversation.router.js":
      /*!***************************************!*\
  !*** ./routes/conversation.router.js ***!
  \***************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst ConversationRouter = express.Router();\n\n//imported controllers\nconst {\n  createConversation,\n  getConversations\n} = __webpack_require__(/*! ../controllers/conversation.controller */ "./controllers/conversation.controller.js");\n\n// Require authentication middleware\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nConversationRouter.post("/", authenticateToken, createConversation);\nConversationRouter.get("/:userId", authenticateToken, getConversations);\nmodule.exports = ConversationRouter;\n\n//# sourceURL=webpack://api/./routes/conversation.router.js?'
        );

        /***/
      },

    /***/ "./routes/index.router.js":
      /*!********************************!*\
  !*** ./routes/index.router.js ***!
  \********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst router = express.Router();\n// ==============================|| Imported routes ||============================== //\nconst authRouter = __webpack_require__(/*! ./auth.user.router */ "./routes/auth.user.router.js");\nconst userRouter = __webpack_require__(/*! ./user.router */ "./routes/user.router.js");\nconst swaggerRouter = __webpack_require__(/*! ./swagger.router */ "./routes/swagger.router.js");\nconst adminRouter = __webpack_require__(/*! ./admin.router */ "./routes/admin.router.js");\nconst SocialMediaPostRouter = __webpack_require__(/*! ./SocialMediaPost.router */ "./routes/SocialMediaPost.router.js");\nconst ChallengeRouter = __webpack_require__(/*! ./Challenge.router */ "./routes/Challenge.router.js");\nconst companyRouter = __webpack_require__(/*! ./company.router */ "./routes/company.router.js");\nconst jobRouter = __webpack_require__(/*! ./job.router */ "./routes/job.router.js");\nconst conversationRouter = __webpack_require__(/*! ./conversation.router */ "./routes/conversation.router.js");\nconst MessageRouter = __webpack_require__(/*! ./messages.router */ "./routes/messages.router.js");\nconst stripeRouter = __webpack_require__(/*! ./stripe.router */ "./routes/stripe.router.js");\nconst BadgeTypeRouter = __webpack_require__(/*! ./BadgeType.router */ "./routes/BadgeType.router.js");\nconst CategoryRouter = __webpack_require__(/*! ./Category.router */ "./routes/Category.router.js");\nconst CommentRouter = __webpack_require__(/*! ./comment.router */ "./routes/comment.router.js");\nconst payementRouter = __webpack_require__(/*! ./payment.router */ "./routes/payment.router.js");\nrouter.use("/job", jobRouter);\nrouter.use("/auth", authRouter);\nrouter.use("/", userRouter);\nrouter.use("/company", companyRouter);\nrouter.use("/api-docs", swaggerRouter);\nrouter.use("/admin", adminRouter);\nrouter.use("/post", SocialMediaPostRouter);\nrouter.use("/challenge", ChallengeRouter);\nrouter.use("/conversation", conversationRouter);\nrouter.use("/messages", MessageRouter);\nrouter.use("/stripe", stripeRouter);\nrouter.use("/badgeType", BadgeTypeRouter);\nrouter.use("/category", CategoryRouter);\nrouter.use("/comment", CommentRouter);\nrouter.use("/api", payementRouter);\nmodule.exports = router;\n\n//# sourceURL=webpack://api/./routes/index.router.js?'
        );

        /***/
      },

    /***/ "./routes/job.router.js":
      /*!******************************!*\
  !*** ./routes/job.router.js ***!
  \******************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst jobRouter = express.Router();\nconst {\n  addJob,\n  getAllJobs,\n  updateJob,\n  geJobById,\n  deleteJob,\n  getByUserId,\n  applyJob,\n  unapplyJob,\n  getAppliers,\n  acceptApplier,\n  getAcceptedAppliers,\n  getSortedAppliers\n} = __webpack_require__(/*! ../controllers/job.controller */ "./controllers/job.controller.js");\n\n//imported MiddleWare\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\njobRouter.post("/add", authenticateToken, addJob);\njobRouter.get("/all", getAllJobs);\njobRouter.put("/update/:id", authenticateToken, updateJob);\njobRouter.get("/:companyId", authenticateToken, geJobById);\njobRouter.delete("/:id", authenticateToken, deleteJob);\njobRouter.get("/user/:id", authenticateToken, getByUserId);\n//\njobRouter.put("/jobs/:jobId/apply/:userId", applyJob);\njobRouter.put("/jobs/:jobId/unapply/:userId", unapplyJob);\njobRouter.get("/jobs/:jobId/appliers", getAppliers);\njobRouter.get("/jobs/:jobId/sortedappliers", getSortedAppliers);\njobRouter.put("/jobs/:jobId/appliers/:userId/accept", acceptApplier);\njobRouter.get("/jobs/:jobId/accepted-appliers", getAcceptedAppliers);\nmodule.exports = jobRouter;\n\n//# sourceURL=webpack://api/./routes/job.router.js?'
        );

        /***/
      },

    /***/ "./routes/messages.router.js":
      /*!***********************************!*\
  !*** ./routes/messages.router.js ***!
  \***********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst MessageRouter = express.Router();\n\n//imported controllers\nconst {\n  createMessage,\n  getMessages\n} = __webpack_require__(/*! ../controllers/messages.controllers */ "./controllers/messages.controllers.js");\n\n// Require authentication middleware\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nMessageRouter.post("/", authenticateToken, createMessage);\nMessageRouter.get("/:conversationId", authenticateToken, getMessages);\nmodule.exports = MessageRouter;\n\n//# sourceURL=webpack://api/./routes/messages.router.js?'
        );

        /***/
      },

    /***/ "./routes/payment.router.js":
      /*!**********************************!*\
  !*** ./routes/payment.router.js ***!
  \**********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst PayementRouter = express.Router();\nconst {\n  Payment,\n  Verify\n} = __webpack_require__(/*! ../controllers/Floucipayment.controller */ "./controllers/Floucipayment.controller.js");\nPayementRouter.post("/payment", Payment);\nPayementRouter.post("/payment/:id", Verify);\nmodule.exports = PayementRouter;\n\n//# sourceURL=webpack://api/./routes/payment.router.js?'
        );

        /***/
      },

    /***/ "./routes/stripe.router.js":
      /*!*********************************!*\
  !*** ./routes/stripe.router.js ***!
  \*********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst {\n  stripePayment,\n  stripeUpdate\n} = __webpack_require__(/*! ../controllers/stripe.controllers */ "./controllers/stripe.controllers.js");\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nconst stripeRouter = express.Router();\nstripeRouter.post("/create-checkout-session", authenticateToken, stripePayment);\nstripeRouter.post("/webhook", stripeUpdate);\nmodule.exports = stripeRouter;\n\n//# sourceURL=webpack://api/./routes/stripe.router.js?'
        );

        /***/
      },

    /***/ "./routes/swagger.router.js":
      /*!**********************************!*\
  !*** ./routes/swagger.router.js ***!
  \**********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst swaggerRouter = express.Router();\n\n// Import the Swagger specifications\nconst swaggerUi = __webpack_require__(/*! swagger-ui-express */ "swagger-ui-express");\nconst swaggerDocs = __webpack_require__(/*! ../config/swagger */ "./config/swagger.js");\n\n// Use the Swagger UI middleware to serve the Swagger documentation\nswaggerRouter.use("/", swaggerUi.serve);\nswaggerRouter.get("/", swaggerUi.setup(swaggerDocs));\nmodule.exports = swaggerRouter;\n\n//# sourceURL=webpack://api/./routes/swagger.router.js?'
        );

        /***/
      },

    /***/ "./routes/user.router.js":
      /*!*******************************!*\
  !*** ./routes/user.router.js ***!
  \*******************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst userRouter = express.Router();\n\n//imported controllers\nconst {\n  editProfile,\n  SearchUsers,\n  getUser,\n  getUsers,\n  getUserFriends,\n  getUserFollowings,\n  getsuggestedUsers,\n  getBadgesEarnedByUser,\n  followUnfollowUser,\n  JoinChallenge,\n  unjoinChallenge,\n  getUserChallenges,\n  getUserStats,\n  getUserNotifications,\n  banUser,\n  CreateCompany\n} = __webpack_require__(/*! ../controllers/user.controller */ "./controllers/user.controller.js");\nconst validate = __webpack_require__(/*! ../middlewares/SchemaValidation.middleware */ "./middlewares/SchemaValidation.middleware.js");\nconst {\n  createReview,\n  getReviews\n} = __webpack_require__(/*! ../controllers/review.controller */ "./controllers/review.controller.js");\nconst {\n  userEditProfileValidator\n} = __webpack_require__(/*! ../validators/user.auth.validators */ "./validators/user.auth.validators.js");\n\n//imported MiddleWare\nconst {\n  authenticateToken\n} = __webpack_require__(/*! ../middlewares/authenticateToken.middleware */ "./middlewares/authenticateToken.middleware.js");\nuserRouter.put("/users/:id/", validate(userEditProfileValidator), authenticateToken, editProfile);\nuserRouter.get("/users", authenticateToken, SearchUsers); //seach users\nuserRouter.get("/allusers", authenticateToken, getUsers); //seach users\nuserRouter.get("/:id", authenticateToken, getUser);\nuserRouter.get("/find/friends/:userId", authenticateToken, getUserFriends);\nuserRouter.get("/find/followings/:userId", authenticateToken, getUserFollowings);\nuserRouter.put("/toggleFollow/:otherUserId", authenticateToken, followUnfollowUser);\nuserRouter.get("/find/suggestedUsers", authenticateToken, getsuggestedUsers);\nuserRouter.get("/:userId/badges", authenticateToken, getBadgesEarnedByUser);\nuserRouter.post("/join", authenticateToken, JoinChallenge);\nuserRouter.post("/unjoin", authenticateToken, unjoinChallenge);\nuserRouter.get("/user/challenges", authenticateToken, getUserChallenges);\nuserRouter.get("/user/:userId/notifications", authenticateToken, getUserNotifications);\nuserRouter.get("/users/stats", authenticateToken, getUserStats);\nuserRouter.post("/review/create", authenticateToken, createReview);\nuserRouter.get("/reviews/:id", authenticateToken, getReviews);\nuserRouter.get("/user/ban/:id", authenticateToken, banUser);\nuserRouter.post("/create", authenticateToken, CreateCompany);\nmodule.exports = userRouter;\n\n//# sourceURL=webpack://api/./routes/user.router.js?'
        );

        /***/
      },

    /***/ "./server.js":
      /*!*******************!*\
  !*** ./server.js ***!
  \*******************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval(
          'const express = __webpack_require__(/*! express */ "express");\nconst session = __webpack_require__(/*! express-session */ "express-session");\nconst cors = __webpack_require__(/*! cors */ "cors");\nconst cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");\nconst http = __webpack_require__(/*! http */ "http");\nconst {\n  Server\n} = __webpack_require__(/*! socket.io */ "socket.io");\nconst app = express();\nconst dotenv = __webpack_require__(/*! dotenv */ "dotenv");\nconst connectDB = __webpack_require__(/*! ./config/connectDB */ "./config/connectDB.js"); //connect to the database\nconst createAdminUser = __webpack_require__(/*! ./config/adminUser */ "./config/adminUser.js"); //create the admin user\nconst {\n  sendNotificationEmail\n} = __webpack_require__(/*! ./middlewares/mail.middleware */ "./middlewares/mail.middleware.js");\nconst User = __webpack_require__(/*! ./models/user.model */ "./models/user.model.js");\nconst swaggerRouter = __webpack_require__(/*! ./routes/swagger.router */ "./routes/swagger.router.js");\napp.use(session({\n  secret: "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",\n  // set your secret key\n  resave: false,\n  saveUninitialized: false\n}));\n///login with google\nconst passportSetup = __webpack_require__(/*! ./config/passport */ "./config/passport.js");\nconst passport = __webpack_require__(/*! passport */ "passport");\ndotenv.config();\napp.use(express.json());\napp.use(cookieParser());\napp.use(cors({\n  origin: "http://localhost:3000",\n  credentials: true\n}));\nconnectDB();\napp.use(passport.initialize());\n//app routes\nconst indexRouter = __webpack_require__(/*! ./routes/index.router */ "./routes/index.router.js"); //the routes of all the project\napp.use("/docs", swaggerRouter);\napp.use("/", indexRouter);\nconst PORT = process.env.PORT || 5000;\ncreateAdminUser();\n\n//server running\nconst server = http.createServer(app);\nconst io = new Server(server);\nio.on("connection", client => {\n  console.log("socket is connected");\n});\nserver.listen(PORT, error => {\n  if (error) throw console.error(error);\n  console.log("Server is listening on port" + " " + PORT);\n});\n\n//# sourceURL=webpack://api/./server.js?'
        );

        /***/
      },

    /***/ "./tensorflow/anotherz.js":
      /*!********************************!*\
  !*** ./tensorflow/anotherz.js ***!
  \********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");\nconst csv = __webpack_require__(/*! csvtojson */ "csvtojson");\n__webpack_require__(/*! tfjs-node-save */ "tfjs-node-save");\nconst fs = __webpack_require__(/*! fs */ "fs");\nconst numPredictions = 3;\nconst predictions = [];\nasync function sortappliers(users) {\n  // Load and preprocess data\n  const data = await csv().fromFile("./tensorflow/Data.csv");\n  const inputs = data.map(d => [parseFloat(d["Years Registered"]), parseFloat(d["Challenges Done"])]);\n  console.log(inputs);\n  const labels = data.map(d => parseFloat(d["Job Fit Score"]));\n  const inputTensor = tf.tensor2d(inputs);\n  const inputMin = inputTensor.min(0);\n  const inputMax = inputTensor.max(0);\n  const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));\n  const labelTensor = tf.tensor1d(labels);\n\n  // Define and train the model\n  const predictions = await Promise.all(users.map(async (user, index) => {\n    let predictionssum = 0;\n    for (let i = 0; i < numPredictions; i++) {\n      const model = tf.sequential();\n      model.add(tf.layers.dense({\n        units: 1,\n        inputShape: [2]\n      }));\n      model.compile({\n        loss: "meanSquaredError",\n        optimizer: "sgd"\n      });\n      await model.fit(normalizedInputs, labelTensor, {\n        epochs: 100\n      });\n\n      // Use the model to make predictions\n\n      const prediction = model.predict(tf.tensor2d([[user.yearsRegistered, user.challengesDone]]));\n      predictionssum = predictionssum + prediction.dataSync()[0];\n    }\n    console.log(`Predicted job score: ${index}  ${predictionssum}`);\n    return {\n      ...user.toObject(),\n      jobScore: predictionssum\n    };\n  }));\n  // Sort users by job score\n  const sortedPredictions = predictions.sort((a, b) => b.jobScore - a.jobScore);\n  console.log("test", sortedPredictions);\n  return sortedPredictions;\n}\nmodule.exports = {\n  sortappliers\n};\n\n//# sourceURL=webpack://api/./tensorflow/anotherz.js?'
        );

        /***/
      },

    /***/ "./utils/utilities.js":
      /*!****************************!*\
  !*** ./utils/utilities.js ***!
  \****************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const badgeSchema = __webpack_require__(/*! ../models/BadgeType.model */ "./models/BadgeType.model.js");\nconst updateUserChallengesBadges = async User => {\n  const addedBadges = [];\n  const firstChallengeBadge = await badgeSchema.findOne({\n    badgeName: "Won a challenge"\n  });\n  addedBadges.push(firstChallengeBadge);\n  if (User.challengesWon >= 5) {\n    const secondChallengeBadge = await badgeSchema.findOne({\n      badgeName: "Won five challenge"\n    });\n    addedBadges.push(secondChallengeBadge);\n  }\n  if (User.challengesWon >= 20) {\n    const thirdChallengeBadge = await badgeSchema.findOne({\n      badgeName: "Won twenty challenges"\n    });\n    addedBadges.push(thirdChallengeBadge);\n  }\n  addedBadges.forEach(badge => {\n    if (!User.badgesEarned.includes(badge._id)) {\n      User.badgesEarned.push(badge._id);\n    }\n  });\n};\nconst updateUserSubmissionsBadges = async User => {\n  const addedBadges = [];\n  const firstChallengeBadge = await badgeSchema.findOne({\n    badgeName: "Completed a challenge"\n  });\n  addedBadges.push(firstChallengeBadge);\n  if (User.submissions.length >= 10) {\n    const secondChallengeBadge = await badgeSchema.findOne({\n      badgeName: "Completed 10 challenges"\n    });\n    addedBadges.push(secondChallengeBadge);\n  }\n  if (User.submissions.length >= 50) {\n    const thirdChallengeBadge = await badgeSchema.findOne({\n      badgeName: "Completed 50 challenges"\n    });\n    addedBadges.push(thirdChallengeBadge);\n  }\n  addedBadges.forEach(badge => {\n    if (badge) {\n      if (!User.badgesEarned.includes(badge._id)) {\n        User.badgesEarned.push(badge._id);\n      }\n    }\n  });\n};\nmodule.exports = {\n  updateUserChallengesBadges,\n  updateUserSubmissionsBadges\n};\n\n//# sourceURL=webpack://api/./utils/utilities.js?'
        );

        /***/
      },

    /***/ "./validators/challenge.validators.js":
      /*!********************************************!*\
  !*** ./validators/challenge.validators.js ***!
  \********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const yup = __webpack_require__(/*! yup */ "yup");\nconst challengeSchemaValidator = yup.object().shape({\n  title: yup.string().required("Title is required"),\n  description: yup.string().required("Description is required"),\n  category: yup.string().required("Category is required"),\n  price: yup.number("").typeError("Price must be a number").required("Price is required").positive("Price must be a positive number"),\n  deadline: yup.date(),\n  RecommendedSkills: yup.array().of(yup.string())\n});\nmodule.exports = {\n  challengeSchemaValidator\n};\n\n//# sourceURL=webpack://api/./validators/challenge.validators.js?'
        );

        /***/
      },

    /***/ "./validators/company.auth.validators.js":
      /*!***********************************************!*\
  !*** ./validators/company.auth.validators.js ***!
  \***********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          '//used to validate user input\nconst yup = __webpack_require__(/*! yup */ "yup");\nconst companyRegisterValidator = yup.object().shape({\n  firstname: yup.string().required("First name is required").matches(/^[a-zA-Z]+$/, "First name must only contain letters"),\n  lastname: yup.string().required("Last name is required").matches(/^[a-zA-Z]+$/, "Last name must only contain letters"),\n  companyName: yup.string().required("companyName is required"),\n  password: yup.string().required().max(1024).min(6, "Password must be at least 6 characters long"),\n  email: yup.string().email("Email must be a valid email address").required(),\n  role: yup.string().required("role is required")\n});\nconst companyEditProfileValidator = yup.object().shape({\n  companyName: yup.string().matches(/^[a-zA-Z]+$/, "First name must only contain letters"),\n  password: yup.string().min(8, "Password must be at least 8 characters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),\n  email: yup.string().email("Email must be a valid email address"),\n  phoneNumber: yup.string().matches(/^\\+?\\d{1,14}$/, "Phone number must start with a \'+\' and have a maximum of 14 characters"),\n  country: yup.string(),\n  dateoffoundation: yup.string(),\n  picturePath: yup.string()\n});\nmodule.exports = {\n  companyRegisterValidator,\n  companyEditProfileValidator\n};\n\n//# sourceURL=webpack://api/./validators/company.auth.validators.js?'
        );

        /***/
      },

    /***/ "./validators/user.auth.validators.js":
      /*!********************************************!*\
  !*** ./validators/user.auth.validators.js ***!
  \********************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          '//used to validate user input\nconst yup = __webpack_require__(/*! yup */ "yup");\nconst userRegisterValidator = yup.object().shape({\n  firstname: yup.string().required("First name is required").matches(/^[a-zA-Z]+$/, "First name must only contain letters"),\n  lastname: yup.string().required("Last name is required").matches(/^[a-zA-Z]+$/, "Last name must only contain letters"),\n  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),\n  email: yup.string().email("Email must be a valid email address").required("Email is required"),\n  country: yup.string().required("country must be a valid field"),\n  role: yup.string().required("Role is required")\n});\nconst userEditProfileValidator = yup.object().shape({\n  firstname: yup.string().matches(/^[a-zA-Z]+$/, "First name must only contain letters"),\n  lastname: yup.string().matches(/^[a-zA-Z]+$/, "Last name must only contain letters"),\n  password: yup.string().min(8, "Password must be at least 8 characters long").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),\n  email: yup.string().email("Email must be a valid email address"),\n  phoneNumber: yup.string().matches(/^\\+?\\d{1,14}$/, "Phone number must start with a \'+\' and have a maximum of 14 characters"),\n  country: yup.string(),\n  birthDate: yup.date(),\n  picturePath: yup.string(),\n  gender: yup.string()\n});\nconst loginValidator = yup.object().shape({\n  email: yup.string().email("Invalid email address.").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i, "email must be valid").required("Email is required."),\n  password: yup.string().required().max(1024, "Password must be at most 1024 characters long.").min(6, "Password must be at least 6 characters long."),\n  rememberMe: yup.boolean()\n});\nconst forgotPasswordValidator = yup.object().shape({\n  email: yup.string().email("Must be a valid email address").required()\n});\nconst resetPasswordValidator = yup.object().shape({\n  newPassword: yup.string().min(6, "Password must be at least 6 characters long").required()\n});\nmodule.exports = {\n  userRegisterValidator,\n  loginValidator,\n  forgotPasswordValidator,\n  resetPasswordValidator,\n  userEditProfileValidator\n};\n\n//# sourceURL=webpack://api/./validators/user.auth.validators.js?'
        );

        /***/
      },

    /***/ "@tensorflow/tfjs":
      /*!***********************************!*\
  !*** external "@tensorflow/tfjs" ***!
  \***********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("@tensorflow/tfjs");

        /***/
      },

    /***/ axios:
      /*!************************!*\
  !*** external "axios" ***!
  \************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("axios");

        /***/
      },

    /***/ bcryptjs:
      /*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("bcryptjs");

        /***/
      },

    /***/ "body-parser":
      /*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("body-parser");

        /***/
      },

    /***/ "cookie-parser":
      /*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("cookie-parser");

        /***/
      },

    /***/ cors:
      /*!***********************!*\
  !*** external "cors" ***!
  \***********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("cors");

        /***/
      },

    /***/ csvtojson:
      /*!****************************!*\
  !*** external "csvtojson" ***!
  \****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("csvtojson");

        /***/
      },

    /***/ dotenv:
      /*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("dotenv");

        /***/
      },

    /***/ express:
      /*!**************************!*\
  !*** external "express" ***!
  \**************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("express");

        /***/
      },

    /***/ "express-session":
      /*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("express-session");

        /***/
      },

    /***/ jsonwebtoken:
      /*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("jsonwebtoken");

        /***/
      },

    /***/ lodash:
      /*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("lodash");

        /***/
      },

    /***/ moment:
      /*!*************************!*\
  !*** external "moment" ***!
  \*************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("moment");

        /***/
      },

    /***/ mongoose:
      /*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("mongoose");

        /***/
      },

    /***/ nodemailer:
      /*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("nodemailer");

        /***/
      },

    /***/ passport:
      /*!***************************!*\
  !*** external "passport" ***!
  \***************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("passport");

        /***/
      },

    /***/ "passport-google-oauth20":
      /*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("passport-google-oauth20");

        /***/
      },

    /***/ "socket.io":
      /*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("socket.io");

        /***/
      },

    /***/ stripe:
      /*!*************************!*\
  !*** external "stripe" ***!
  \*************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("stripe");

        /***/
      },

    /***/ "swagger-jsdoc":
      /*!********************************!*\
  !*** external "swagger-jsdoc" ***!
  \********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("swagger-jsdoc");

        /***/
      },

    /***/ "swagger-ui-express":
      /*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("swagger-ui-express");

        /***/
      },

    /***/ "tfjs-node-save":
      /*!*********************************!*\
  !*** external "tfjs-node-save" ***!
  \*********************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("tfjs-node-save");

        /***/
      },

    /***/ yup:
      /*!**********************!*\
  !*** external "yup" ***!
  \**********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("yup");

        /***/
      },

    /***/ fs:
      /*!*********************!*\
  !*** external "fs" ***!
  \*********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("fs");

        /***/
      },

    /***/ http:
      /*!***********************!*\
  !*** external "http" ***!
  \***********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("http");

        /***/
      },

    /***/ path:
      /*!***********************!*\
  !*** external "path" ***!
  \***********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("path");

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__("./server.js");
  /******/
  /******/
})();
