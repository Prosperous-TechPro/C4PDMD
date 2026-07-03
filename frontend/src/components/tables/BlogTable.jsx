/**
 * =====================================================
 * BLOG TABLE
 * =====================================================
 * Displays all blog posts in a responsive table.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { Link } from "react-router-dom";

const BlogTable = ({
  blogs = [],
  onDelete,
}) => {
  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (blogs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No blog posts found.
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

        <tbody>

          {blogs.map((blog) => (

            <tr
              key={blog.id}
              className="border-b hover:bg-gray-50"
            >

              {/* IMAGE */}

              <td className="px-6 py-4">

                {blog.image ? (

                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                ) : (

                  <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-xs">
                    No Image
                  </div>

                )}

              </td>

              {/* TITLE */}

              <td className="px-6 py-4 font-medium">
                {blog.title}
              </td>

              {/* CATEGORY */}

              <td className="px-6 py-4">
                {blog.category?.name ||
                  "No Category"}
              </td>

              {/* STATUS */}

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    blog.status === "PUBLISHED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {blog.status}
                </span>

              </td>

              {/* CREATED */}

              <td className="px-6 py-4">

                {new Date(
                  blog.createdAt
                ).toLocaleDateString()}

              </td>

              {/* ACTIONS */}

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <Link
                    to={`/dashboard/blogs/edit/${blog.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(blog.id)
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

export default BlogTable;