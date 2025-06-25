// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAo8Ozpy2ZSKTnR1K2C1rs4iq-bxj4X2oc",
  authDomain: "fill-in-test.firebaseapp.com",
  projectId: "fill-in-test",
  storageBucket: "fill-in-test.firebasestorage.app",
  messagingSenderId: "1026549752959",
  appId: "1:1026549752959:web:358d99ef53ba27b1b00b4a",
  measurementId: "G-Y7HF2BDDFQ"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
