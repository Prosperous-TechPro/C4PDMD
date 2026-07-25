/**
 * =====================================================
 * APPLICATION ENTRY POINT
 * =====================================================
 */

import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster, toast } from "react-hot-toast";

import queryClient from "./lib/queryClient";

import { AuthProvider } from "./contexts/AuthContext";
import { OrganizationProvider } from "./contexts/OrganizationContext";

import App from "./App";

import "./index.css";
import { registerSW } from "virtual:pwa-register";

const updateServiceWorker = registerSW({
  onOfflineReady() {
    toast.success("App is ready for offline use.");
  },
  onNeedRefresh() {
    toast(
      (t) => (
        <div className="max-w-xs rounded-2xl bg-slate-950 p-4 text-sm text-white shadow-2xl">
          <p className="font-semibold">Update available</p>
          <p className="mt-2 text-slate-300">A new version is ready. Install the update to get the latest content.</p>
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={async () => {
                await updateServiceWorker();
                toast.dismiss(t.id);
              }}
              className="rounded-full bg-[#0057B8] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#003f8a]"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => toast.dismiss(t.id)}
              className="rounded-full border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-white"
            >
              Dismiss
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  },
});

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

updateServiceWorker();
