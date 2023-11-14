const express = require('express');
const ExperienceRouter = express.Router();


const {
    authenticateToken,
  } = require("../middlewares/authenticateToken.middleware");

const {
    addExperience,
    getUserExperience,
    updateExperience,
    deleteExperience,
    getExperienceById,
} = require("../controllers/experience.controllers");

ExperienceRouter.post("/add", authenticateToken, addExperience);
ExperienceRouter.get("/get/:userId", getUserExperience);
ExperienceRouter.put("/update/:id", authenticateToken, updateExperience);
ExperienceRouter.delete("/delete/:id", authenticateToken, deleteExperience);
ExperienceRouter.get("/getexperiencebyId/:id", getExperienceById);

module.exports = ExperienceRouter;


