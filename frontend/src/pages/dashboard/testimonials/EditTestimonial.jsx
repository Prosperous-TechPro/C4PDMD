/**
 * =====================================================
 * EDIT TESTIMONIAL
 * =====================================================
 * Edit an existing testimonial.
 * =====================================================
 */

import { useNavigate, useParams } from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import { getTestimonialById, updateTestimonial } from "../../../api/testimonials/testimonialApi";

import TestimonialForm from "../../../components/forms/TestimonialForm";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const EditTestimonial = () => {
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
   * FETCH TESTIMONIAL
   * =====================================================
   */

  const {
    data: testimonialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "testimonial",
      id,
    ],
    queryFn: () =>
      getTestimonialById(id),
    enabled: !!id,
  });

  /**
   * =====================================================
   * UPDATE TESTIMONIAL
   * =====================================================
   */

  const updateMutation =
    useMutation({
      mutationFn: (data) =>
        updateTestimonial(
          id,
          data
        ),

      onSuccess: () => {
        toast.success(
          "Testimonial updated successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "testimonials",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "testimonial",
            id,
          ],
        });

        navigate(
          "/dashboard/testimonials"
        );
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to update testimonial."
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
      <ErrorMessage message="Failed to load testimonial." />
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
          Edit Testimonial
        </h1>

        <p className="text-gray-500 mt-2">
          Update testimonial information.
        </p>

      </div>

      <TestimonialForm
        initialData={
          testimonialData?.data
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

export default EditTestimonial;