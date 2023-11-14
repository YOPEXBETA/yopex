const mongoose = require("mongoose");
const userModel = require("./user.model");



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

EducationSchema.pre("findOneAndDelete",
{ document: false, query: true },
async function (next) {
    console.log(this._conditions._id,"mmmmm");
    const education = await this.model.findById(this._conditions._id);
    
    const userId = education.user;
    const user = await userModel.findById(userId);
    
    user.educations.pull(education._id);
    user.save();
  next();
})

module.exports = mongoose.model("Education", EducationSchema);