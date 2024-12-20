const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAdmin = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.passwordToken);
    
    const user = await User.findOne({ email: decoded.email });
    
    if (!user) {
      throw new Error();
    }
    if (user.role !== "admin") {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = {
  isAdmin,
};
