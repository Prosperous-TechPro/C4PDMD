import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} from "../../../api/blog/blogApi";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const BlogCategoriesManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: categoriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  const createMutation = useMutation({
    mutationFn: createBlogCategory,
    onSuccess: () => {
      toast.success("Category created successfully.");
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] });
      setCategoryName("");
      setShowForm(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create category.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateBlogCategory(id, data),
    onSuccess: () => {
      toast.success("Category updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] });
      setEditingCategory(null);
      setCategoryName("");
      setShowForm(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update category.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBlogCategory(id),
    onSuccess: () => {
      toast.success("Category deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete category.");
    },
  });

  const handleDelete = (category) => {
    const confirmed = window.confirm("Do you want to delete this category?");
    if (!confirmed) return;
    deleteMutation.mutate(category.id);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load categories." />;
  }

  const categories = categoriesData?.data || [];
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setCategoryName("");
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    if (editingCategory) {
      updateMutation.mutate({
        id: editingCategory.id,
        data: { name: categoryName.trim() },
      });
    } else {
      createMutation.mutate({ name: categoryName.trim() });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Categories</h1>
          <p className="text-gray-500 mt-1">Create and update blog categories in the admin panel.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              handleCancel();
            }
          }}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg"
        >
          {showForm ? "Close Form" : "Add Category"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3"
      />

      {showForm && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            {editingCategory ? "Edit Category" : "New Category"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                placeholder="Enter category name"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {editingCategory ? (updateMutation.isPending ? "Updating..." : "Update Category") : (createMutation.isPending ? "Creating..." : "Create Category")}
              </button>
              {editingCategory && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{category.name}</td>
                  <td className="px-6 py-4">{new Date(category.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category)}
                      disabled={deleteMutation.isPending}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogCategoriesManagement;
