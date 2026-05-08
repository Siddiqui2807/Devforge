import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import AppErrorBoundary from "./components/AppErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppErrorBoundary>
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </AppErrorBoundary>
);
