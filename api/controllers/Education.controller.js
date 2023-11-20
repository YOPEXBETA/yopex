const Education = require('../models/Education.model');
const User = require('../models/user.model');

const ObjectId = require("mongoose").Types.ObjectId;

const addEducation = async (req, res) => {
    try{
        const {School,Degree,FieldOfStudy,Startdate,Enddate,Description,skills} = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        console.log(skills);
        const education = new Education({
            School,
            Degree,
            FieldOfStudy,
            Startdate,
            Enddate,
            Description,
            skills,
            user: userId,
        });
        const newEducation = await education.save();
        user.educations.push(newEducation._id);
        user.save();
        res.status(201).json({ message: "Education created successfully", newEducation });


    }catch (error) {
        res.status(400).json({ error: `Failed to create Education: ${error.message}` });
    }
}

const updateEducation = async (req, res) => {
    try{
    const {id} = req.params;
    const {School,Degree,FieldOfStudy,Startdate,Enddate,Description,skills} = req.body;
    const education = await Education.findById(id);
    if (!education) {
        return res.status(400).json({ error: "Education not found" });
    }
    if (education.user.toString() !== req.userId) {
        return res.status(401).json({ error: "Not authorized" });
    }
    education.School = School;
    education.Degree = Degree;
    education.FieldOfStudy = FieldOfStudy;
    education.Startdate = Startdate;
    education.Enddate = Enddate;
    education.Description = Description;
    education.skills = skills;
    await education.save();
    res.status(200).json({ message: "Education updated successfully", education });
    }catch (error) {
        res.status(400).json({ error: `Failed to update Education: ${error.message}` });
    }

}

const deleteEducation = async (req, res) => {
    try{
    const {id} = req.params;
    const education = await Education.findById(id);
    if (!education) {
        return res.status(400).json({ error: "Education not found" });
    }
    if (education.user.toString() !== req.userId) {
        return res.status(401).json({ error: "Not authorized" });
    }
    await Education.findOneAndDelete({_id: id});
    res.status(200).json({ message: "Education deleted successfully" });
    }catch (error) {
        res.status(400).json({ error: `Failed to delete Education: ${error.message}` });
    }

}

const getEducationByUser = async (req, res) => {
    try{
    const {userId} = req.params;
    const Educations = await Education.find({user: new ObjectId(userId)});
    res.status(200).json(Educations);
    }catch (error) {
        res.status(400).json({ error: `Failed to get Education: ${error.message}` });
    }
}


module.exports = {
    addEducation,
    updateEducation,
    deleteEducation,
    getEducationByUser
}