// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAo8Ozpy2ZSKTnR1K2C1rs4iq-bxj4X2oc",
  authDomain: "fill-in-test.firebaseapp.com",
  projectId: "fill-in-test",
  storageBucket: "fill-in-test.firebasestorage.app",
  messagingSenderId: "1026549752959",
  appId: "1:1026549752959:web:358d99ef53ba27b1b00b4a",
  measurementId: "G-Y7HF2BDDFQ"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
