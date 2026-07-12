/**
 * =====================================================
 * BLOG MANAGEMENT
 * =====================================================
 * Admin page for managing blog posts.
 *
 * Features:
 * - View all blogs
 * - Create blog
 * - Edit blog
 * - Delete blog
 * - Search blog
 * - React Query
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
  getBlogs,
  getBlogCategories,
  createBlog,
  deleteBlog,
} from "../../../api/blog/blogApi";

import BlogForm from "../../../components/forms/BlogForm";
import BlogTable from "../../../components/tables/BlogTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const BlogManagement = () => {
  /**
   * =====================================================
   * HOOKS
   * =====================================================
   */

  const navigate = useNavigate();

  const queryClient = useQueryClient();

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
   * FETCH BLOGS
   * =====================================================
   */

  const {
    data: blogsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
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
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  /**
   * =====================================================
   * CREATE BLOG
   * =====================================================
   */

  const createMutation =
    useMutation({
      mutationFn: createBlog,

      onSuccess: () => {
        toast.success(
          "Blog created successfully."
        );

        queryClient.invalidateQueries({
          queryKey: ["blogs"],
        });

        setShowForm(false);
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to create blog."
        );
      },
    });

  /**
   * =====================================================
   * DELETE BLOG
   * =====================================================
   */

  const deleteMutation =
    useMutation({
      mutationFn: deleteBlog,

      onSuccess: () => {
        toast.success(
          "Blog deleted successfully."
        );

        queryClient.invalidateQueries({
          queryKey: ["blogs"],
        });
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to delete blog."
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
      <ErrorMessage message="Failed to load blogs." />
    );
  }

  /**
   * =====================================================
   * FILTER BLOGS
   * =====================================================
   */

  const blogs =
    blogsData?.data || [];

  const filteredBlogs =
    blogs.filter((blog) =>
      blog.title
        .toLowerCase()
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
            Blog Management
          </h1>

          <p className="text-gray-500">
            Create, edit and manage blog posts.
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
            : "Add Blog"}
        </button>

      </div>

      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      {showForm && (
        <BlogForm
          categories={
            categoryData?.data || []
          }
          loading={
            createMutation.isPending
          }
          onSubmit={(data) =>
            createMutation.mutate(data)
          }
        />
      )}

      <BlogTable
        blogs={filteredBlogs}
        onEdit={(blog) =>
          navigate(
            `/dashboard/blogs/edit/${blog.id}`
          )
        }
        onDelete={(id) => {
          if (
            window.confirm(
              "Delete this blog post?"
            )
          ) {
            deleteMutation.mutate(id);
          }
        }}
      />

    </div>
  );
};

export default BlogManagement;