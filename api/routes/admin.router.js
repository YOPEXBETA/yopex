const express = require("express");
const adminRouter = express.Router();

const { isAdmin } = require("../middlewares/isAdmin.middleware");
const {
  addUser,
  getUsers,
  updUser,
  delUser,
  disableUser,
  BanAccount,
  getCompanies,
  approveCompany,
  
} = require("../controllers/admin.controllers");
const {getLevels, deleteLevel,createLevel} = require ("../controllers/levels.controller");

adminRouter.post("/createLevel",createLevel);
adminRouter.get("/allLevels" , isAdmin, getLevels)
adminRouter.delete("/delLevel/:id",isAdmin, deleteLevel);
adminRouter.get("/Users", isAdmin, getUsers);
adminRouter.get("/Companies", isAdmin, getCompanies);
adminRouter.post("/addUser", addUser);
adminRouter.put("/updUsers/:id", updUser);
adminRouter.delete("/delUsers/:id", delUser);
adminRouter.put("/users/:id/ban", isAdmin, BanAccount);
adminRouter.put("/users/:id/:action", isAdmin, disableUser);
adminRouter.post("/appCompany", approveCompany);

module.exports = adminRouter;
