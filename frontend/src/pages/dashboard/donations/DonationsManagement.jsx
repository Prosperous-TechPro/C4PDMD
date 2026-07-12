/**
 * =====================================================
 * DONATIONS MANAGEMENT
 * =====================================================
 * Admin page for managing donations.
 *
 * Features:
 * - View all donations
 * - View donation statistics
 * - Search donations
 * - Edit donation
 * - Delete donation
 * =====================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getDonations,
  getDonationStats,
  getFundMovements,
  deleteDonation,
  createFundMovement,
} from "../../../api/donations/donationApi";

import StatsCard from "../../../components/cards/StatsCard";
import DonationTable from "../../../components/tables/DonationTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `GH₵ ${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDateTime = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString();
};

const applyOptimisticStats = (oldStats, updates = {}) => {
  if (!oldStats?.data) return oldStats;

  return {
    ...oldStats,
    data: {
      ...oldStats.data,
      ...updates,
    },
  };
};

const DonationsManagement = () => {
  /**
   * =====================================================
   * HOOKS
   * =====================================================
   */

  const navigate = useNavigate();

  const queryClient =
    useQueryClient();

  /**
   * =====================================================
   * STATE
   * =====================================================
   */

  const [search, setSearch] =
    useState("");
  const [movementSearch, setMovementSearch] =
    useState("");
  const [movementForm, setMovementForm] =
    useState({
      amount: "",
      reason: "",
    });

  /**
   * =====================================================
   * FETCH DONATIONS
   * =====================================================
   */

  const {
    data: donationsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: getDonations,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  /**
   * =====================================================
   * FETCH STATISTICS
   * =====================================================
   */

  const { data: statsData } =
    useQuery({
      queryKey: [
        "donationStats",
      ],
      queryFn:
        getDonationStats,
      staleTime: 1000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    });

  const { data: fundMovementsData } = useQuery({
    queryKey: ["fundMovements"],
    queryFn: getFundMovements,
    staleTime: 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  /**
   * =====================================================
   * DELETE DONATION
   * =====================================================
   */

  const deleteMutation =
    useMutation({
      mutationFn:
        deleteDonation,

      onMutate: async (id) => {
        await queryClient.cancelQueries({
          queryKey: ["donations"],
        });
        await queryClient.cancelQueries({
          queryKey: ["donationStats"],
        });

        const previousDonations =
          queryClient.getQueryData(["donations"]);
        const previousStats =
          queryClient.getQueryData(["donationStats"]);
        const donationToDelete =
          previousDonations?.data?.find(
            (donation) => donation.id === id
          );

        queryClient.setQueryData(["donations"], (old) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.filter(
              (donation) => donation.id !== id
            ),
          };
        });

        queryClient.setQueryData(["donationStats"], (old) =>
          applyOptimisticStats(old, {
            totalDonations: Math.max(
              0,
              Number(old?.data?.totalDonations || 0) - 1
            ),
            totalAmount: Number(
              (
                Number(old?.data?.totalAmount || 0) -
                Number(donationToDelete?.amount || 0)
              ).toFixed(2)
            ),
          })
        );

        return { previousDonations, previousStats };
      },

      onSuccess: () => {
        toast.success(
          "Donation deleted successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "donations",
          ],
          refetchType: "active",
        });

        queryClient.invalidateQueries({
          queryKey: [
            "donationStats",
          ],
          refetchType: "active",
        });
      },

      onError: (error, _id, context) => {
        queryClient.setQueryData(["donations"], context?.previousDonations);
        queryClient.setQueryData(["donationStats"], context?.previousStats);
        toast.error(
          error.message ||
            "Failed to delete donation."
        );
      },
    });

  const movementMutation =
    useMutation({
      mutationFn:
        createFundMovement,

      onMutate: async (newMovement) => {
        await queryClient.cancelQueries({
          queryKey: ["donationStats"],
        });

        const previousStats =
          queryClient.getQueryData(["donationStats"]);
        const movementAmount = Number(newMovement.amount || 0);

        queryClient.setQueryData(["donationStats"], (old) =>
          applyOptimisticStats(old, {
            totalAmount: Number(
              (
                Number(old?.data?.totalAmount || 0) -
                movementAmount
              ).toFixed(2)
            ),
            totalWithdrawn: Number(
              (
                Number(old?.data?.totalWithdrawn || 0) +
                movementAmount
              ).toFixed(2)
            ),
          })
        );

        return { previousStats };
      },

      onSuccess: () => {
        toast.success(
          "Fund movement recorded successfully."
        );
        setMovementForm({
          amount: "",
          reason: "",
        });
        queryClient.invalidateQueries({
          queryKey: ["donationStats"],
          refetchType: "active",
        });
        queryClient.invalidateQueries({
          queryKey: ["donations"],
          refetchType: "active",
        });
        queryClient.invalidateQueries({
          queryKey: ["fundMovements"],
          refetchType: "active",
        });
      },

      onError: (error, _variables, context) => {
        queryClient.setQueryData(["donationStats"], context?.previousStats);
        toast.error(
          error?.message ||
            "Unable to record fund movement."
        );
      },
    });

  const handleMovementSubmit = (e) => {
    e.preventDefault();
    movementMutation.mutate({
      ...movementForm,
      amount: Number(movementForm.amount),
    });
  };

  /**
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (isLoading) {
    return <PageLoader />;
  }

  /**
   * =====================================================
   * ERROR
   * =====================================================
   */

  if (error) {
    return (
      <ErrorMessage message="Failed to load donations." />
    );
  }

  /**
   * =====================================================
   * DATA
   * =====================================================
   */

  const donations =
    donationsData?.data || [];

  const stats =
    statsData?.data || {};
  const fundMovements =
    fundMovementsData?.data || [];

  const filteredDonations =
    donations.filter((donation) =>
      donation.donorName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const filteredFundMovements =
    fundMovements.filter((movement) => {
      const query = movementSearch
        .trim()
        .toLowerCase();

      if (!query) return true;

      return [
        movement.reason,
        movement.initiatedBy,
        movement.user?.email,
        movement.amount?.toString(),
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        );
    });

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Donations Management
        </h1>

        <p className="text-gray-500 mt-2">
          Manage donations and
          payment records.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <StatsCard
          title="Total Donations"
          value={
            stats.totalDonations ||
            0
          }
        />

        <StatsCard
          title="Available Balance"
          value={`GH₵ ${Number(
            stats.totalAmount || 0
          ).toLocaleString()}`}
        />

      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">
          Record Withdrawal / Fund Usage
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Only admins and super-admins can record money withdrawn or used from the system. The system will attach the current staff member’s name, ID, date, and time automatically.
        </p>
        <form onSubmit={handleMovementSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            min="1"
            step="0.01"
            placeholder="Amount (GH₵)"
            value={movementForm.amount}
            onChange={(e) => setMovementForm({ ...movementForm, amount: e.target.value })}
            className="w-full border rounded-lg p-3"
            required
          />
          <input
            type="text"
            placeholder="Reason / purpose"
            value={movementForm.reason}
            onChange={(e) => setMovementForm({ ...movementForm, reason: e.target.value })}
            className="w-full border rounded-lg p-3"
            required
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={movementMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold"
            >
              {movementMutation.isPending ? "Saving..." : "Record Withdrawal / Usage"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">
              Withdrawal History
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Review every recorded withdrawal or fund usage action.
            </p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search withdrawals..."
          value={movementSearch}
          onChange={(e) => setMovementSearch(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reason</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Recorded By</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFundMovements.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-sm text-gray-500 text-center">
                    {fundMovements.length === 0
                      ? "No withdrawals or fund usage actions recorded yet."
                      : "No withdrawals match your search."}
                  </td>
                </tr>
              ) : (
                filteredFundMovements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-semibold text-red-600">{formatCurrency(movement.amount)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{movement.reason}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div>{movement.initiatedBy || "—"}</div>
                      <div className="text-xs text-gray-500">{movement.user?.email || ""}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatDateTime(movement.occurredAt || movement.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search donor..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full border rounded-lg p-3"
      />

      <DonationTable
        donations={
          filteredDonations
        }
        onEdit={(donation) =>
          navigate(
            `/dashboard/donations/edit/${donation.id}`
          )
        }
        onDelete={(id) => {
          if (
            window.confirm(
              "Delete this donation?"
            )
          ) {
            deleteMutation.mutate(
              id
            );
          }
        }}
      />

    </div>
  );
};

export default DonationsManagement;