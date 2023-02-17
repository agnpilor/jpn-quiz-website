// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsGVyhA9MKUSo6plcj1yJGYsh1mGWw2U0",
  authDomain: "kuizu-f3085.firebaseapp.com",
  projectId: "kuizu-f3085",
  storageBucket: "kuizu-f3085.appspot.com",
  messagingSenderId: "1035868234894",
  appId: "1:1035868234894:web:038aa28bf4219fee5615df",
  measurementId: "G-3XM1WFLRVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
