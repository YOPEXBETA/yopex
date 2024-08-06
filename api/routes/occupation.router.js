const {isAdmin} = require("../middlewares/isAdmin.middleware");
const express = require("express");
const {} = require("../controllers/Occupation.controller");
const OccupationRouter = express.Router();
const {createOccupation, getOccupations, updateOccupation, deleteOccupation} = require("../controllers/Occupation.controller");

OccupationRouter.post("/createOccupation", isAdmin, createOccupation);
OccupationRouter.get("/getOccupations", getOccupations);
OccupationRouter.put("/updateOccupation/:id", isAdmin, updateOccupation);
OccupationRouter.delete("/deleteOccupation/:name", isAdmin, deleteOccupation);

module.exports = OccupationRouter;
