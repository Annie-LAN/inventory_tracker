// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFireStore } from "firebase/firestore";
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
const analytics = getAnalytics(app);
const firestore = getFireStore(app);

export { firestore };
