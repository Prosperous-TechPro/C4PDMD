/**
 * =====================================================
 * CONTACTS MANAGEMENT
 * =====================================================
 * Admin page for managing contact messages.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
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
  getMessages,
  updateMessage,
  deleteMessage,
} from "../../../api/contact/contactApi";

import ContactTable from "../../../components/tables/ContactTable";
import PageLoader from "../../../components/loaders/PageLoader";
import ErrorMessage from "../../../components/common/ErrorMessage";

const ContactsManagement = () => {
  const navigate = useNavigate();

  const queryClient =
    useQueryClient();

  const [search, setSearch] =
    useState("");

  /**
   * Fetch Messages
   */

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });

  /**
   * Update Status
   */

  const updateMutation =
    useMutation({
      mutationFn: ({
        id,
        status,
      }) =>
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
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to update message."
        );
      },
    });

  /**
   * Delete Message
   */

  const deleteMutation =
    useMutation({
      mutationFn:
        deleteMessage,

      onSuccess: () => {
        toast.success(
          "Message deleted successfully."
        );

        queryClient.invalidateQueries({
          queryKey: [
            "messages",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          error.message ||
            "Failed to delete message."
        );
      },
    });

  /**
   * Loading
   */

  if (isLoading) {
    return <PageLoader />;
  }

  /**
   * Error
   */

  if (error) {
    return (
      <ErrorMessage message="Failed to load contact messages." />
    );
  }

  /**
   * Filter
   */

  const messages =
    data?.data || [];

  const filteredMessages =
    messages.filter(
      (message) =>
        message.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        message.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        message.subject
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Contact Messages
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage messages
            sent from the website.
          </p>

        </div>

      </div>

      <input
        type="text"
        placeholder="Search by name, email or subject..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full border rounded-lg p-3"
      />

      <ContactTable
        messages={
          filteredMessages
        }
        onView={(message) => {
          updateMutation.mutate({
            id: message.id,
            status: "READ",
          });

          navigate(
            `/dashboard/contacts/edit/${message.id}`
          );
        }}
        onDelete={(id) => {
          if (
            window.confirm(
              "Delete this message?"
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

export default ContactsManagement;