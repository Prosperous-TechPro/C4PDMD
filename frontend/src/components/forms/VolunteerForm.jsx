/**
 * =====================================================
 * VOLUNTEER FORM
 * =====================================================
 * Used to create and edit volunteers.
 *
 * Supports:
 * - Create Volunteer
 * - Edit Volunteer
 * - Resume Upload (URL)
 * - Status Management
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useState } from "react";

const VolunteerForm = ({
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
      name:
        initialData.name || "",

      email:
        initialData.email || "",

      phone:
        initialData.phone || "",

      skills:
        initialData.skills || "",

      resume:
        initialData.resume || "",

      status:
        initialData.status ||
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

      {/* NAME */}

      <div>

        <label className="block mb-2 font-medium">
          Full Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      {/* EMAIL */}

      <div>

        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      {/* PHONE */}

      <div>

        <label className="block mb-2 font-medium">
          Phone
        </label>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      {/* SKILLS */}

      <div>

        <label className="block mb-2 font-medium">
          Skills
        </label>

        <textarea
          rows={4}
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="List volunteer skills..."
          className="w-full border rounded-lg p-3 resize-none"
          required
        />

      </div>

      {/* RESUME */}

      <div>

        <label className="block mb-2 font-medium">
          Resume URL
        </label>

        <input
          type="text"
          name="resume"
          value={formData.resume}
          onChange={handleChange}
          placeholder="Paste uploaded resume URL"
          className="w-full border rounded-lg p-3"
        />

      </div>

      {/* STATUS */}

      <div>

        <label className="block mb-2 font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="PENDING">
            Pending
          </option>

          <option value="APPROVED">
            Approved
          </option>

          <option value="REJECTED">
            Rejected
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
          : "Save Volunteer"}
      </button>

    </form>
  );
};

export default VolunteerForm;