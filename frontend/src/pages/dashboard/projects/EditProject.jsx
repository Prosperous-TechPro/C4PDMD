/**
 * =====================================================
 * EDIT PROJECT
 * =====================================================
 * Edit an existing project.
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
  getProject,
  updateProject,
  getProjectCategories,
} from "../../../api/projects/projectApi";

import ProjectForm from "../../../components/forms/ProjectForm";

import PageLoader from "../../../components/loaders/PageLoader";

import ErrorMessage from "../../../components/common/ErrorMessage";

const EditProject = () => {
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
   * FETCH PROJECT
   * =====================================================
   */

  const {
    data: projectData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
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
   * UPDATE PROJECT
   * =====================================================
   */

  const updateMutation = useMutation({
    mutationFn: (formData) =>
      updateProject(id, formData),

    onSuccess: () => {
      toast.success(
        "Project updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["project", id],
      });

      navigate("/dashboard/projects");
    },

    onError: (error) => {
      toast.error(
        error.message ||
          "Failed to update project."
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
      <ErrorMessage message="Failed to load project." />
    );
  }

  /**
   * =====================================================
   * PROJECT
   * =====================================================
   */

  const project = projectData?.data;

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Project
        </h1>

        <p className="text-gray-500 mt-2">
          Update project information.
        </p>

      </div>

      <ProjectForm
        initialData={project}
        categories={categoryData?.data || []}
        loading={updateMutation.isPending}
        onSubmit={(formData) =>
          updateMutation.mutate(formData)
        }
      />

    </div>
  );
};

export default EditProject;