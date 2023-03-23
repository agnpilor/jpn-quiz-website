// import { db } from "../firebase";
// import firebase from "firebase/app";


// const firebaseConfig = {
//     apiKey: "AIzaSyBsGVyhA9MKUSo6plcj1yJGYsh1mGWw2U0",
//     authDomain: "kuizu-f3085.firebaseapp.com",
//     projectId: "kuizu-f3085",
//     storageBucket: "kuizu-f3085.appspot.com",
//     messagingSenderId: "1035868234894",
//     appId: "1:1035868234894:web:038aa28bf4219fee5615df",
//     measurementId: "G-3XM1WFLRVR",
//   };
// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// export const signInWithEmailAndPassword = async (email, password) => {
//   try {
//     const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     const user = userCredential.user;
//     return user;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const createUserWithEmailAndPassword = async (email, password) => {
//   let user;
//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     user = userCredential.user;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
//   return user;
// };

// export const signOut = async () => {
//   try {
//     await auth.signOut();
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const getCurrentUser = () => {
//   return auth.currentUser;
// };
