import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfirmProvider } from "./components/ConfirmProvider";
import { BookingProvider } from "./components/BookingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ConfirmProvider>
    <BookingProvider>
      <App />
    </BookingProvider>
  </ConfirmProvider>
);
