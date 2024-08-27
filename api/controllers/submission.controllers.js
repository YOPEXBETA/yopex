const ChallengeModel = require("../models/Challenge.model");
const notificationModel = require("../models/notification.model");
const Submission = require("../models/submission.model");
const User = require("../models/user.model");
const {updateUserSubmissionsBadges} = require("../utils/utilities");
const main = require("../server");
const Team = require("../models/team.model");
const TeamChallengeModel = require("../models/TeamChallenge.model");

const CreateSubmission = async (req, res, next) => {
    try {
        const {challengeId, userId, title, description, filesPaths, links} =
            req.body;

        console.log('body', req.body)
        const submission = new Submission({
            challengeId,
            userId,
            title,
            description,
            filesPaths,
            links,
        });

        // check if challenge is started
        const challenge =
            await ChallengeModel.findById(challengeId).populate("organization");
        if (!challenge) {
            return res.status(400).json({message: "Challenge not found"});
        }

        if (!challenge.start) {
            return res.status(400).json({message: "Challenge not started"});
        }
        if (challenge.deadline < Date.now()) {
            return res.status(400).json({message: "Challenge is closed"});
        }

        // Save submission to database
        const savedSubmission = await submission.save();

        // Add submission to challenge

        const user = await User.findById(userId)
            .select("-password")
            .populate("submissions");

        challenge.submissions.push(savedSubmission._id);
        user.submissions.push(savedSubmission._id);

        updateUserSubmissionsBadges(user);

        challenge.users.map((user, index) => {
            if (user.user == userId) {
                challenge.users[index].submissionDate = new Date();
            }
        });
        await challenge.save();
        await user.save();
        // cretae notification
        const notification = new notificationModel({
            type: "submission",
            message: `You have submitted a solution for ${challenge.title}`,
            user: userId,
            picture: user.picturePath,
        });
        await notification.save();

        const notification2 = new notificationModel({
            type: "submission",
            message: `${user.firstname} ${user.lastname} has submitted a solution for ${challenge.title}`,
            user: challenge.owner,
            picture: user.picturePath,
        });
        await notification2.save();


        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};


const CreateTeamSubmission = async (req, res, next) => {
    try {
        const {teamChallengeId, teamId, title, description, filesPaths, links} = req.body;

        const existingSubmission = await Submission.findOne({ teamChallengeId, teamId, title });
        if (existingSubmission) {
            return res.status(400).json({ message: "A submission with this title already exists for this team and challenge." });
        }

        const submission = new Submission({
            teamChallengeId,
            teamId,
            title,
            description,
            filesPaths,
            links,
        });

        // Check if challenge is started
        const teamChallenge = await TeamChallengeModel.findById(teamChallengeId).populate("organization");
        if (!teamChallenge) {
            return res.status(400).json({message: "Challenge not found"});
        }

        if (!teamChallenge.start) {
            return res.status(400).json({message: "Challenge not started"});
        }
        if (teamChallenge.deadline < Date.now()) {
            return res.status(400).json({message: "Challenge is closed"});
        }

        // Save submission to database
        const savedSubmission = await submission.save();

        // Add submission to challenge
        const team = await Team.findById(teamId);
        const leader = await User.findById(team.teamLeader);
        teamChallenge.submissions.push(savedSubmission._id);
        leader.submissions.push(savedSubmission._id);

        // Update team members' submissions
        const memberUpdates = team.members.map(async memberId => {
            const member = await User.findById(memberId);
            if (member) {
                member.submissions.push(savedSubmission._id);
                await member.save();

                // Create notification for each member
                const memberNotification = new notificationModel({
                    type: "submission",
                    message: `Your team ${team.name} has submitted a solution for ${teamChallenge.title}`,
                    user: member._id,
                    picture: team.teamPicture,
                });
                await memberNotification.save();
                updateUserSubmissionsBadges(member);
            }
        });

        // Wait for all member updates and notifications to complete
        await Promise.all(memberUpdates);

        // Update leader submissions
        updateUserSubmissionsBadges(leader);

        // Update team challenge with submission date
        teamChallenge.teams.map((teamEntry, index) => {
            if (teamEntry.team._id.toString() === teamId) {
                teamChallenge.teams[index].submissionDate = new Date();
            }
        });
        await teamChallenge.save();
        await leader.save();

        // Create notifications for the team leader and challenge owner
        const notification = new notificationModel({
            type: "submission",
            message: `Your team ${team.name} has submitted a solution for ${teamChallenge.title}`,
            user: leader._id,
            picture: leader.picturePath,
        });
        await notification.save();

        const notification2 = new notificationModel({
            type: "submission",
            message: `${team.name} has submitted a solution for ${teamChallenge.title}`,
            user: teamChallenge.owner,
            organization: teamChallenge.organization,
            picture: team.teamPicture,
        });
        await notification2.save();

        res.status(201).json(leader);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};

const editsubmission = async (req, res) => {
    const {challengeId, userId, title, description, filesPaths, links} =
        req.body;
    try {
        const challenge = await ChallengeModel.findById(challengeId);
        if (!challenge) {
            return res.status(400).json({message: "Challenge not found"});
        }
        if (challenge.deadline < Date.now()) {
            return res.status(400).json({message: "Challenge is closed"});
        }
        const submission = await Submission.findOneAndUpdate(
            {challengeId, userId},
            {title, description, filesPaths, links}
        );
        res.status(201).json(submission);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};


const editTeamSubmission = async (req, res) => {
    const {teamChallengeId, teamId, title, description, filesPaths, links} =
        req.body;
    try {
        const teamChallenge = await TeamChallengeModel.findById(teamChallengeId);
        console.log('')
        if (!teamChallenge) {
            return res.status(400).json({message: "Challenge not found"});
        }
        if (teamChallenge.deadline < Date.now()) {
            return res.status(400).json({message: "Challenge is closed"});
        }
        const submission = await Submission.findOneAndUpdate(
            {teamChallengeId, teamId},
            {title, description, filesPaths, links}
        );
        res.status(201).json(submission);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};

module.exports = {
    CreateSubmission,
    editsubmission,
    CreateTeamSubmission,
    editTeamSubmission
};
