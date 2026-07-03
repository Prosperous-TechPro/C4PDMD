/**
 * =====================================================
 * PROJECT TABLE
 * =====================================================
 * Displays all projects in the dashboard.
 *
 * Features:
 * - Project Image
 * - Project Title
 * - Category
 * - Status
 * - Created Date
 * - Edit
 * - Delete
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import {
  FaEdit,
  FaTrash,
  FaImage,
} from "react-icons/fa";

const ProjectTable = ({
  projects = [],
  onEdit,
  onDelete,
}) => {
  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center border">
        <h2 className="text-xl font-semibold text-gray-600">
          No Projects Found
        </h2>

        <p className="text-gray-400 mt-2">
          Create your first project to get started.
        </p>
      </div>
    );
  }

  /**
   * =====================================================
   * TABLE
   * =====================================================
   */

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          {/* TABLE HEADER */}

          <thead className="bg-blue-700 text-white">

            <tr>

              <th className="px-6 py-4 text-left">
                Image
              </th>

              <th className="px-6 py-4 text-left">
                Project
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Created
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          {/* TABLE BODY */}

          <tbody>

            {projects.map((project) => (

              <tr
                key={project.id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* IMAGE */}

                <td className="px-6 py-4">

                  {project.image ? (

                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                  ) : (

                    <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                      <FaImage className="text-gray-500 text-xl" />
                    </div>

                  )}

                </td>

                {/* TITLE */}

                <td className="px-6 py-4">

                  <h3 className="font-semibold text-gray-800">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {project.description}
                  </p>

                </td>

                {/* CATEGORY */}

                <td className="px-6 py-4">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {project.category?.name || "No Category"}
                  </span>

                </td>

                {/* STATUS */}

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {project.status}
                  </span>

                </td>

                {/* CREATED */}

                <td className="px-6 py-4 text-gray-600">

                  {project.createdAt
                    ? new Date(
                        project.createdAt
                      ).toLocaleDateString()
                    : "-"}

                </td>

                {/* ACTIONS */}

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(project)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(project.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ProjectTable;