import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <>
  <Provider store={store}>
    <App />
  </Provider>
    <ToastContainer />
  </>
);
