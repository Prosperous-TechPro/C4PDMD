/**
 * =====================================================
 * EDIT SERVICE PAGE
 * =====================================================
 * Allows administrators to edit existing services.
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
  getService,
  updateService,
} from "../../../api/services/serviceApi";

import ServiceForm from "../../../components/forms/ServiceForm";
import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const EditService = () => {
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
   * FETCH SERVICE
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getService(id),
  });

  /**
   * =====================================================
   * UPDATE SERVICE
   * =====================================================
   */

  const mutation = useMutation({
    mutationFn: (formData) =>
      updateService(id, formData),

    onSuccess: () => {
      toast.success("Service updated successfully.");

      queryClient.invalidateQueries({
        queryKey: ["services"],
      });

      navigate("/dashboard/services");
    },

    onError: (error) => {
      toast.error(
        error.message || "Failed to update service."
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
        message="Failed to load service."
      />
    );
  }

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Service
        </h1>

        <p className="text-gray-500 mt-2">
          Update the selected service.
        </p>

      </div>

      <ServiceForm
        initialData={data?.data}
        loading={mutation.isPending}
        onSubmit={(formData) =>
          mutation.mutate(formData)
        }
      />

    </div>
  );
};

export default EditService;