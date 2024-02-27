const ConversationModel = require("../models/Conversation.model");
const MessageModel = require("../models/Message.model");

const createMessage = async (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ error: "Message cannot be empty" });
  }
  console.log(req.userId == req.body.sender);
  if (req.userId != req.body.sender) {
    return res.status(401).json({ error: "Not authorized" });
  }
  const newMessage = new MessageModel(req.body);
  console.log(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessages = async (req, res) => {
  try {
    const conversation = await ConversationModel.findById(req.params.conversationId)
      .populate("company", "user companyLogo");
    if (!conversation.members.includes(req.userId)) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    })
      .populate("sender", "firstname picturePath") // join sender information
      .exec();

    const ownerUserId = conversation.company?.user.toString() || ""; // Get the owner user ID

    const messagesWithDetails =  messages.map((message) => {
      let senderDetails = {
        _id: message.sender._id,
        firstname: message.sender.firstname,
        picturePath: message.sender.picturePath,
      };
      
      // Check if the sender is the owner of the company
      if (ownerUserId && message.sender._id.toString() === ownerUserId) {
        
        senderDetails["picturePath"] = conversation.company.companyLogo;
      }

      return {
        _id: message._id,
        sender: senderDetails,
        
        message: message.message,
        createdAt: message.createdAt,
      };
    });

    res.status(200).json(messagesWithDetails);
  } catch (err) {
    res.status(400).json();
  }
};

const getContestMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    })
      .populate("sender", "firstname picturePath") // join sender information
      .exec();

    // map messages to include sender and receiver information

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createMessage,
  getMessages,
  getContestMessages
};
