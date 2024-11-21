// App.jsx
import React, { useState } from "react";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { clientId } from "./utils/thongTinChung";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
