/**
 * =====================================================
 * VOLUNTEERS MANAGEMENT
 * =====================================================
 * Admin page for managing volunteer applications.
 *
 * Features:
 * - View volunteers
 * - Search volunteers
 * - Edit volunteer
 * - Approve / Reject volunteer
 * - Delete volunteer
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
  getVolunteers,
  updateVolunteer,
  deleteVolunteer,
} from "../../../api/volunteers/volunteerApi";

import VolunteerTable from "../../../components/tables/VolunteerTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const VolunteersManagement = () => {
  /**
   * =====================================================
   * HOOKS
   * =====================================================
   */

  const navigate = useNavigate();

  const queryClient =
    useQueryClient();

  /**
   * =====================================================
   * STATE
   * =====================================================
   */

  const [search, setSearch] =
    useState("");

  /**
   * =====================================================
   * FETCH VOLUNTEERS
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["volunteers"],
    queryFn: getVolunteers,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  /**
   * =====================================================
   * UPDATE
   * =====================================================
   */

  // Update mutation is currently unused in UI — keep implementation here for future use
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateVolunteer(id, data),
    onSuccess: () => {
      toast.success("Volunteer updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update volunteer.");
    },
  });

  /**
   * =====================================================
   * DELETE
   * =====================================================
   */

  const deleteMutation =
    useMutation({
      mutationFn:
        deleteVolunteer,

      onSuccess: () => {
        toast.success(
          "Volunteer deleted successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "volunteers",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to delete volunteer."
        );
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
      <ErrorMessage message="Failed to load volunteers." />
    );
  }

  /**
   * =====================================================
   * FILTER
   * =====================================================
   */

  const volunteers =
    data?.data || [];

  const filteredVolunteers =
    volunteers.filter(
      (volunteer) =>
        volunteer.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Volunteers Management
          </h1>

          <p className="text-gray-500">
            Manage volunteer applications.
          </p>

        </div>

      </div>

      <input
        type="text"
        placeholder="Search volunteer..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full border rounded-lg p-3"
      />

      <VolunteerTable
        volunteers={
          filteredVolunteers
        }
        onEdit={(volunteer) =>
          navigate(
            `/dashboard/volunteers/edit/${volunteer.id}`
          )
        }
        onDelete={(id) => {
          if (
            window.confirm(
              "Delete this volunteer?"
            )
          ) {
            deleteMutation.mutate(
              id
            );
          }
        }}
      />

    </div>
  );
};

export default VolunteersManagement;