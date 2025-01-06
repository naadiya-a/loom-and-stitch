// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrkJtcE5fzSRzS7QMmLoJop_1tdrwCTz0",
  authDomain: "loom-and-stitch.firebaseapp.com",
  projectId: "loom-and-stitch",
  storageBucket: "loom-and-stitch.firebasestorage.app",
  messagingSenderId: "1012845391719",
  appId: "1:1012845391719:web:fa1bcf5791a14ee36689c2",
  measurementId: "G-G9SDTLVHD7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;