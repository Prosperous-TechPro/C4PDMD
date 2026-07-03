/**
 * =====================================================
 * SERVICE TABLE COMPONENT
 * =====================================================
 * Displays all services in a responsive table.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { FaEdit, FaTrash } from "react-icons/fa";

const ServiceTable = ({
  services = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      {/* ========================================= */}
      {/* TABLE */}
      {/* ========================================= */}

      <div className="overflow-x-auto">

        <table className="min-w-full divide-y divide-gray-200">

          {/* ================================ */}
          {/* TABLE HEADER */}
          {/* ================================ */}

          <thead className="bg-blue-700">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                #
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                Service
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                Description
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-white">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-white">
                Actions
              </th>

            </tr>

          </thead>

          {/* ================================ */}
          {/* TABLE BODY */}
          {/* ================================ */}

          <tbody className="divide-y divide-gray-100 bg-white">

            {services.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="py-10 text-center text-gray-500"
                >
                  No services found.
                </td>

              </tr>

            ) : (

              services.map((service, index) => (

                <tr
                  key={service.id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* Row Number */}

                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  {/* Service Title */}

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {service.title}
                  </td>

                  {/* Description */}

                  <td className="px-6 py-4 text-gray-600">

                    {service.description?.length > 80
                      ? `${service.description.substring(
                          0,
                          80
                        )}...`
                      : service.description}

                  </td>

                  {/* Status */}

                  <td className="px-6 py-4 text-center">

                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        service.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {service.status}
                    </span>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-4">

                      <button
                        onClick={() => onEdit(service)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit Service"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(service.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete Service"
                      >
                        <FaTrash size={18} />
                      </button>

                    </div>

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

export default ServiceTable;