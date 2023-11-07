import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../config/firebase";
import { v4 } from "uuid";

const uploadFile = async (file, type = "files") => {
  const fileName = v4();
  console.log("Upload Type:", type);
  const storageRef = ref(storage, `${type}/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  

  // get image url
  await uploadTask;
  return await getDownloadURL(storageRef);
};

export default uploadFile;