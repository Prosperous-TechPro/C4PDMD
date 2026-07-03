/**
 * =====================================================
 * GALLERY TABLE
 * =====================================================
 * Displays all gallery items in a responsive table.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { Link } from "react-router-dom";

const GalleryTable = ({
  gallery = [],
  onDelete,
}) => {
  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (gallery.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No gallery items found.
      </div>
    );
  }

  /**
   * =====================================================
   * TABLE
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
              Title
            </th>

            <th className="px-6 py-4 text-left">
              Category
            </th>

            <th className="px-6 py-4 text-left">
              Created
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {gallery.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-gray-50"
            >

              {/* IMAGE */}

              <td className="px-6 py-4">

                {item.image ? (

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />

                ) : (

                  <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center text-xs">
                    No Image
                  </div>

                )}

              </td>

              {/* TITLE */}

              <td className="px-6 py-4 font-medium">
                {item.title}
              </td>

              {/* CATEGORY */}

              <td className="px-6 py-4">
                {item.category?.name ||
                  "No Category"}
              </td>

              {/* CREATED */}

              <td className="px-6 py-4">
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </td>

              {/* ACTIONS */}

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <Link
                    to={`/dashboard/gallery/edit/${item.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(item.id)
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

export default GalleryTable;