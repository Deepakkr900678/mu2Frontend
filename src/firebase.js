// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEWNIscPxbEi721Qe1d0Eb6wM9iZZA2Yg",
  authDomain: "outpassmu.firebaseapp.com",
  projectId: "outpassmu",
  storageBucket: "outpassmu.appspot.com",
  messagingSenderId: "1082978620385",
  appId: "1:1082978620385:web:63d342defffb6eafb9f8a0",
  measurementId: "G-DX6HPNB9S1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
