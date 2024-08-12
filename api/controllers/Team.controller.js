const Team = require("../models/team.model");
const notificationModel = require("../models/notification.model");
const TeamInvitation = require("../models/teamInvitation");
const TeamChallenge = require("../models/teamChallenge.model");
const { sendEmail } = require("../middlewares/mail.middleware");
const userModel = require("../models/user.model");

const createTeam = async (req, res) => {
    try {
        const { name, teamPicture, challengeId, leaderId } = req.body;

        const newTeam = new Team({
            name,
            teamPicture,
            teamLeader: leaderId
        });

        await newTeam.save();

        if (challengeId) {
            const challenge = await TeamChallenge.findById(challengeId);
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }

            challenge.teams.push({
                team: newTeam._id,
            });

            await challenge.save();
        }

        res.status(201).json(newTeam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const inviteUserToTeam = async (req, res) => {
    const { teamId, userId, email } = req.body;

    try {
        if (!teamId) {
            return res.status(400).json({ message: "Team ID is required" });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        if (email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                const isMember = team.members.some(member => member.userId.toString() === existingUser._id.toString());
                const isOwner = team.teamLeader.toString() === existingUser._id.toString();

                if (isMember || isOwner) {
                    return res.status(400).json({ message: "User is already a member or owner of this team" });
                }

                const existingInvitation = await Invitation.findOne({ team: teamId, email });
                if (existingInvitation) {
                    return res.status(400).json({ message: "Email has already been invited to this team" });
                }

                const newInvitation = new TeamInvitation({
                    team: teamId,
                    email
                });

                try {
                    const message = `
            You have been invited to join ${team.name}. Please click the link below to sign up and accept the invitation.
            "http://localhost:3006/register" Join ${team.teamName}
          `;
                    await sendEmail(email, message);

                    await newInvitation.save();

                    return res.status(201).json({ message: "Email invitation sent successfully", invitation: newInvitation });
                } catch (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ message: "Failed to send email", error: error.message });
                }
            } else {
                return res.status(400).json({ message: `User with email ${email} not found` });
            }
        } else if (userId) {
            const isMember = team.members.some(member => member.userId.toString() === userId);
            const isOwner = team.teamLeader.toString() === userId;

            if (isMember || isOwner) {
                return res.status(400).json({ message: "User is already a member or owner of this team" });
            }

            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(400).json({ message: `User not found: ${userId}` });
            }

            const newInvitation = new TeamInvitation({
                team: teamId,
                user: userId
            });
            await newInvitation.save();

            const notification = new notificationModel({
                type: 'teamInvitation',
                message: `You have been invited to join ${team.name}`,
                picture: team.teamPicture,
                user: userId,
                invitation: newInvitation._id
            });
            await notification.save();

            return res.status(201).json({ message: "User invitation sent successfully", invitation: newInvitation });
        } else {
            return res.status(400).json({ message: "User ID or email must be provided" });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};



module.exports = {
    createTeam,
    inviteUserToTeam
};
