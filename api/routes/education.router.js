const express = require("express");
const EducationRouter = express.Router();


//imported controllers
const {
    addEducation,
    updateEducation,
    deleteEducation,
    getEducationByUser
} = require("../controllers/Education.controller");

//imported MiddleWare
const {
    authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

EducationRouter.post("/add", authenticateToken, addEducation);
EducationRouter.put("/update/:id", authenticateToken, updateEducation);
EducationRouter.delete("/delete/:id", authenticateToken, deleteEducation);
EducationRouter.get("/get/:userId", getEducationByUser);

module.exports = EducationRouter;