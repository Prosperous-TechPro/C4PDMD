/**
 * =====================================================
 * APPLICATION ENTRY POINT
 * =====================================================
 */

import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import queryClient from "./lib/queryClient";

import { AuthProvider } from "./contexts/AuthContext";
import { OrganizationProvider } from "./contexts/OrganizationContext";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>

      <OrganizationProvider>

        <AuthProvider>

          <App />

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: "12px",
                background: "#fff",
                color: "#111827",
              },
              success: {
                iconTheme: {
                  primary: "#2563eb",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#dc2626",
                  secondary: "#fff",
                },
              },
            }}
          />

        </AuthProvider>

      </OrganizationProvider>

    </QueryClientProvider>

  </React.StrictMode>
);