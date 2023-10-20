const {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} = require("firebase/storage");
const { storage } = require("../config/firebase.js");
const { v4 } = require("uuid");

const uploadFileToFirebase = async (file, type = "undefined") => {
  try {
    const fileName = v4();
    const storagePath = `${type}/${fileName}`;
    const storageRef = ref(storage, storagePath);

    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase:", error);
    throw error;
  }
};

module.exports = { uploadFileToFirebase };
