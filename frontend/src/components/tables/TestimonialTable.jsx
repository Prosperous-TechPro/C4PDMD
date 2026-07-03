/**
 * =====================================================
 * TESTIMONIAL TABLE
 * =====================================================
 * Displays all testimonials in a responsive table.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { Link } from "react-router-dom";

const TestimonialTable = ({
  testimonials = [],
  onDelete,
}) => {
  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (testimonials.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No testimonials found.
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
              Image
            </th>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Testimonial
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

          {testimonials.map(
            (testimonial) => (

              <tr
                key={testimonial.id}
                className="border-b hover:bg-gray-50"
              >

                {/* IMAGE */}

                <td className="px-6 py-4">

                  {testimonial.image ? (

                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />

                  ) : (

                    <div className="w-16 h-16 rounded-full bg-gray-100 border flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>

                  )}

                </td>

                {/* NAME */}

                <td className="px-6 py-4 font-medium">
                  {testimonial.name}
                </td>

                {/* MESSAGE */}

                <td className="px-6 py-4 max-w-md">
                  <p className="line-clamp-3">
                    {testimonial.message}
                  </p>
                </td>

                {/* DATE */}

                <td className="px-6 py-4">
                  {testimonial.createdAt
                    ? new Date(
                        testimonial.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </td>

                {/* ACTIONS */}

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      to={`/dashboard/testimonials/edit/${testimonial.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(
                          testimonial.id
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

export default TestimonialTable;