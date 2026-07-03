/**
 * =====================================================
 * TESTIMONIALS MANAGEMENT
 * =====================================================
 * Admin page for managing testimonials.
 *
 * Features:
 * - View testimonials
 * - Search testimonials
 * - Add testimonial
 * - Edit testimonial
 * - Delete testimonial
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
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
} from "../../../api/testimonials/testimonialApi";

import TestimonialForm from "../../../components/forms/TestimonialForm";
import TestimonialTable from "../../../components/tables/TestimonialTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const TestimonialsManagement = () => {
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

  const [showForm, setShowForm] =
    useState(false);

  const [search, setSearch] =
    useState("");

  /**
   * =====================================================
   * FETCH TESTIMONIALS
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  /**
   * =====================================================
   * CREATE TESTIMONIAL
   * =====================================================
   */

  const createMutation =
    useMutation({
      mutationFn:
        createTestimonial,

      onSuccess: () => {
        toast.success(
          "Testimonial added successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "testimonials",
          ],
        });

        setShowForm(false);
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to add testimonial."
        );
      },
    });

  /**
   * =====================================================
   * DELETE TESTIMONIAL
   * =====================================================
   */

  const deleteMutation =
    useMutation({
      mutationFn:
        deleteTestimonial,

      onSuccess: () => {
        toast.success(
          "Testimonial deleted successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "testimonials",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to delete testimonial."
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
      <ErrorMessage message="Failed to load testimonials." />
    );
  }

  /**
   * =====================================================
   * DATA
   * =====================================================
   */

  const testimonials =
    data?.data || [];

  const filteredTestimonials =
    testimonials.filter((item) =>
      item.name
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
            Testimonials Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage client testimonials.
          </p>

        </div>

        <button
          onClick={() =>
            setShowForm(
              !showForm
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          {showForm
            ? "Close Form"
            : "Add Testimonial"}
        </button>

      </div>

      <input
        type="text"
        placeholder="Search testimonial..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full border rounded-lg p-3"
      />

      {showForm && (
        <TestimonialForm
          loading={
            createMutation.isPending
          }
          onSubmit={(data) =>
            createMutation.mutate(
              data
            )
          }
        />
      )}

      <TestimonialTable
        testimonials={
          filteredTestimonials
        }
        onEdit={(testimonial) =>
          navigate(
            `/dashboard/testimonials/edit/${testimonial.id}`
          )
        }
        onDelete={(id) => {
          if (
            window.confirm(
              "Delete this testimonial?"
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

export default TestimonialsManagement;