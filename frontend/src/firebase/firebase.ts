// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_TwDMQZVQqS1TA_uATyAuYpa-5j2s02U",
  authDomain: "deeply-bc818.firebaseapp.com",
  projectId: "deeply-bc818",
  storageBucket: "deeply-bc818.firebasestorage.app",
  messagingSenderId: "765858986001",
  appId: "1:765858986001:web:97c780c94997cd15a5d9b0",
  measurementId: "G-85HW6CJXDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// const analytics = getAnalytics(app);

export {app, auth}