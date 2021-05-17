import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDcey8ZS1F6BqyaP5cyqimcG5HcCZG5gYU",
  authDomain: "sistemacolegio-d81a1.firebaseapp.com",
  projectId: "sistemacolegio-d81a1",
  storageBucket: "sistemacolegio-d81a1.appspot.com",
  messagingSenderId: "138042667439",
  appId: "1:138042667439:web:09586a6d049bf76842ff5a",
  measurementId: "G-44D2WH6QK6",
};
// Initialize Firebase
//export const firebaseAnalytics = firebase.analytics();
export default firebase.initializeApp(firebaseConfig);
