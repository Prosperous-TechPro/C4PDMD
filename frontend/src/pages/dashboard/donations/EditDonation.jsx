/**
 * =====================================================
 * EDIT DONATION
 * =====================================================
 * Edit an existing donation.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useNavigate, useParams } from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
  getDonationById,
  updateDonation,
} from "../../../api/donations/donationApi";

import DonationForm from "../../../components/forms/DonationForm";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const EditDonation = () => {
  /**
   * =====================================================
   * HOOKS
   * =====================================================
   */

  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient =
    useQueryClient();

  /**
   * =====================================================
   * FETCH DONATION
   * =====================================================
   */

  const {
    data: donationData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: () =>
      getDonationById(id),
    enabled: !!id,
  });

  /**
   * =====================================================
   * UPDATE DONATION
   * =====================================================
   */

  const updateMutation =
    useMutation({
      mutationFn: (data) =>
        updateDonation(
          id,
          data
        ),

      onSuccess: () => {
        toast.success(
          "Donation updated successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "donations",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "donation",
            id,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "donationStats",
          ],
        });

        navigate(
          "/dashboard/donations"
        );
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to update donation."
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
      <ErrorMessage message="Failed to load donation." />
    );
  }

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Donation
        </h1>

        <p className="text-gray-500 mt-2">
          Update donation information.
        </p>

      </div>

      <DonationForm
        initialData={
          donationData?.data
        }
        loading={
          updateMutation.isPending
        }
        onSubmit={(data) =>
          updateMutation.mutate(
            data
          )
        }
      />

    </div>
  );
};

export default EditDonation;