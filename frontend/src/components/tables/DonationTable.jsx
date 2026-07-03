/**
 * =====================================================
 * DONATION TABLE
 * =====================================================
 * Displays all donations in a responsive table.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { Link } from "react-router-dom";

const DonationTable = ({
  donations = [],
  onDelete,
}) => {
  /**
   * =====================================================
   * EMPTY STATE
   * =====================================================
   */

  if (donations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No donations found.
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
              Donor
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Amount
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

          {donations.map(
            (donation) => (

              <tr
                key={donation.id}
                className="border-b hover:bg-gray-50"
              >

                {/* DONOR */}

                <td className="px-6 py-4 font-medium">
                  {donation.donorName}
                </td>

                {/* EMAIL */}

                <td className="px-6 py-4">
                  {donation.email}
                </td>

                {/* AMOUNT */}

                <td className="px-6 py-4 font-semibold text-green-700">
                  GH₵{" "}
                  {Number(
                    donation.amount
                  ).toLocaleString()}
                </td>

                {/* STATUS */}

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      donation.paymentStatus ===
                      "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : donation.paymentStatus ===
                          "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {donation.paymentStatus}
                  </span>

                </td>

                {/* DATE */}

                <td className="px-6 py-4">
                  {new Date(
                    donation.createdAt
                  ).toLocaleDateString()}
                </td>

                {/* ACTIONS */}

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      to={`/dashboard/donations/edit/${donation.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(
                          donation.id
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

export default DonationTable;