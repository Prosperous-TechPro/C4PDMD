/**
 * =====================================================
 * EDIT PARTNER
 * =====================================================
 * Edit an existing partner.
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
  getPartnerById,
  updatePartner,
} from "../../../api/partners/partnerApi";

import PartnerForm from "../../../components/forms/PartnerForm";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const EditPartner = () => {
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
   * FETCH PARTNER
   * =====================================================
   */

  const {
    data: partnerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["partner", id],
    queryFn: () =>
      getPartnerById(id),
    enabled: !!id,
  });

  /**
   * =====================================================
   * UPDATE PARTNER
   * =====================================================
   */

  const updateMutation =
    useMutation({
      mutationFn: (data) =>
        updatePartner(
          id,
          data
        ),

      onSuccess: () => {
        toast.success(
          "Partner updated successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "partners",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "partner",
            id,
          ],
        });

        navigate(
          "/dashboard/partners"
        );
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to update partner."
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
      <ErrorMessage message="Failed to load partner." />
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
          Edit Partner
        </h1>

        <p className="text-gray-500 mt-2">
          Update partner information.
        </p>

      </div>

      <PartnerForm
        initialData={
          partnerData?.data
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

export default EditPartner;