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
  deleteDonation,
} from "../../../api/donations/donationApi";

import StatsCard from "../../../components/cards/StatsCard";
import DonationTable from "../../../components/tables/DonationTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

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

      onSuccess: () => {
        toast.success(
          "Donation deleted successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "donations",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "donationStats",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to delete donation."
        );
      },
    });

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

  const filteredDonations =
    donations.filter((donation) =>
      donation.donorName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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
          title="Total Amount"
          value={`GH₵ ${Number(
            stats.totalAmount || 0
          ).toLocaleString()}`}
        />

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