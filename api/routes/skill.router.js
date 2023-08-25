const express = require("express");
const CategoryRouter = express.Router();
const controller = require("../controllers/skills.controller");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

CategoryRouter.post("/addskill",isAdmin, controller.createskill);
CategoryRouter.get("/getskills", controller.getSkills);
CategoryRouter.put("/updateskill/:id", isAdmin, controller.updateskill);
CategoryRouter.delete(
  "/deleteskill/:name",
  isAdmin,
  controller.deleteskill,
);

module.exports = CategoryRouter;
