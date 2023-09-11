const ContestConversationModel = require("../models/ContestConversation.model");
const MessageModel = require("../models/Message.model");
const Company = require("../models/company.model");
const UserModel = require("../models/user.model");

const createConversation = async (req, res) => {
  try {
    const { contestId} = req.body;


    const newCoversation = new ContestConversationModel({
      contestId,
    });
    await newCoversation.save();

    res.status(200).json(newCoversation);
  } catch (error) {
    console.log(error, "Error");
    res.status(400).send(error.message);
  }
};

const joinConversation = async (req, res) => {
  try {
    const { contestId, userId } = req.body;
    console.log(contestId, userId);
    const conversation = await ContestConversationModel.findOne({ contestId: contestId});
    if (conversation) {
        if (conversation.members.includes(userId)){
          return res.status(400).json({ message: "User already joined" });
        }
      conversation.members.push(userId);
      await conversation.save();
      res.status(200).json(conversation);
    } else {
      return res.status(400).json({ message: "Conversation not found" });
    }
  } catch (error) {
    console.log(error, "Error");
    res.status(400).send(error.message);
  }
};

const getConversation = async (req, res) => {
  try {
    const { contestId } = req.params;
    const conversations = await ContestConversationModel.findOne({ contestId: contestId });
    res.status(200).json({id:conversations._id});
  } catch (error) {
    console.log(error, "Error");
    res.status(400).send(error.message);
  }
}


module.exports = {
  createConversation,
  joinConversation,
  getConversation
};
