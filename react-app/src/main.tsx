import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";

const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter basename="/sdk-web/0.9.9/app">
    <App />
  </BrowserRouter>
);
