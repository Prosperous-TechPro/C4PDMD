/**
 * =====================================================
 * PROJECTS MANAGEMENT
 * =====================================================
 * Admin page for managing projects.
 *
 * Features:
 * - View all projects
 * - Search projects
 * - Create project
 * - Delete project
 * - Navigate to Edit Project
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
  getProjects,
  getProjectCategories,
  createProject,
  deleteProject,
} from "../../../api/projects/projectApi";

import ProjectForm from "../../../components/forms/ProjectForm";
import ProjectTable from "../../../components/tables/ProjectTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const ProjectsManagement = () => {

  /**
   * =====================================================
   * HOOKS
   * =====================================================
   */

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  /**
   * =====================================================
   * LOCAL STATE
   * =====================================================
   */

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  /**
   * =====================================================
   * FETCH PROJECTS
   * =====================================================
   */

  const {
    data: projectsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  /**
   * =====================================================
   * FETCH CATEGORIES
   * =====================================================
   */

  const {
    data: categoryData,
  } = useQuery({
    queryKey: ["projectCategories"],
    queryFn: getProjectCategories,
  });

  /**
   * =====================================================
   * CREATE PROJECT
   * =====================================================
   */

  const createMutation = useMutation({
    mutationFn: createProject,

    onSuccess: () => {

      toast.success(
        "Project created successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      setShowForm(false);

    },

    onError: (error) => {

      toast.error(
        error.message ||
        "Failed to create project."
      );

    },

  });

  /**
   * =====================================================
   * DELETE PROJECT
   * =====================================================
   */

  const deleteMutation = useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {

      toast.success(
        "Project deleted successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

    },

    onError: (error) => {

      toast.error(
        error.message ||
        "Failed to delete project."
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
        message="Failed to load projects."
      />
    );
  }

  /**
   * =====================================================
   * FILTER PROJECTS
   * =====================================================
   */

  const projects =
    projectsData?.data || [];

  const filteredProjects =
    projects.filter((project) =>
      project.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Projects Management
          </h1>

          <p className="text-gray-500 mt-1">
            Create, edit and manage projects.
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
            : "Add Project"}
        </button>

      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      {/* FORM */}

      {showForm && (

        <ProjectForm
          categories={
            categoryData?.data || []
          }
          loading={
            createMutation.isPending
          }
          onSubmit={(formData) =>
            createMutation.mutate(
              formData
            )
          }
        />

      )}

      {/* TABLE */}

      <ProjectTable
        projects={filteredProjects}
        onEdit={(project) =>
          navigate(
            `/dashboard/projects/edit/${project.id}`
          )
        }
        onDelete={(id) => {

          if (
            window.confirm(
              "Delete this project?"
            )
          ) {
            deleteMutation.mutate(id);
          }

        }}
      />

    </div>
  );

};

export default ProjectsManagement;