/**
 * =====================================================
 * PARTNER TABLE
 * =====================================================
 * Displays all partners in a responsive table.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { Link } from "react-router-dom";

const PartnerTable = ({
  partners = [],
  onDelete,
}) => {
  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (partners.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No partners found.
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
              Logo
            </th>

            <th className="px-6 py-4 text-left">
              Partner Name
            </th>

            <th className="px-6 py-4 text-left">
              Website
            </th>

            <th className="px-6 py-4 text-left">
              Date Added
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {partners.map((partner) => (

            <tr
              key={partner.id}
              className="border-b hover:bg-gray-50"
            >

              {/* LOGO */}

              <td className="px-6 py-4">

                {partner.logo ? (

                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-16 h-16 object-contain rounded border"
                  />

                ) : (

                  <div className="w-16 h-16 rounded border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                    No Logo
                  </div>

                )}

              </td>

              {/* NAME */}

              <td className="px-6 py-4 font-medium">
                {partner.name}
              </td>

              {/* WEBSITE */}

              <td className="px-6 py-4">

                {partner.website ? (

                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>

                ) : (

                  <span className="text-gray-400">
                    N/A
                  </span>

                )}

              </td>

              {/* DATE */}

              <td className="px-6 py-4">
                {partner.createdAt
                  ? new Date(
                      partner.createdAt
                    ).toLocaleDateString()
                  : "-"}
              </td>

              {/* ACTIONS */}

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <Link
                    to={`/dashboard/partners/edit/${partner.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(
                        partner.id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default PartnerTable;