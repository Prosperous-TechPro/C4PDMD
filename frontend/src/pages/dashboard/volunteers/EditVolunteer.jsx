/**
 * =====================================================
 * EDIT VOLUNTEER
 * =====================================================
 * Edit an existing volunteer application.
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
  getVolunteerById,
  updateVolunteer,
} from "../../../api/volunteers/volunteerApi";

import VolunteerForm from "../../../components/forms/VolunteerForm";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const EditVolunteer = () => {
  /**
   * =====================================================
   * HOOKS
   * =====================================================
   */

  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient =
    useQueryClient();

  /**
   * =====================================================
   * FETCH VOLUNTEER
   * =====================================================
   */

  const {
    data: volunteerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["volunteer", id],
    queryFn: () =>
      getVolunteerById(id),
    enabled: !!id,
  });

  /**
   * =====================================================
   * UPDATE VOLUNTEER
   * =====================================================
   */

  const updateMutation =
    useMutation({
      mutationFn: (data) =>
        updateVolunteer(
          id,
          data
        ),

      onSuccess: () => {
        toast.success(
          "Volunteer updated successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "volunteers",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "volunteer",
            id,
          ],
        });

        navigate(
          "/dashboard/volunteers"
        );
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to update volunteer."
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
      <ErrorMessage message="Failed to load volunteer." />
    );
  }

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Volunteer
        </h1>

        <p className="text-gray-500 mt-2">
          Update volunteer information.
        </p>

      </div>

      <VolunteerForm
        initialData={
          volunteerData?.data
        }
        loading={
          updateMutation.isPending
        }
        onSubmit={(data) =>
          updateMutation.mutate(
            data
          )
        }
      />

    </div>
  );
};

export default EditVolunteer;