/**
 * =====================================================
 * USERS MANAGEMENT
 * =====================================================
 * Admin page for managing users.
 *
 * Features:
 * - View all users
 * - Create user
 * - Delete user
 * - Navigate to edit page
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
  getUsers,
  createUser,
  deleteUser,
} from "../../../api/users/userApi";

import UserForm from "../../../components/forms/UserForm";
import UserTable from "../../../components/tables/UserTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const UsersManagement = () => {
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

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  /**
   * =====================================================
   * FETCH USERS
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  /**
   * =====================================================
   * CREATE USER
   * =====================================================
   */

  const createMutation = useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      toast.success("User created successfully.");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setShowForm(false);
    },

    onError: (error) => {
      toast.error(
        error.message || "Failed to create user."
      );
    },
  });

  /**
   * =====================================================
   * DELETE USER
   * =====================================================
   */

  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      toast.success("User deleted successfully.");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      toast.error(
        error.message || "Failed to delete user."
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
      <ErrorMessage message="Failed to load users." />
    );
  }

  /**
   * =====================================================
   * USERS LIST
   * =====================================================
   */

  const users = data?.data || [];

  const filteredUsers = users.filter((user) => {
    const normalizedSearch = search.toLowerCase().trim();
    if (!normalizedSearch) return true;

    const userName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    const systemId = (user.systemId || `C4PDMD-${String(user.id).padStart(4, "0")}`).toLowerCase();

    return (
      userName.includes(normalizedSearch) ||
      systemId.includes(normalizedSearch)
    );
  });

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Users Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage system users and their roles.
          </p>

        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg"
        >
          {showForm ? "Close Form" : "Add User"}
        </button>

      </div>

      {/* USER FORM */}

      {showForm && (
        <UserForm
          loading={createMutation.isPending}
          onSubmit={(formData) =>
            createMutation.mutate(formData)
          }
        />
      )}

      <div className="mt-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or ID..."
          className="w-full md:w-2/3 lg:w-1/2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* USERS TABLE */}

      <UserTable
        users={filteredUsers}
        onEdit={(user) =>
          navigate(
            `/dashboard/users/edit/${user.id}`
          )
        }
        onDelete={(id) => {
          if (
            window.confirm(
              "Are you sure you want to delete this user?"
            )
          ) {
            deleteMutation.mutate(id);
          }
        }}
      />

    </div>
  );
};

export default UsersManagement;