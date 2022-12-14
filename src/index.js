import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import WebSocketProvider from "../src/WebSocket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Navigation from "./router/Navigation";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <WebSocketProvider>
      <Navigation />
      <ToastContainer />
    </WebSocketProvider>
  </Provider>
);
