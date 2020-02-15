import firebase from 'firebase/app';
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "friends-with-two-ends.firebaseapp.com",
  databaseURL: "https://friends-with-two-ends.firebaseio.com",
  projectId: "friends-with-two-ends",
  storageBucket: "",
  messagingSenderId: "918334714285",
  appId: "1:918334714285:web:2c64f2d896748cac1af124"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;