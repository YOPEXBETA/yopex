const Occupation = require("../models/Occupation.model");
const SocialMediaPost = require("../models/Post.model");

const createOccupation = async (req, res) => {
    try {
        const { name } = req.body;
        const occupation = await Occupation.findOne({ name });
        if (occupation)
            return res.status(400).json({ msg: "This Occupation already exists." });

        const newOccupation = new Occupation({ name });

        await newOccupation.save();
        res.json({ msg: "Created an Occupation" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

const deleteOccupation = async (req, res) => {
    try {
        const posts = await SocialMediaPost.findOne({
            name: req.params.name,
        });
        if (posts)
            return res.status(400).json({
                msg: "Please delete all posts with a relationship.",
            });

        await Occupation.findOneAndDelete({ name: req.params.name });
        res.json({ msg: "Deleted an Occupation" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

const getOccupations = async (req, res) => {
    try {
        const q = req.query;
        const filters = {
            ...(q.search && { name: { $regex: q.search, $options: "i" } }),
        };
        const allOccupations = await Occupation.find(filters);
        res.status(200).json(allOccupations);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

const updateOccupation = async (req, res) => {
    try {
        const { name } = req.body;
        await Occupation.findOneAndUpdate({ _id: req.params.id }, { name });

        res.json({ msg: "Updated an Occupation" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createOccupation,
    deleteOccupation,
    getOccupations,
    updateOccupation,
};
