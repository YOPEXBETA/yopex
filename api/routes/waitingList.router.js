const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");


const { addWaitingList,addUserToWaitingList, getWaitingList, removeUserFromWaitingList } = require("../controllers/waitingList.controllers");


router.get("/waitingLists", getWaitingList);
router.post("/add", addWaitingList);
router.patch("/addUser", authenticateToken, addUserToWaitingList);
router.delete(":waitingListId/delete/:userId", removeUserFromWaitingList);



module.exports = router;
