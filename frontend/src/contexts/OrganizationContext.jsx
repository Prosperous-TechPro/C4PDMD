/**
 * =====================================================
 * ORGANIZATION SETTINGS CONTEXT
 * =====================================================
 * Provides centralized access to organization
 * settings throughout the application
 * =====================================================
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api/settings/settingsApi";

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-settings"],
    queryFn: getSettings,
    staleTime: 1000,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return (
    <OrganizationContext.Provider
      value={{
        organization: data?.data || null,
        isLoading,
        error,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-refresh/only-export-components */
export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganization must be used within OrganizationProvider"
    );
  }
  return context;
};
