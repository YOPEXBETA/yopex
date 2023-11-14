const mongoose = require("mongoose");



const ExperienceShema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        type: {type:String, required: true, enum : ["internship", "Full-time", "volunteering","Part-time"]},
        company: {type: String, required: true},
        localtion: {type: String, required: true},
        locationtype: {type: String, required: true, enum : ["remote", "office","hybrid"]},
        startdate: {type: Date, required: true},
        enddate: {type: Date, required: true},
        description: {type: String, required: true},
        skills: {type: Array, default: []},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }
)

module.exports = mongoose.model("Experience", ExperienceShema);