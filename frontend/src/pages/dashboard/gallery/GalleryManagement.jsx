/**
 * =====================================================
 * GALLERY MANAGEMENT
 * =====================================================
 * Admin page for managing gallery items.
 *
 * Features:
 * - View gallery
 * - Create gallery item
 * - Edit gallery item
 * - Delete gallery item
 * - Search gallery
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
  getGalleryItems,
  getGalleryCategories,
  createGalleryItem,
  deleteGalleryItem,
} from "../../../api/gallery/galleryApi";

import GalleryForm from "../../../components/forms/GalleryForm";
import GalleryTable from "../../../components/tables/GalleryTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const GalleryManagement = () => {
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
   * FETCH GALLERY
   * =====================================================
   */

  const {
    data: galleryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: getGalleryItems,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  /**
   * =====================================================
   * FETCH CATEGORIES
   * =====================================================
   */

  const {
    data: categoryData,
  } = useQuery({
    queryKey: [
      "galleryCategories",
    ],
    queryFn:
      getGalleryCategories,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  /**
   * =====================================================
   * CREATE ITEM
   * =====================================================
   */

  const createMutation =
    useMutation({
      mutationFn:
        createGalleryItem,

      onSuccess: () => {
        toast.success(
          "Gallery item created successfully."
        );

        queryClient.invalidateQueries({
          queryKey: ["gallery"],
        });

        setShowForm(false);
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to create gallery item."
        );
      },
    });

  /**
   * =====================================================
   * DELETE ITEM
   * =====================================================
   */

  const deleteMutation =
    useMutation({
      mutationFn:
        deleteGalleryItem,

      onSuccess: () => {
        toast.success(
          "Gallery item deleted successfully."
        );

        queryClient.invalidateQueries({
          queryKey: ["gallery"],
        });
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to delete gallery item."
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
      <ErrorMessage message="Failed to load gallery." />
    );
  }

  /**
   * =====================================================
   * FILTER
   * =====================================================
   */

  const gallery =
    galleryData?.data || [];

  const filteredGallery =
    gallery.filter((item) =>
      item.title
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
            Gallery Management
          </h1>

          <p className="text-gray-500">
            Upload and manage gallery
            images.
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
            : "Upload Image"}
        </button>

      </div>

      <input
        type="text"
        placeholder="Search gallery..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full border rounded-lg p-3"
      />

      {showForm && (
        <GalleryForm
          categories={
            categoryData?.data ||
            []
          }
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

      <GalleryTable
        gallery={filteredGallery}
        onEdit={(item) =>
          navigate(
            `/dashboard/gallery/edit/${item.id}`
          )
        }
        onDelete={(id) => {
          if (
            window.confirm(
              "Delete this gallery item?"
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

export default GalleryManagement;