const mongoose = require("mongoose");
const userModel = require("./user.model");



const ExperienceShema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        type: {type:String, required: true, enum : ["internship", "Full-time", "volunteering","Part-time"]},
        company: {type: String, required: true},
        localtion: {type: String, required: true},
        locationtype: {type: String, required: true, enum : ["remote", "office","hybrid"]},
        startdate: {type: Date, required: true},
        enddate: {type: Date, required: false},
        description: {type: String, required: true},
        skills: {type: Array, default: []},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    }
)


ExperienceShema.pre("findOneAndDelete",
{ document: false, query: true },
async function (next) {
    console.log(this._conditions._id,"mmmmm");
    const experience = await this.model.findById(this._conditions._id);
    
    const userId = experience.user;
    const user = await userModel.findById(userId);
    
    user.experiences.pull(experiencegit ._id);
    user.save();
  next();
})

module.exports = mongoose.model("Experience", ExperienceShema);