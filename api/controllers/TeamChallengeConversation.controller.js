const TeamChallenge = require("../models/teamChallenge.model");
const Team = require("../models/team.model");
const TeamChallengeConversation = require("../models/TeamChallengeConversation.model");
const TeamConversation = require("../models/TeamConversation.model");
const ContestConversationModel = require("../models/ContestConversation.model");
const TeamChallengeMessage = require("../models/TeamChallengeMessage.Model");
const TeamMessage = require("../models/TeamMessage.model");

const createTeamChallengeConversation = async (req, res) => {
    try {
        const { teamChallenge } = req.body;

        const newCoversation = new TeamChallengeConversation({
            teamChallenge,
        });
        await newCoversation.save();

        res.status(200).json(newCoversation);
    } catch (error) {
        console.log(error, "Error");
        res.status(400).send(error.message);
    }
};


const joinTeamChallengeConversation = async (req, res) => {
    try {
        const { teamChallenge, userId } = req.body;
        console.log(teamChallenge, userId);
        const conversation = await TeamChallengeConversation.findOne({
            teamChallenge: teamChallenge,
        });
        if (conversation) {
            if (conversation.members.includes(userId)) {
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

const getTeamChallengeConversation = async (req, res) => {
    try {
        const { teamChallenge } = req.params;
        const conversation = await TeamChallengeConversation.findOne({
            teamChallenge: teamChallenge,
        })
            .populate({
                path: 'members',
                select: 'firstname lastname picturePath _id'
            });

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        res.status(200).json(conversation);
    } catch (error) {
        console.log(error, "Error");
        res.status(400).send(error.message);
    }
};




const createTeamConversation = async (req, res) => {
    try {
        const { teamChallenge, team } = req.body;

        const newCoversation = new TeamConversation({
            teamChallenge,
            team
        });
        await newCoversation.save();

        res.status(200).json(newCoversation);
    } catch (error) {
        console.log(error, "Error");
        res.status(400).send(error.message);
    }
};

const joinTeamConversation = async (req, res) => {
    try {
        const { teamChallenge,team, userId } = req.body;
        console.log(teamChallenge, userId);
        const conversation = await TeamConversation.findOne({
            teamChallenge: teamChallenge,
            team: team
        });
        if (conversation) {
            if (conversation.members.includes(userId)) {
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

const getTeamConversation = async (req, res) => {
    try {
        const { teamChallenge, team } = req.params;
        const conversation = await TeamConversation.findOne({
            teamChallenge: teamChallenge,
            team: team
        }).populate({
            path: 'members',
            select: 'firstname lastname picturePath _id'
        });
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.status(200).json(conversation);
    } catch (error) {
        console.log(error, "Error");
        res.status(400).send(error.message);
    }
};


const createTeamChallengeMessage = async (req, res) => {
    if (!req.body.message) {
        return res.status(400).json({ error: "Message cannot be empty" });
    }

    if (req.userId !== req.body.sender) {
        return res.status(401).json({ error: "Not authorized" });
    }
    const newMessage = new TeamChallengeMessage(req.body);

    try {
        const conversation = await TeamChallengeConversation.findById(newMessage.conversationId);
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getTeamChallengeMessages = async (req, res) => {
    try {
        const messages = await TeamChallengeMessage.find({
            conversationId: req.params.conversationId,
        })
            .populate("sender", "firstname picturePath")
            .exec();

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createTeamMessage = async (req, res) => {
    if (!req.body.message) {
        return res.status(400).json({ error: "Message cannot be empty" });
    }

    if (req.userId !== req.body.sender) {
        return res.status(401).json({ error: "Not authorized" });
    }

    const newMessage = new TeamMessage(req.body);

    try {
        const conversation = await TeamConversation.findById(newMessage.conversationId);
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getTeamMessages = async (req, res) => {
    try {
        const messages = await TeamMessage.find({
            conversationId: req.params.conversationId,
        })
            .populate("sender", "firstname picturePath") // join sender information
            .exec();

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
};
module.exports = {
    createTeamChallengeConversation,
    joinTeamChallengeConversation,
    getTeamChallengeConversation,
    createTeamChallengeMessage,
    getTeamChallengeMessages,
    createTeamConversation,
    joinTeamConversation,
    getTeamConversation,
    createTeamMessage,
    getTeamMessages
};