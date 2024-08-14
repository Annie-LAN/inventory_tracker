// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvMd9WTHZrSmzoWpEWSiM6El0Jaf1DkAc",
  authDomain: "inventory-tracker-44f2d.firebaseapp.com",
  projectId: "inventory-tracker-44f2d",
  storageBucket: "inventory-tracker-44f2d.appspot.com",
  messagingSenderId: "760246100009",
  appId: "1:760246100009:web:deceef3dc4909ea9f7bc38",
  measurementId: "G-09FKKBQQTR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
auth.languageCode = "en"; // set authentication language to English
const provider = new GoogleAuthProvider();

export { firestore, auth, provider };
