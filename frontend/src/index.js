import React from "react";
import { createRoot } from "react-dom/client"; // React 18+
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

// Grab the root element
const container = document.getElementById("root");
const root = createRoot(container);

// Render the app wrapped in Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
