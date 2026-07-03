/**
 * =====================================================
 * PROJECT DETAILS PAGE
 * =====================================================
 * Public Project Details Page
 * =====================================================
 */

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  Calendar,
  FolderKanban,
  ArrowLeft,
  Share2,
} from "lucide-react";

import {
  getProjectById,
  getProjects,
} from "../../api/projects/projectApi";

import PageLoader from "../../components/loaders/PageLoader";
import ErrorMessage from "../../components/common/ErrorMessage";

const ProjectDetails = () => {
  /**
   * =====================================================
   * PARAMS
   * =====================================================
   */

  const { id } = useParams();

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
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });

  /**
   * =====================================================
   * FETCH RELATED PROJECTS
   * =====================================================
   */

  const { data: projectsData } =
    useQuery({
      queryKey: ["projects"],
      queryFn: getProjects,
    });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorMessage message="Unable to load project." />
    );
  }

  const project =
    projectData?.data;

  const relatedProjects =
    projectsData?.data
      ?.filter(
        (item) =>
          item.id !== project?.id
      )
      ?.slice(0, 3) || [];

  const handleShare = async () => {
    if (
      navigator.share
    ) {
      try {
        await navigator.share({
          title: project.title,
          text: project.title,
          url: window.location.href,
        });
      } catch (e) {
        console.warn("Project share failed", e);
      }
    } else {
      await navigator.clipboard.writeText(
        window.location.href
      );
      alert(
        "Project link copied to clipboard."
      );
    }
  };

  return (
    <div>

      {/* ====================================== */}
      {/* HERO IMAGE */}
      {/* ====================================== */}

      {project?.image && (
        <section>

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[500px] object-cover"
          />

        </section>
      )}

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <section className="py-16">

        <div className="container mx-auto px-6 max-w-6xl">

          {/* Back */}

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft size={18} />

            Back to Projects

          </Link>

          {/* Title */}

          <div className="flex flex-col lg:flex-row justify-between gap-8">

            <div>

              <h1 className="text-4xl font-bold">
                {project?.title}
              </h1>

              <div className="flex flex-wrap gap-4 mt-5">

                {project?.category && (

                  <div className="flex items-center gap-2 text-gray-600">

                    <FolderKanban
                      size={18}
                    />

                    {project.category.name}

                  </div>

                )}

                <div className="flex items-center gap-2 text-gray-600">

                  <Calendar
                    size={18}
                  />

                  {project?.createdAt
                    ? new Date(
                        project.createdAt
                      ).toLocaleDateString()
                    : "-"}

                </div>

              </div>

            </div>

            <button
              onClick={
                handleShare
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 h-fit"
            >
              <Share2 size={18} />

              Share

            </button>

          </div>

          {/* Status */}

          {project?.status && (

            <div className="mt-8">

              <span
                className={`px-4 py-2 rounded-full text-white ${
                  project.status ===
                  "COMPLETED"
                    ? "bg-green-600"
                    : project.status ===
                      "ONGOING"
                    ? "bg-yellow-500"
                    : "bg-blue-600"
                }`}
              >

                {project.status}

              </span>

            </div>

          )}

          {/* Description */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-5">
              Project Description
            </h2>

            <p className="text-gray-700 leading-8 whitespace-pre-line">
              {project?.description}
            </p>

          </div>

          {/* Objectives */}

          {project?.objectives && (

            <div className="mt-12">

              <h2 className="text-2xl font-bold mb-5">
                Objectives
              </h2>

              <p className="text-gray-700 leading-8 whitespace-pre-line">
                {project.objectives}
              </p>

            </div>

          )}

          {/* Gallery */}

          {project?.gallery?.length >
            0 && (

            <div className="mt-16">

              <h2 className="text-2xl font-bold mb-6">
                Project Gallery
              </h2>

              <div className="grid md:grid-cols-3 gap-6">

                {project.gallery.map(
                  (image, index) => (

                    <img
                      key={index}
                      src={
                        image.image
                      }
                      alt={`Project ${index}`}
                      className="rounded-xl shadow h-64 w-full object-cover"
                    />

                  )
                )}

              </div>

            </div>

          )}

          {/* Related */}

          {relatedProjects.length >
            0 && (

            <div className="mt-20">

              <h2 className="text-2xl font-bold mb-8">
                Related Projects
              </h2>

              <div className="grid md:grid-cols-3 gap-8">

                {relatedProjects.map(
                  (
                    related
                  ) => (

                    <Link
                      key={
                        related.id
                      }
                      to={`/projects/${related.id}`}
                      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                    >

                      {related.image && (

                        <img
                          src={
                            related.image
                          }
                          alt={
                            related.title
                          }
                          className="h-56 w-full object-cover"
                        />

                      )}

                      <div className="p-5">

                        <h3 className="font-bold text-xl">
                          {
                            related.title
                          }
                        </h3>

                      </div>

                    </Link>

                  )
                )}

              </div>

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default ProjectDetails;