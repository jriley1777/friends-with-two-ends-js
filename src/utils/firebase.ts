import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "friends-with-two-ends.firebaseapp.com",
  databaseURL: "https://friends-with-two-ends.firebaseio.com",
  projectId: "friends-with-two-ends",
  storageBucket: "friends-with-two-ends.appspot.com",
  messagingSenderId: "918334714285",
  appId: "1:918334714285:web:2c64f2d896748cac1af124",
  measurementId: "G-KW2HDYXQQB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;