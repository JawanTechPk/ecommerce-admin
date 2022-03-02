// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9cNlnFlgTuqJrKEMCbnjNs9U8RYWdLwE",
  authDomain: "ecommerce-rent.firebaseapp.com",
  projectId: "ecommerce-rent",
  storageBucket: "ecommerce-rent.appspot.com",
  messagingSenderId: "621618559580",
  appId: "1:621618559580:web:69ea18f0c557df6f104499",
  measurementId: "G-Y2NJGP4B2E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
