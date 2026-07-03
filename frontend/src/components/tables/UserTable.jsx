/**
 * =====================================================
 * USER TABLE
 * =====================================================
 * Displays all system users.
 *
 * Features:
 * - Full Name
 * - Email
 * - Role
 * - Status Badge
 * - Edit User
 * - Delete User
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const UserTable = ({
  users = [],
  onEdit,
  onDelete,
}) => {
  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center border">
        <h2 className="text-xl font-semibold text-gray-600">
          No Users Found
        </h2>

        <p className="text-gray-400 mt-2">
          Create your first user to get started.
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

        <table className="w-full">

          {/* ======================================== */}
          {/* TABLE HEADER */}
          {/* ======================================== */}

          <thead className="bg-blue-700 text-white">

            <tr>

              <th className="text-left px-6 py-4">
                User
              </th>

              <th className="text-left px-6 py-4">
                Email
              </th>

              <th className="text-left px-6 py-4">
                Role
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>

            </tr>

          </thead>

          {/* ======================================== */}
          {/* TABLE BODY */}
          {/* ======================================== */}

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* USER */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    {user.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt={user.displayName || `${user.firstName || ""} ${user.lastName || ""}`.trim()}
                        className="w-11 h-11 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold">
                        {user.initials || "U"}
                      </div>
                    )}

                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {user.displayName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User"}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ID: {user.systemId || `C4PDMD-${String(user.id).padStart(4, "0")}`}
                      </p>

                    </div>

                  </div>

                </td>

                {/* EMAIL */}

                <td className="px-6 py-4 text-gray-700">
                  {user.email}
                </td>

                {/* ROLE */}

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    {user.role?.name || "No Role"}
                  </span>
                </td>

                {/* STATUS */}

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>

                </td>

                {/* ACTIONS */}

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        onEdit(user)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(user.id)
                      }
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

export default UserTable;