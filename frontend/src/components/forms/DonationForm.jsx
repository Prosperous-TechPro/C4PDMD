/**
 * =====================================================
 * DONATION FORM
 * =====================================================
 * Used to create and edit donations.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useState } from "react";

const DonationForm = ({
  onSubmit,
  initialData = {},
  loading = false,
}) => {
  /**
   * =====================================================
   * FORM STATE
   * =====================================================
   */

  const [formData, setFormData] =
    useState({
      donorName:
        initialData.donorName || "",

      email:
        initialData.email || "",

      amount:
        initialData.amount || "",

      paymentStatus:
        initialData.paymentStatus ||
        "PENDING",
    });

  /**
   * =====================================================
   * HANDLE CHANGE
   * =====================================================
   */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  /**
   * =====================================================
   * SUBMIT
   * =====================================================
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  /**
   * =====================================================
   * PAGE
   * =====================================================
   */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-xl shadow p-6"
    >

      {/* DONOR NAME */}

      <div>

        <label className="block mb-2 font-medium">
          Donor Name
        </label>

        <input
          type="text"
          name="donorName"
          value={formData.donorName}
          onChange={handleChange}
          placeholder="Enter donor name"
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      {/* EMAIL */}

      <div>

        <label className="block mb-2 font-medium">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      {/* AMOUNT */}

      <div>

        <label className="block mb-2 font-medium">
          Donation Amount (GH₵)
        </label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter donation amount"
          className="w-full border rounded-lg p-3"
          min="0"
          step="0.01"
          required
        />

      </div>

      {/* PAYMENT STATUS */}

      <div>

        <label className="block mb-2 font-medium">
          Payment Status
        </label>

        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="PENDING">
            Pending
          </option>

          <option value="COMPLETED">
            Completed
          </option>

          <option value="FAILED">
            Failed
          </option>

        </select>

      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition"
      >
        {loading
          ? "Saving..."
          : "Save Donation"}
      </button>

    </form>
  );
};

export default DonationForm;