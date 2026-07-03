/**
 * =====================================================
 * CONTACT TABLE
 * =====================================================
 * Displays all contact messages in a responsive table.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { Link } from "react-router-dom";

const ContactTable = ({
  messages = [],
  onDelete,
}) => {
  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No contact messages found.
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
              Subject
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Date
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {messages.map((message) => (

            <tr
              key={message.id}
              className="border-b hover:bg-gray-50"
            >

              {/* NAME */}

              <td className="px-6 py-4 font-medium">
                {message.name}
              </td>

              {/* EMAIL */}

              <td className="px-6 py-4">
                {message.email}
              </td>

              {/* SUBJECT */}

              <td className="px-6 py-4">
                {message.subject}
              </td>

              {/* STATUS */}

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                    message.status ===
                    "NEW"
                      ? "bg-blue-600"
                      : message.status ===
                        "READ"
                      ? "bg-green-600"
                      : "bg-gray-600"
                  }`}
                >
                  {message.status}
                </span>

              </td>

              {/* DATE */}

              <td className="px-6 py-4">
                {message.createdAt
                  ? new Date(
                      message.createdAt
                    ).toLocaleDateString()
                  : "-"}
              </td>

              {/* ACTIONS */}

              <td className="px-6 py-4">

                <div className="flex justify-center gap-3">

                  <Link
                    to={`/dashboard/contacts/edit/${message.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(
                        message.id
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

export default ContactTable;