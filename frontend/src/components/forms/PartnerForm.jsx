/**
 * =====================================================
 * PARTNER FORM
 * =====================================================
 * Used to create and edit partners.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useState } from "react";

import ImageUpload from "./ImageUpload";

const PartnerForm = ({
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

      logo:
        initialData.logo || "",

      website:
        initialData.website || "",
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
   * HANDLE SUBMIT
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

      {/* PARTNER NAME */}

      <div>

        <label className="block mb-2 font-medium">
          Partner Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter partner name"
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      {/* LOGO */}

      <div>

        <label className="block mb-2 font-medium">
          Partner Logo
        </label>

        <ImageUpload
          onUploadSuccess={(url) =>
            setFormData({
              ...formData,
              logo: url,
            })
          }
        />

      </div>

      {/* LOGO PREVIEW */}

      {formData.logo && (

        <div>

          <label className="block mb-2 font-medium">
            Logo Preview
          </label>

          <img
            src={formData.logo}
            alt="Partner Logo"
            className="w-40 h-40 object-contain rounded-lg border p-2"
          />

        </div>

      )}

      {/* WEBSITE */}

      <div>

        <label className="block mb-2 font-medium">
          Website
        </label>

        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full border rounded-lg p-3"
        />

      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition"
      >
        {loading
          ? "Saving..."
          : "Save Partner"}
      </button>

    </form>
  );
};

export default PartnerForm;