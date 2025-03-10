// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoTSdjI8dhxANkNJ_QG8rcutpswzeSL5w",
  authDomain: "calculadora-70698.firebaseapp.com",
  projectId: "calculadora-70698",
  storageBucket: "calculadora-70698.firebasestorage.app",
  messagingSenderId: "514627782804",
  appId: "1:514627782804:web:1a5e2804ccccfa763d0c81",
  measurementId: "G-L80GXQG46T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const analytics = getAnalytics(app);

export {db};
