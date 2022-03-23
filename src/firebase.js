import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyCR8_hZrOLRW2dXEU8DopMAqjqyhVmA008",
  authDomain: "initial-329ec.firebaseapp.com",
  projectId: "initial-329ec",
  storageBucket: "initial-329ec.appspot.com",
  messagingSenderId: "617378247085",
  appId: "1:617378247085:web:732992dd9bca75aef73124",
  measurementId: "G-Z65573978P",
};

firebase.initializeApp(config);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);

export default firebase;

// import * as firebase from "firebase/app";
// import "firebase/analytics";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCkZPJsYdh7-4mcsuiPszvVERSwDOBKb74",
//   authDomain: "vue-routes-authentication.firebaseapp.com",
//   databaseURL: "https://vue-routes-authentication.firebaseio.com",
//   projectId: "vue-routes-authentication",
//   storageBucket: "vue-routes-authentication.appspot.com",
//   messagingSenderId: "680655489437",
//   appId: "1:680655489437:web:9d66d2b0f438e3e9014774",
//   measurementId: "G-CGL0FS2DVQ",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// firebase.getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       unsubscribe();
//       resolve(user);
//     }, reject);
//   });
// };

// export default firebase;
