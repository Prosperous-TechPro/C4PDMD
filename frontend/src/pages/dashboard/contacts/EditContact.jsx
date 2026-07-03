/**
 * =====================================================
 * EDIT CONTACT
 * =====================================================
 * View and manage a contact message.
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
  getMessageById,
  updateMessage,
} from "../../../api/contact/contactApi";

import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const EditContact = () => {
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
   * FETCH MESSAGE
   * =====================================================
   */

  const {
    data: messageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["message", id],
    queryFn: () =>
      getMessageById(id),
    enabled: !!id,
  });

  /**
   * =====================================================
   * UPDATE STATUS
   * =====================================================
   */

  const updateMutation =
    useMutation({
      mutationFn: (status) =>
        updateMessage(id, {
          status,
        }),

      onSuccess: () => {
        toast.success(
          "Message updated successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "messages",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "message",
            id,
          ],
        });
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to update message."
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
      <ErrorMessage message="Failed to load contact message." />
    );
  }

  const message =
    messageData?.data;

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
            Contact Message
          </h1>

          <p className="text-gray-500 mt-2">
            View message details.
          </p>

        </div>

        <button
          onClick={() =>
            navigate(
              "/dashboard/contacts"
            )
          }
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">

        <div>

          <label className="block font-semibold mb-1">
            Name
          </label>

          <input
            type="text"
            value={message?.name || ""}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />

        </div>

        <div>

          <label className="block font-semibold mb-1">
            Email
          </label>

          <input
            type="email"
            value={message?.email || ""}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />

        </div>

        <div>

          <label className="block font-semibold mb-1">
            Subject
          </label>

          <input
            type="text"
            value={message?.subject || ""}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />

        </div>

        <div>

          <label className="block font-semibold mb-1">
            Message
          </label>

          <textarea
            rows={8}
            value={message?.message || ""}
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100 resize-none"
          />

        </div>

        <div>

          <label className="block font-semibold mb-2">
            Status
          </label>

          <span
            className={`px-4 py-2 rounded-lg text-white ${
              message?.status ===
              "READ"
                ? "bg-green-600"
                : "bg-yellow-500"
            }`}
          >
            {message?.status}
          </span>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() =>
              updateMutation.mutate(
                "READ"
              )
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Mark as Read
          </button>

          <button
            onClick={() =>
              updateMutation.mutate(
                "NEW"
              )
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
          >
            Mark as New
          </button>

          <button
            onClick={() =>
              window.location.href = `mailto:${message?.email}?subject=Re: ${message?.subject}`
            }
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Reply
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditContact;