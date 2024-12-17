const WaitingList = require('../models/waitingListPage.model');


const getWaitingList = async (req, res) => {
  try {
    const populatedWaitingLists = await WaitingList.find().populate('users');
    res.status(200).json(populatedWaitingLists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching waiting list", error });
  }
};


// Add a new waiting list
const addWaitingList = async (req, res) => {
  try {
    const { users } = req.body;

    const newWaitingList = new WaitingList({ users });
    const savedList = await newWaitingList.save();

    res.status(201).json({ message: "Waiting list added successfully", savedList });
  } catch (error) {
    res.status(500).json({ message: "Error adding waiting list", error });
  }
};

// Add user to an existingh waiting list
const addUserToWaitingList = async (req, res) => {
  try {
    const { waitingListId, userId } = req.body;

    const updatedWaitingList = await WaitingList.findByIdAndUpdate(
      waitingListId,
      { $push: { users: userId } },
      { new: true }
    );

    if (!updatedWaitingList) {
      return res.status(404).json({ message: "Waiting list not found" });
    }

    res.status(200).json({ message: "User added to waiting list", updatedWaitingList });
  } catch (error) {
    res.status(500).json({ message: "Error adding user to waiting list", error });
  }
};

const removeUserFromWaitingList = async (req, res) => {
  try {
    const { waitingListId, userId } = req.params;


    const waitingList = await WaitingList.findById(waitingListId);
    if (!waitingList) {
      return res.status(404).json({ message: "Waiting list not found" });
    }


    waitingList.users = waitingList.users.filter(user => user.toString() !== userId);

    await waitingList.save();
    res.status(200).json({ message: "User removed from waiting list", waitingList });
  } catch (error) {
    res.status(500).json({ message: "Error removing user from waiting list", error });
  }
};


module.exports = { addWaitingList, addUserToWaitingList, getWaitingList, removeUserFromWaitingList };
