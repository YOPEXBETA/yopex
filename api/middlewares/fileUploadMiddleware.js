const { uploadFileToFirebase } = require("../controllers/firebase.controllers");

const uploadFileToFirebaseMiddleware = async (req, res, next) => {
  if (req.file) {
    const downloadURL = await uploadFileToFirebase(req.file, req.type);
    req.downloadURL = downloadURL;
  }
  next();
};

module.exports = { uploadFileToFirebaseMiddleware };
