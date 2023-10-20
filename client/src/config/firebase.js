// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR1Kvx5GQ1wnIp2obzHLRDleWResJ_mAM",
  authDomain: "yopex-f6458.firebaseapp.com",
  projectId: "yopex-f6458",
  storageBucket: "yopex-f6458.appspot.com",
  messagingSenderId: "336608657914",
  appId: "1:336608657914:web:cc821b1e7707106f232443",
  measurementId: "G-0L1EFN2DE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export default storage;
