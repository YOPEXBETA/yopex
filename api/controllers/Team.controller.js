const Team = require("../models/team.model");
const notificationModel = require("../models/notification.model");
const TeamInvitation = require("../models/teamInvitation");
const TeamChallenge = require("../models/teamChallenge.model");
const { sendEmail } = require("../middlewares/mail.middleware");
const userModel = require("../models/user.model");

const createTeam = async (req, res) => {
    const { name, picture, challengeId, leaderId } = req.body;

    try {
        if (challengeId) {
            const challenge = await TeamChallenge.findById(challengeId);
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }

            // Fetch all teams in the challenge
            const existingTeams = await Promise.all(
                challenge.teams.map(teamEntry => Team.findById(teamEntry.team))
            );

            // Check if the leader is in any team
            const isLeaderInChallenge = existingTeams.some(team =>
                team.teamLeader.toString() === leaderId ||
                team.members.includes(leaderId)
            );

            if (isLeaderInChallenge) {
                return res.status(400).json({ message: "User is already in a team participating in this challenge" });
            }

            // Check if the challenge is full
            if (challenge.teams.length >= challenge.teamSize) {
                return res.status(400).json({ message: "Challenge is already full" });
            }

            // Ensure leader is not banned
            if (challenge.banned.includes(leaderId)) {
                return res.status(400).json({ message: "You are banned from this challenge" });
            }
        }

        // Create and save the new team
        const newTeam = new Team({
            name,
            teamPicture: picture,
            teamLeader: leaderId
        });

        await newTeam.save();

        if (challengeId) {
            const challenge = await TeamChallenge.findById(challengeId);
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }

            const user = await userModel.findById(leaderId);
            user.teamChallenges.push(challenge._id);
            user.challengesDone += 1;
            await user.save();

            challenge.teams.push({
                team: newTeam._id,
            });

            await challenge.save();

            const notification = new notificationModel({
                type: 'Challenge',
                message: `${newTeam.name} has joined your challenge ${challenge.title}`,
                picture: newTeam.teamPicture,
                user: challenge.owner,
                organization: challenge.organization,
                teamChallenge: challenge._id
            });
            await notification.save();
        }

        res.status(201).json(newTeam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const inviteUserToTeam = async (req, res) => {
    const { teamId, userId, email, challengeId } = req.body;

    try {
        const challenge = await TeamChallenge.findById(challengeId);
        if (!challenge) {
            return res.status(400).json({ message: "Challenge not found" });
        }
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

                const existingInvitation = await TeamInvitation.findOne({ team: teamId, email });
                if (existingInvitation) {
                    return res.status(400).json({ message: "Email has already been invited to this team" });
                }

                const newInvitation = new TeamInvitation({
                    team: teamId,
                    email,
                    challenge: challenge._id
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
                user: userId,
                challenge: challenge._id
            });
            await newInvitation.save();

            const notification = new notificationModel({
                type: 'teamInvitation',
                message: `You have been invited to join ${team.name}`,
                picture: team.teamPicture,
                user: userId,
                teamInvitation: newInvitation._id,
                teamChallenge: challenge._id
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

const acceptInvitation = async (req, res) => {
    const { invitationId } = req.params;

    try {
        // Find the invitation
        const invitation = await TeamInvitation.findById(invitationId);

        if (!invitation) {
            return res.status(404).json({ message: 'Invitation not found' });
        }

        // Update the invitation status to 'accepted'
        invitation.status = 'accepted';
        await invitation.save();

        // Add the user to the team's member list
        const team = await Team.findById(invitation.team);

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Ensure the user is not already a member
        if (!team.members.includes(invitation.user)) {
            team.members.push(invitation.user);
            await team.save();
        }

        // Remove related notifications
        await notificationModel.deleteMany({
            type: 'teamInvitation',
            'teamInvitation._id': invitationId
        });

        // Respond with the updated invitation and team
        res.status(200).json({
            message: 'Invitation accepted and user added to the team',
            invitation,
            team
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const refuseInvitation = async (req, res) => {
    const { invitationId } = req.params;

    try {
        // Find the invitation and update status to 'declined'
        const invitation = await TeamInvitation.findByIdAndUpdate(
            invitationId,
            { status: 'declined' },
            { new: true }
        );

        if (!invitation) {
            return res.status(404).json({ message: 'Invitation not found' });
        }

        // Find and remove related notifications
        await notificationModel.deleteMany({
            type: 'teamInvitation',
            'teamInvitation._id': invitationId
        });

        // Respond with the updated invitation
        res.status(200).json({ message: 'Invitation declined', invitation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTeamInvitationById = async (req, res) => {
    const { invitationId } = req.params;

    try {
        const invitation = await TeamInvitation.findById(invitationId)
            .populate('team', 'name teamPicture _id')
            .populate('challenge', 'title description _id');

        if (!invitation) {
            return res.status(404).json({ message: 'Invitation not found' });
        }

        res.status(200).json(invitation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    createTeam,
    inviteUserToTeam,
    acceptInvitation,
    refuseInvitation,
    getTeamInvitationById
};
