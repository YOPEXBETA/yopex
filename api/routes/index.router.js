const express = require("express");
const router = express.Router();
// ==============================|| Imported routes ||============================== //
const authRouter = require("./auth.user.router");
const userRouter = require("./user.router");
const swaggerRouter = require("./swagger.router");
const adminRouter = require("./admin.router");
const PostsRouter = require("./Posts.router");
const ChallengeRouter = require("./Challenge.router");
const companyRouter = require("./Organization.router");
const jobRouter = require("./job.router");
const conversationRouter = require("./conversation.router");
const MessageRouter = require("./messages.router");
const stripeRouter = require("./stripe.router");
const BadgeTypeRouter = require("./BadgeType.router");
const CategoryRouter = require("./Category.router");
const CommentRouter = require("./comment.router");
const payementRouter = require("./payment.router");
const skillRouter = require("./skill.router");
const contestConversationRouter = require("./contestConversation.router");
const FirebaseRouter = require("./firebase.router");
const ExperienceRouter = require("./experience.router");
const EducationRouter = require("./education.router");
const levelRouter = require("./level.router");
const roleRouter = require("./OrganizationRole.router");
const sectorRouter = require("./sector.router");
const OccupationRouter = require("./occupation.router");
const TeamChallengeRouter = require("./teamChallenge.router");
const TeamRouter = require("./team.router");

router.use("/job", jobRouter);
router.use("/auth", authRouter);
router.use("/", userRouter);
router.use("/company", companyRouter);
router.use("/api-docs", swaggerRouter);
router.use("/admin", adminRouter);
router.use("/post", PostsRouter);
router.use("/challenge", ChallengeRouter);
router.use("/conversation", conversationRouter);
router.use("/messages", MessageRouter);
router.use("/stripe", stripeRouter);
router.use("/badgeType", BadgeTypeRouter);
router.use("/category", CategoryRouter);
router.use("/comment", CommentRouter);
router.use("/api", payementRouter);
router.use("/skill", skillRouter);
router.use("/contestconversation", contestConversationRouter);
router.use("/firebase", FirebaseRouter);
router.use("/experience", ExperienceRouter);
router.use("/education", EducationRouter);
router.use("/level", levelRouter);
router.use("/oganizationRole", roleRouter);
router.use("/sector", sectorRouter);
router.use("/occupation", OccupationRouter);
router.use("/teamChallenge", TeamChallengeRouter)
router.use("/team", TeamRouter)



module.exports = router;
