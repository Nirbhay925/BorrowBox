// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABP96Yt1awVhd4CoNFlVdI0IF0umnpMy8",
  authDomain: "borrowbox-31eb1.firebaseapp.com",
  projectId: "borrowbox-31eb1",
  storageBucket: "borrowbox-31eb1.firebasestorage.app",
  messagingSenderId: "699244564297",
  appId: "1:699244564297:web:f401039985a4b3a5a35498",
  measurementId: "G-FPJ4EL2Z32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);