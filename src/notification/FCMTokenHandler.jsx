// src/components/FCMTokenHandler.jsx
import React, { useEffect } from "react";
import { messaging, getToken, onMessage } from "../notification/firebase";
import { useDispatch } from "react-redux";
import { setFcmToken } from "../redux/slices/fcmSlice";

const FCMTokenHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNotificationPermission = async () => {
      if (Notification.permission === "granted") {
        getFCMToken();
      } else if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          getFCMToken();
        } else {
          console.warn("Notification permission was denied.");
        }
      } else {
        alert("Please enable notification permissions in your browser settings.");
      }
    };

    const getFCMToken = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: "BAA0ZSYk9hCzCu5jNKKYM-HYQEsdRuHh0pb3kxf8UkL-kXH_KB7lHklOl5eMQdiIFwqo_3DcBaWT3J67Nh9mLDg"
        });

        if (token) {
          console.log("FCM Token:", token);
          dispatch(setFcmToken(token)); // ✅ Store in Redux
        }
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    onMessage(messaging, (payload) => {
      console.log("Message received in foreground: ", payload);
    });

    handleNotificationPermission();
  }, [dispatch]);

  return null;
};

export default FCMTokenHandler;
