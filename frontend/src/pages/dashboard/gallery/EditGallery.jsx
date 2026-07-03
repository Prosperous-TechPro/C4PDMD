/**
 * =====================================================
 * EDIT GALLERY
 * =====================================================
 * Edit an existing gallery item.
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
  getGalleryItemById,
  getGalleryCategories,
  updateGalleryItem,
} from "../../../api/gallery/galleryApi";

import GalleryForm from "../../../components/forms/GalleryForm";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const EditGallery = () => {
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
   * FETCH GALLERY ITEM
   * =====================================================
   */

  const {
    data: galleryData,
    isLoading: galleryLoading,
    error: galleryError,
  } = useQuery({
    queryKey: ["gallery", id],
    queryFn: () =>
      getGalleryItemById(id),
    enabled: !!id,
  });

  /**
   * =====================================================
   * FETCH CATEGORIES
   * =====================================================
   */

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: [
      "galleryCategories",
    ],
    queryFn:
      getGalleryCategories,
  });

  /**
   * =====================================================
   * UPDATE GALLERY
   * =====================================================
   */

  const updateMutation =
    useMutation({
      mutationFn: (data) =>
        updateGalleryItem(
          id,
          data
        ),

      onSuccess: () => {
        toast.success(
          "Gallery item updated successfully."
        );

        queryClient.invalidateQueries({
          queryKey: ["gallery"],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "gallery",
            id,
          ],
        });

        navigate(
          "/dashboard/gallery"
        );
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to update gallery item."
        );
      },
    });

  /**
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (
    galleryLoading ||
    categoryLoading
  ) {
    return <PageLoader />;
  }

  /**
   * =====================================================
   * ERROR
   * =====================================================
   */

  if (
    galleryError ||
    categoryError
  ) {
    return (
      <ErrorMessage message="Failed to load gallery item." />
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
          Edit Gallery Item
        </h1>

        <p className="text-gray-500 mt-2">
          Update gallery information.
        </p>

      </div>

      <GalleryForm
        initialData={
          galleryData?.data
        }
        categories={
          categoryData?.data ||
          []
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

export default EditGallery;