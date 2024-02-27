const ConversationModel = require("../models/Conversation.model");
const MessageModel = require("../models/Message.model");
const Company = require("../models/company.model");
const UserModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId, company } = req.body;

    if (senderId === receiverId) {
      throw new Error("Cannot create conversation with yourself");
    }

    const existingConversation = await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] },
      company,
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    const newCoversation = new ConversationModel({
      company,
      members: [senderId, receiverId],
    });
    await newCoversation.save();
    const userId = req.body.senderId;
    // const conversations = await ConversationModel.find({
    //   members: { $in: [userId] },
    // }).select("_id members");

    // // Get the user details for each member of the conversation
    // const conversationsWithUsers = await Promise.all(
    //   conversations.map(async (conversation) => {
    //     const membersWithDetails = await Promise.all(
    //       conversation.members.map(async (member) => {
    //         const user = await UserModel.findById(member);
    //        if (user){
    //         if (user._id.toString() !== userId) {
    //           return {
    //             id: user._id,
    //             firstname: user.firstname,
    //             lastname: user.lastname,
    //             picturePath: user.picturePath,
    //           };
    //         }
    //        }else{
    //           const company = await Company.findById(member);
              
    //           if (company._id.toString() !== userId) {
                
    //             return {
    //               id: company._id,
    //               companyName: company.companyName,
    //               picturePath: company.companyLogo,
    //             };
    //           }
    //        }
    //       })
    //     );
    //     // Remove any undefined members from the array
    //     const filteredMembers = membersWithDetails.filter(Boolean);

    //     // Get the latest message for the conversation
    //     const latestMessage = await MessageModel.findOne({
    //       conversationId: conversation._id,
    //     })
    //       .sort({ createdAt: -1 })
    //       .populate("sender", "firstname lastname picturePath")
    //       .lean();

    //     // Set the latestMessage property for the member who is not the user
    //     filteredMembers.forEach((member) => {
    //       if (member.id.toString() !== userId && latestMessage) {
    //         member.latestMessage = latestMessage.message;
    //         member.createdAt = latestMessage.createdAt;
    //       }
    //     });

    //     return {
    //       conversationId: conversation._id,
    //       members: filteredMembers,
    //     };
    //   }),
    // );
    res.status(200).json(newCoversation);
  } catch (error) {
    console.log(error, "Error");
    res.status(400).send(error.message);
  }
};

const getConversations = async (req, res) => {
  try {
    
    const userId = req.userId;
    
    const conversations = await ConversationModel.find({
      members: { $in: [userId] },
    }).select("_id members company");

    // Get the user details for each member of the conversation
    const conversationsWithUsers = await Promise.all(
      conversations.map(async (conversation) => {
        const membersWithDetails = await Promise.all(
          conversation.members.map(async (member) => {
            if (conversation.company) {
              const user = await UserModel.findById(member);
              const company = await Company.findById(conversation.company);
              if (company.user.toString()===userId){
                if (user && user._id.toString() !== userId) {
                  return {
                    role: "user",
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    companyName: company.companyName,
                    picturePath: user.picturePath,
                    companyLogo: company.companyLogo
                  };
                }else{
                  return {
                    role: "company",
                    id: conversation.company,
                    firstname: company.companyName,
                    lastname: "",
                    picturePath: company.companyLogo,
                  };
                }
              }else{
                if (user && user._id.toString() !== userId) {
                  return {
                    role: "user",
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    picturePath: user.picturePath,
                  };
                }else{
                  return {
                    role: "company",
                    id: conversation.company,
                    firstname: company.companyName,
                    lastname: "",
                    picturePath: company.companyLogo,
                  };
                }
            }
            } else {
              const user = await UserModel.findById(member);
              // Only include the other user in the conversation
              if (user && user._id.toString() !== userId) {
                return {
                  role: "user",
                  id: user._id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  picturePath: user.picturePath,
                };
              }
            }
          })
        );
        
        // Remove any undefined members from the array
        const filteredMembers = membersWithDetails.filter(Boolean);

        // Get the latest message for the conversation
        const latestMessage = await MessageModel.findOne({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .populate("sender", "firstname lastname picturePath")
          .lean();

        // Set the latestMessage property for the member who is not the user
        filteredMembers.forEach((member) => {
          if (member.id.toString() !== userId && latestMessage) {
            member.latestMessage = latestMessage.message;
            member.createdAt = latestMessage.createdAt;
          }
        });

        return {
          conversationId: conversation._id,
          members: filteredMembers,
        };
      }),
    );

    res.status(200).json(conversationsWithUsers);
  } catch (error) {
    console.log(error, "Error");
    res.status(500).json({ error: error.message });
  }
};

const getConversationById = async (req, res) => {
  try { 
    
    const conversationId = new ObjectId(req.params.id);
    const userId = req.userId;
    const conversation = await ConversationModel.findById(conversationId).populate("members", "firstname lastname role picturePath userDescription phoneNumber email")
    .populate("company","companyLogo companyName companyDescription PhoneNumber user").lean();
    conversation.members = conversation.members.filter(member => member._id.toString() !== userId);
    res.status(200).json(conversation);
  } catch (error) {
    console.log(error, "Error");
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  createConversation,
  getConversations,
  getConversationById
};
