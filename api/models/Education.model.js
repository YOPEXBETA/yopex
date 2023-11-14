const mongoose = require("mongoose");



const EducationSchema = new mongoose.Schema(
    {
        School: {type: String, required: true},
        Degree: {type: String, required: true},
        FieldOfStudy: {type: String, required: true},
        Startdate: {type: Date, required: false},
        Enddate: {type: Date, required: false},
        Description: {type: String},
        skills: {type: Array, default: []},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }
)

module.exports = mongoose.model("Education", EducationSchema);