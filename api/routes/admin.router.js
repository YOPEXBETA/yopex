const express = require("express");
const adminRouter = express.Router();

const { isAdmin } = require("../middlewares/isAdmin.middleware");
const {
  addUser,
  getUsers,
  updUser,
  delUser,
  disableUser,
  activateUser,
  banUser,
  getCompanies,
  approveCompany,
} = require("../controllers/admin.controllers");
const {
  getLevels,
  deleteLevel,
  createLevel,
  editLevel,
} = require("../controllers/levels.controller");

adminRouter.post("/createLevel",isAdmin, createLevel);
adminRouter.put("/updateLevel/:id",isAdmin, editLevel);
adminRouter.get("/allLevels",  getLevels);
adminRouter.delete("/delLevel/:id", isAdmin, deleteLevel);
adminRouter.get("/Users", isAdmin, getUsers);
adminRouter.get("/Companies", getCompanies);
adminRouter.post("/addUser", addUser);
adminRouter.put("/updUsers/:id", isAdmin, updUser);
adminRouter.delete("/delUsers/:id", isAdmin, delUser);

adminRouter.put("/users/:id/activate", isAdmin, activateUser);
adminRouter.put("/users/:id/disable", isAdmin, disableUser);
adminRouter.put("/users/:id/ban", isAdmin, banUser);

adminRouter.put("/users/:id/:action", isAdmin, disableUser);
adminRouter.post("/appCompany", isAdmin, approveCompany);

module.exports = adminRouter;
