/**
 * =====================================================
 * EDIT USER
 * =====================================================
 * Allows administrators to edit an existing user.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useNavigate, useParams } from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getUser,
  updateUser,
} from "../../../api/users/userApi";

import UserForm from "../../../components/forms/UserForm";

import PageLoader from "../../../components/loaders/PageLoader";

import ErrorMessage from "../../../components/common/ErrorMessage";

const EditUser = () => {

  /**
   * =====================================================
   * HOOKS
   * =====================================================
   */

  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  /**
   * =====================================================
   * FETCH USER
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  /**
   * =====================================================
   * UPDATE USER
   * =====================================================
   */

  const updateMutation = useMutation({
    mutationFn: (formData) =>
      updateUser(id, formData),

    onSuccess: () => {

      toast.success(
        "User updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", id],
      });

      navigate("/dashboard/users");

    },

    onError: (error) => {

      toast.error(
        error.message ||
        "Failed to update user."
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
      <ErrorMessage
        message="Failed to load user."
      />
    );
  }

  /**
   * =====================================================
   * USER DATA
   * =====================================================
   */

  const user = data?.data;

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      {/* ========================================== */}
      {/* PAGE HEADER */}
      {/* ========================================== */}

      <div>

        <h1 className="text-3xl font-bold">
          Edit User
        </h1>

        <p className="text-gray-500 mt-2">
          Update user information and permissions.
        </p>

      </div>

      {/* ========================================== */}
      {/* USER FORM */}
      {/* ========================================== */}

      <UserForm
        initialData={user}
        loading={updateMutation.isPending}
        onSubmit={(formData) =>
          updateMutation.mutate(formData)
        }
      />

    </div>
  );

};

export default EditUser;