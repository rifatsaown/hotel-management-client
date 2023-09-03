import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import InfoProvider from "./provider/InfoProvider";
import router from "./router/Router.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <InfoProvider>
        <HelmetProvider>
          <div>
            <RouterProvider router={router}></RouterProvider>
          </div>
        </HelmetProvider>
      </InfoProvider>
    </AuthProvider>
    <div><Toaster/></div>
  </React.StrictMode>
);
