const express = require("express");
const CategoryRouter = express.Router();
const { isAdmin } = require("../middlewares/isAdmin.middleware");

const {
  createskill,
  deleteskill,
  getSkills,
  updateskill,
} = require("../controllers/skills.controller");

CategoryRouter.post("/addskill", isAdmin, createskill);
CategoryRouter.get("/getskills", getSkills);
CategoryRouter.put("/updateskill/:id", isAdmin, updateskill);
CategoryRouter.delete("/deleteskill/:name", isAdmin, deleteskill);

module.exports = CategoryRouter;
