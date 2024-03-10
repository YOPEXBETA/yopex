const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const Company = require("../models/company.model");
const companySchema = require("../models/company.model");
const userSchema = require("../models/user.model");
const Level = require("../models/Level.model");

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;

    const query = { role: { $ne: "admin" } };
    if (req.query.name) {
      const searchRegex = new RegExp(req.query.name, "i");
      query.$or = [
        { firstname: { $regex: searchRegex } },
        { lastname: { $regex: searchRegex } },
      ];
    }

    const users = await userSchema
      .find(query)
      .sort({ score: -1, createdAt: 1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();

    const totalCount = await userSchema.countDocuments({
      role: { $ne: "admin" },
    });

    res.status(200).json({ users, userCount: totalCount });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().select("-password");
    res.json(companies);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const addUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    console.log(typeof req.body.password, req.body.password);

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPass,
      role: req.body.role,
    });

    //see if user exist or not
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).send({ msg: "User already exists" });
    }
    //create the user if not existed in the database
    const user = await newUser.save();
    return res.status(200).json({ msg: "user successfully created", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const updUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const delUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// ==============================|| USER STATUS CHANGE ||============================== //
const activateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userSchema.findById(id);
    if (!user) {
      return res.status(404).json({ eror: "User not found!" });
    }
    user.status = "active";
    user.save();
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const disableUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userSchema.findById(id);
    if (!user) {
      return res.status(404).json({ eror: "User not found!" });
    }
    user.status = "disabled";
    user.save();
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const banUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userSchema.findById(id);
    if (!user) {
      return res.status(404).json({ eror: "User not found!" });
    }
    user.status = "banned";
    user.save();
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const approveCompany = async (req, res) => {
  try {
    const updatedCompany = await companySchema.findByIdAndUpdate(
      req.body.companyId,
      {
        verified: true,
      },
      { new: true }
    );
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  addUser,
  updUser,
  delUser,
  disableUser,
  activateUser,
  banUser,
  approveCompany,
  getCompanies,
};
