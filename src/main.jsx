import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import InfoProvider from "./provider/InfoProvider";
import router from "./router/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InfoProvider>
      <HelmetProvider>
        <div className="max-w-screen-2xl mx-auto">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </HelmetProvider>
    </InfoProvider>
  </React.StrictMode>
);
