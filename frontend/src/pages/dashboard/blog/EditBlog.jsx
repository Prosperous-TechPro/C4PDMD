/**
 * =====================================================
 * EDIT BLOG
 * =====================================================
 * Edit existing blog post.
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
  getBlogById,
  getBlogCategories,
  updateBlog,
} from "../../../api/blog/blogApi";

import BlogForm from "../../../components/forms/BlogForm";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const EditBlog = () => {
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
   * FETCH BLOG
   * =====================================================
   */

  const {
    data: blogData,
    isLoading: blogLoading,
    error: blogError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
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
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories,
  });

  /**
   * =====================================================
   * UPDATE BLOG
   * =====================================================
   */

  const updateMutation = useMutation({
    mutationFn: (data) =>
      updateBlog(id, data),

    onSuccess: () => {
      toast.success(
        "Blog updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["blog", id],
      });

      navigate("/dashboard/blogs");
    },

    onError: (error) => {
      toast.error(
        error.message ||
          "Failed to update blog."
      );
    },
  });

  /**
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (blogLoading || categoryLoading) {
    return <PageLoader />;
  }

  /**
   * =====================================================
   * ERROR
   * =====================================================
   */

  if (blogError || categoryError) {
    return (
      <ErrorMessage message="Failed to load blog." />
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
          Edit Blog
        </h1>

        <p className="text-gray-500 mt-2">
          Update blog information.
        </p>

      </div>

      <BlogForm
        initialData={blogData?.data}
        categories={
          categoryData?.data || []
        }
        loading={
          updateMutation.isPending
        }
        onSubmit={(data) =>
          updateMutation.mutate(data)
        }
      />

    </div>
  );
};

export default EditBlog;