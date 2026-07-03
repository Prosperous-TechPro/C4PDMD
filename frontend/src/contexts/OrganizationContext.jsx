/**
 * =====================================================
 * ORGANIZATION SETTINGS CONTEXT
 * =====================================================
 * Provides centralized access to organization
 * settings throughout the application
 * =====================================================
 */

import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api/settings/settingsApi";

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
  const [orgData, setOrgData] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-settings"],
    queryFn: getSettings,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  useEffect(() => {
    if (data?.data) {
      setOrgData(data.data);
    }
  }, [data]);

  return (
    <OrganizationContext.Provider
      value={{
        organization: orgData,
        isLoading,
        error,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganization must be used within OrganizationProvider"
    );
  }
  return context;
};
