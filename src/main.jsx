// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import { Provider } from "react-redux";
// import { store } from "./redux/store.js";

// createRoot(document.getElementById("root")).render(
//   <>
//   <Provider store={store}>
//     <App />
//   </Provider>
//     <ToastContainer />
//   </>
// );
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

// ✅ Register Firebase service worker BEFORE rendering the app
if ('serviceWorker' in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("✅ Service Worker registered:", registration.scope);
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error);
      });
  });
}

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </>
);
