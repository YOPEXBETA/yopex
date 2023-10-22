
const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  try {
    // const token = req.cookies.accessToken;
    // get token from authorization headers 
    const token = req.header("Authorization").split(" ")[1];

    if (!token) return res.status(401).send("You are not authenticated!");

    const payload = await jwt.verify(token, process.env.passwordToken);
    req.userId = payload.id;
    req.role = payload.role;
    next();
  } catch (err) {
    return res.status(403).send("Token is not valid!");
  }
};

module.exports = {
  authenticateToken,
};
