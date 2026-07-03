/**
 * =====================================================
 * SERVICES MANAGEMENT
 * =====================================================
 * Admin page for managing services.
 *
 * Features:
 * - View all services
 * - Create new service
 * - Edit service
 * - Delete service
 * - Auto refresh after CRUD operations
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getServices,
  createService,
  deleteService,
} from "../../../api/services/serviceApi";

import ServiceForm from "../../../components/forms/ServiceForm";
import ServiceTable from "../../../components/tables/ServiceTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const ServicesManagement = () => {

  /**
   * =====================================================
   * HOOKS
   * =====================================================
   */

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  /**
   * =====================================================
   * LOCAL STATE
   * =====================================================
   */

  const [showForm, setShowForm] =
    useState(false);

  /**
   * =====================================================
   * FETCH SERVICES
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  /**
   * =====================================================
   * CREATE SERVICE
   * =====================================================
   */

  const createMutation =
    useMutation({
      mutationFn: createService,

      onMutate: async (newService) => {
        await queryClient.cancelQueries({ queryKey: ["services"] });

        const previous = queryClient.getQueryData(["services"]);

        queryClient.setQueryData(["services"], (old) => ({
          ...(old || {}),
          data: [{ id: `temp-${Date.now()}`, ...newService }, ...(old?.data || [])],
        }));

        return { previous };
      },

      onError: (error, newService, context) => {
        toast.error(error?.message || "Failed to create service.");
        if (context?.previous) {
          queryClient.setQueryData(["services"], context.previous);
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["services"] });
        setShowForm(false);
      },

      onSuccess: () => {
        toast.success("Service created successfully.");
      },

    });

  /**
   * =====================================================
   * DELETE SERVICE
   * =====================================================
   */

  const deleteMutation =
    useMutation({
      mutationFn: deleteService,

      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: ["services"] });

        const previous = queryClient.getQueryData(["services"]);

        queryClient.setQueryData(["services"], (old) => ({
          ...(old || {}),
          data: (old?.data || []).filter((s) => s.id !== id),
        }));

        return { previous };
      },

      onError: (error, id, context) => {
        toast.error(error?.message || "Failed to delete service.");
        if (context?.previous) {
          queryClient.setQueryData(["services"], context.previous);
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["services"] });
      },

      onSuccess: () => {
        toast.success("Service deleted successfully.");
      },

    });

  /**
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (isLoading) {
    return <PageLoader />;
  }

  /**
   * =====================================================
   * ERROR
   * =====================================================
   */

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load services."
      />
    );
  }

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Services Management
          </h1>

          <p className="text-gray-500 mt-1">
            Create, edit and manage all services.
          </p>

        </div>

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg"
        >
          {showForm
            ? "Close Form"
            : "Add Service"}
        </button>

      </div>

      {/* ====================================== */}
      {/* CREATE FORM */}
      {/* ====================================== */}

      {showForm && (

        <ServiceForm
          loading={
            createMutation.isPending
          }
          onSubmit={(formData) =>
            createMutation.mutate(
              formData
            )
          }
        />

      )}

      {/* ====================================== */}
      {/* SERVICES TABLE */}
      {/* ====================================== */}

      <ServiceTable
        services={data?.data || []}

        onEdit={(service) => {

          navigate(
            `/dashboard/services/edit/${service.id}`
          );

        }}

        onDelete={(id) => {

          if (
            window.confirm(
              "Are you sure you want to delete this service?"
            )
          ) {

            deleteMutation.mutate(id);

          }

        }}

      />

    </div>
  );
};

export default ServicesManagement;