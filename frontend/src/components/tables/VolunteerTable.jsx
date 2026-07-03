/**
 * =====================================================
 * VOLUNTEER TABLE
 * =====================================================
 * Displays all volunteers in a responsive table.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { Link } from "react-router-dom";

const VolunteerTable = ({
  volunteers = [],
  onDelete,
}) => {
  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (volunteers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No volunteer applications found.
      </div>
    );
  }

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Phone
            </th>

            <th className="px-6 py-4 text-left">
              Skills
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Applied
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {volunteers.map(
            (volunteer) => (

              <tr
                key={volunteer.id}
                className="border-b hover:bg-gray-50"
              >

                {/* NAME */}

                <td className="px-6 py-4 font-medium">
                  {volunteer.name}
                </td>

                {/* EMAIL */}

                <td className="px-6 py-4">
                  {volunteer.email}
                </td>

                {/* PHONE */}

                <td className="px-6 py-4">
                  {volunteer.phone}
                </td>

                {/* SKILLS */}

                <td className="px-6 py-4">
                  {volunteer.skills}
                </td>

                {/* STATUS */}

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      volunteer.status ===
                      "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : volunteer.status ===
                          "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {volunteer.status}
                  </span>

                </td>

                {/* CREATED */}

                <td className="px-6 py-4">
                  {new Date(
                    volunteer.createdAt
                  ).toLocaleDateString()}
                </td>

                {/* ACTIONS */}

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      to={`/dashboard/volunteers/edit/${volunteer.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(
                          volunteer.id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
};

export default VolunteerTable;