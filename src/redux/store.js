// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import fcmReducer from "./slices/fcmSlice";

export const store = configureStore({
  reducer: {
    fcm: fcmReducer,
  },
});
