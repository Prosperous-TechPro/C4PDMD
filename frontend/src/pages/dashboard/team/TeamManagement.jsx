import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getTeamMembers,
  createTeamMember,
  deleteTeamMember,
} from "../../../api/team/teamApi";

import TeamForm from "../../../components/forms/TeamForm";
import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const TeamManagement = () => {

  const queryClient =
    useQueryClient();

  const [showForm,
    setShowForm] =
    useState(false);

  const { data, isLoading, error } =
    useQuery({
      queryKey: ["team"],
      queryFn: getTeamMembers,
      staleTime: 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    });

  const createMutation = useMutation({
    mutationFn: createTeamMember,

    onMutate: async (newMember) => {
      await queryClient.cancelQueries({ queryKey: ["team"] });

      const previous = queryClient.getQueryData(["team"]);

      // optimistic add - match API response shape ({ data: [...] })
      queryClient.setQueryData(["team"], (old) => ({
        ...(old || {}),
        data: [
          { id: `temp-${Date.now()}`, ...newMember },
          ...(old?.data || []),
        ],
      }));

      return { previous };
    },

    onError: (err, newMember, context) => {
      toast.error(err?.message || "Failed to create team member.");
      if (context?.previous) {
        queryClient.setQueryData(["team"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
      setShowForm(false);
    },

    onSuccess: () => {
      toast.success("Team member created");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeamMember,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["team"] });

      const previous = queryClient.getQueryData(["team"]);

      queryClient.setQueryData(["team"], (old) => ({
        ...(old || {}),
        data: (old?.data || []).filter((m) => m.id !== id),
      }));

      return { previous };
    },

    onError: (err, id, context) => {
      toast.error(err?.message || "Failed to delete team member.");
      if (context?.previous) {
        queryClient.setQueryData(["team"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },

    onSuccess: () => {
      toast.success("Deleted successfully");
    },
  });

  return (
    <div>

      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-bold">
          Team Management
        </h1>

        <button
          onClick={() =>
            setShowForm(
              !showForm
            )
          }
          className="bg-blue-600 text-white px-4 py-2"
        >
          Add Team Member
        </button>

      </div>

      {showForm && (
        <TeamForm
          loading={createMutation.isPending}
          onSubmit={(data) => createMutation.mutate(data)}
        />
      )}

      <div className="space-y-4">

        {isLoading ? (
          <PageLoader />
        ) : error ? (
          <ErrorMessage message={error.message || "Failed to load team."} />
        ) : (
          data?.data?.map((member) => (
            <div
              key={member.id}
              className="border p-4 rounded flex justify-between"
            >
              <div>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>

              <button
                onClick={() => {
                  if (window.confirm("Delete this member?")) {
                    deleteMutation.mutate(member.id);
                  }
                }}
                className="bg-red-600 text-white px-3 py-1"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default TeamManagement;