/**
 * =====================================================
 * PARTNERS MANAGEMENT
 * =====================================================
 * Admin page for managing organization partners.
 *
 * Features:
 * - View partners
 * - Search partners
 * - Add partner
 * - Edit partner
 * - Delete partner
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
  getPartners,
  createPartner,
  deletePartner,
} from "../../../api/partners/partnerApi";

import PartnerForm from "../../../components/forms/PartnerForm";
import PartnerTable from "../../../components/tables/PartnerTable";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const PartnersManagement = () => {
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

  const [showForm, setShowForm] =
    useState(false);

  const [search, setSearch] =
    useState("");

  /**
   * =====================================================
   * FETCH PARTNERS
   * =====================================================
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["partners"],
    queryFn: getPartners,
  });

  /**
   * =====================================================
   * CREATE PARTNER
   * =====================================================
   */

  const createMutation =
    useMutation({
      mutationFn:
        createPartner,

      onSuccess: () => {
        toast.success(
          "Partner added successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "partners",
          ],
        });

        setShowForm(false);
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to add partner."
        );
      },
    });

  /**
   * =====================================================
   * DELETE PARTNER
   * =====================================================
   */

  const deleteMutation =
    useMutation({
      mutationFn:
        deletePartner,

      onSuccess: () => {
        toast.success(
          "Partner deleted successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "partners",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to delete partner."
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
      <ErrorMessage message="Failed to load partners." />
    );
  }

  /**
   * =====================================================
   * DATA
   * =====================================================
   */

  const partners =
    data?.data || [];

  const filteredPartners =
    partners.filter((partner) =>
      partner.name
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

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Partners Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage organization
            partners.
          </p>

        </div>

        <button
          onClick={() =>
            setShowForm(
              !showForm
            )
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          {showForm
            ? "Close Form"
            : "Add Partner"}
        </button>

      </div>

      <input
        type="text"
        placeholder="Search partner..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full border rounded-lg p-3"
      />

      {showForm && (
        <PartnerForm
          loading={
            createMutation.isPending
          }
          onSubmit={(data) =>
            createMutation.mutate(
              data
            )
          }
        />
      )}

      <PartnerTable
        partners={
          filteredPartners
        }
        onEdit={(partner) =>
          navigate(
            `/dashboard/partners/edit/${partner.id}`
          )
        }
        onDelete={(id) => {
          if (
            window.confirm(
              "Delete this partner?"
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

export default PartnersManagement;