const axios = require("axios");
const TeamChallengeModel = require("../models/TeamChallenge.model");
const ContestConversationModel = require("../models/ContestConversation.model");
const OrganizationModel = require("../models/Organization.model");
const UserModel = require("../models/user.model");
const Skill = require("../models/skill.model");
const Category = require("../models/Category.model");
const submissionModel = require("../models/submission.model");
const notificationModel = require("../models/notification.model");
const Team = require("../models/team.model");
const ChallengeModel = require("../models/Challenge.model");

const CreateTeamChallenge = async (req, res) => {
    try {
        const {
            title,
            description,
            categories,
            price,
            picturePath,
            organizationId,
            deadline,
            skills,
            teamSize,
            paid,
            youtubeLink,
            objective,
        } = req.body;

        const userId = req.userId;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const organization = organizationId ? await OrganizationModel.findById(organizationId) : null;

        if (organizationId && !organization) {
            return res.status(400).json({ error: "Organization not found" });
        }

        if (youtubeLink) {
            const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
            if (!youtubeRegex.test(youtubeLink)) {
                return res.status(400).json({ message: "Invalid YouTube link" });
            }
        }

        const teamChallenge = new TeamChallengeModel({
            title,
            description,
            categories,
            deadline,
            picturePath,
            price: paid ? price : 0,
            skills,
            teamSize,
            YoutubeLink: youtubeLink,
            paid,
            verified: !paid,
            objective,
            organization: organizationId ? organization._id : undefined,
            owner: user._id,
        });

        await teamChallenge.save();

        const newConversation = new ContestConversationModel({ contestId: teamChallenge._id });
        await newConversation.save();

        if (organizationId) {
            organization.teamChallenges.push(teamChallenge._id);
            await organization.save();
        } else {
            user.createdTeamChallenge.push(teamChallenge._id);
            await user.save();
        }

        if (paid) {
            const url =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:8000/api/payment"
                    : "https://yopexhub.com/api/payment";

            const response = await axios.post(
                url,
                {
                    amount: price * 1000,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    email: user.email,
                    challengeId: teamChallenge._id,
                },
                {
                    headers: {
                        Authorization: "token " + req.token,
                    },
                }
            );

            return res.status(200).json(response.data.payUrl);
        }

        res.status(201).json({ message: "Team Challenge created successfully", teamChallenge });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Failed to create Team Challenge: ${error.message}` });
    }
};


const getTeamChallengeById = async (req, res) => {
    const challengeId = req.params.teamChallengeId;
    try {
        const challenge = await TeamChallengeModel.findById(challengeId)
            .populate("organization")
            .populate("owner", "firstname lastname picturePath _id")
            .populate("skills", "name _id")
            .populate("categories", "name _id")
            .populate({
                path: "banned",
                select: "name teamPicture _id",
            })
            .populate({
                path: "teams",
                populate: {
                    path: "team",
                    select: "name teamPicture _id",
                },
            });

        const ChallengeTeams = challenge.teams.sort((a, b) => {
            return b.star - a.star;
        });
        challenge.teams = ChallengeTeams;

        if (!challenge) {
            return res.status(404).json({ message: "Team Challenge not found" });
        }

        res.status(200).json(challenge);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTeamChallenge = async (req, res) => {
    try {
        const challenge = await TeamChallengeModel.findOneAndDelete({
            _id: req.params.teamChallengeId,
        });
        if (challenge.organization) {
            const organization = await OrganizationModel.findOne({ _id: challenge.organization });
            await organization.teamChallenges.pull(challenge._id);
            await organization.save();
        } else {
            const User = await UserModel.findOne({ _id: challenge.owner });
            await User.createdTeamChallenge.pull(challenge._id);
            await User.save();
        }

        const message = "Team Challenge has been deleted";
        res.status(200).send({ challenge, message });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOrganizationTeamChallenges = async (req, res) => {
    const q = req.query;
    const organizationId = req.params.organizationId;
    const filters = {
        organization: organizationId,
        verified: true,
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $gte: parseFloat(q.min) }),
                ...(q.max && { $lte: parseFloat(q.max) }),
            },
        }),
        ...(q.categories && {
            categories: {
                $in: (await Category.find({ name: { $in: q.categories.split(",") } })).map(
                    (category) => category._id
                ),
            },
        }),
        ...(q.skills && {
            skills: {
                $in: (await Skill.find({ name: { $in: q.skills.split(",") } })).map(
                    (skill) => skill._id
                ),
            },
        }),
    };

    try {
        const challenges = await TeamChallengeModel.find(filters)
            .populate("organization")
            .populate("skills")
            .populate("categories");

        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({ error: `Failed to retrieve team challenges: ${err.message}` });
    }
};

const getAllTeamChallenges = async (req, res) => {
    const q = req.query;

    const filters = {
        verified: true,
        ...(q.userId && { userId: q.userId }),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $gte: q.min }),
                ...(q.max && { $lte: q.max }),
            },
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
        ...(q.categories && {
            categories: {
                $in: (await Category.find({ name: { $in: q.categories } })).map(
                    (category) => category._id
                ),
            },
        }),
        ...(q.skills && {
            skills: {
                $in: (await Skill.find({ name: { $in: q.skills } })).map(
                    (skill) => skill._id
                ),
            },
        }),
    };

    try {
        const ChallengePosts = await TeamChallengeModel.find(filters)
            .populate("organization")
            .populate("skills")
            .populate("categories");

        res.status(200).json(ChallengePosts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTeamChallengeTeams = async (req, res) => {
    try {
        const idChallenge = req.query.idChallenge;
        const ChallengePost = await TeamChallengeModel.findById(idChallenge).populate({
            path: "teams",
            populate: {
                path: "team",
                select: "name teamPicture _id",
            },
        });
        const ChallengeTeams = ChallengePost.teams.sort((a, b) => {
            return b.star - a.star;
        });
        res.status(200).json(ChallengeTeams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTeamChallengeTeamSubmit = async (req, res) => {
    try {
        const challengeId = req.query.challengeId;
        const challenge = await TeamChallengeModel.findById(challengeId);
        const teamId = req.query.teamId;

        const submit = await submissionModel.findOne({
            challengeId: challengeId,
            teamId: teamId,
        });

        res.status(200).json(submit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateTeamChallenge = async (req, res) => {
    const { description, title, teamSize, price, categories, skills } = req.body;
    const challengeId = req.params.teamChallengeId;
console.log('data', req.body)
    console.log('challengeId', challengeId)

    try {
        const Challenge = await TeamChallengeModel.findByIdAndUpdate(challengeId, {
            title,
            description,
            teamSize,
            price,
            categories: categories.map((cat) => cat.value),
            skills: skills.map((skill) => skill.value),
        }, { new: true });

        res.status(200).json({ message: "Team Challenge updated successfully", Challenge });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const banTeam = async (req, res) => {
    try {
        const teamChallengeId = req.params.teamChallengeId;
        const { teamId } = req.body;
        const owner = req.userId;
        const challenge = await TeamChallengeModel.findById(teamChallengeId);
        const user = await UserModel.findById(owner);
        const team = await Team.findById(teamId);
        if (
            challenge.owner?.toString() !== owner.toString() &&
            !user.organizations.includes(challenge.organization.toString())
        ) {
            return res.status(400).json({ message: "Not authorized" });
        }
        challenge.banned.push(teamId);
        challenge.teams = challenge.teams.filter(
            (team) => team.team.toString() !== teamId.toString()
        );
        await challenge.save();
        const notification = new notificationModel({
            type: 'challengeTeam',
            message: `Your team ${team.name} have been banned from ${challenge.title}`,
            picture: team.teamPicture,
            user: team.teamLeader,
            team: team._id,
            teamChallenge: teamChallengeId
        });
        await notification.save();

        res.status(200).json({ message: "Team banned" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const unbanTeam = async (req, res) => {
    try {
        const teamChallengeId = req.params.teamChallengeId;
        const { teamId } = req.body;
        const owner = req.userId;
        const challenge = await TeamChallengeModel.findById(teamChallengeId);
        const user = await UserModel.findById(owner);
        const team = await Team.findById(teamId);
        if (
            challenge.owner?.toString() !== owner.toString() &&
            !user.organizations.includes(challenge.organization.toString())
        ) {
            return res.status(400).json({ message: "Not authorized" });
        }

        challenge.banned = challenge.banned.filter(
            (team) => team.toString() !== teamId.toString()
        );

        challenge.teams.push({
            team: teamId,
            registrationDate: Date.now(),
        });

        await challenge.save();
        const notification = new notificationModel({
            type: 'challengeTeam',
            message: `Your team ${team.name} have been unbanned from ${challenge.title}`,
            picture: team.teamPicture,
            user: team.teamLeader,
            team: team._id,
            teamChallenge: teamChallengeId
        });
        await notification.save();

        res.status(200).json({ message: "Team unbanned" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const startTeamChallenge = async (req, res, next) => {
    try {
        const teamChallengeId = req.params.teamChallengeId;
        const challenge = await TeamChallengeModel.findById(teamChallengeId);
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        if (
            challenge.owner?.toString() !== userId.toString() &&
            !user.organizations.includes(challenge.organization.toString())
        ) {
            return res.status(400).json({ message: "Not authorized" });
        }
        if (challenge.teams.length === 0) {
            return res.status(400).json({ message: "No teams registered" });
        }
        challenge.start = true;
        challenge.deadline = req.body.deadline;
        await challenge.save();
        res.status(200).json({ message: "Challenge started" });
    } catch (err) {
        res.status(400).json({ message: "bad" });
        return console.log(err);
    }
};
module.exports = {
    CreateTeamChallenge,
    getTeamChallengeById,
    deleteTeamChallenge,
    getOrganizationTeamChallenges,
    getAllTeamChallenges,
    getTeamChallengeTeams,
    getTeamChallengeTeamSubmit,
    banTeam,
    unbanTeam,
    updateTeamChallenge,
    startTeamChallenge
};
