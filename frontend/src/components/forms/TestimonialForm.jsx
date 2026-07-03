/**
 * =====================================================
 * TESTIMONIAL FORM
 * =====================================================
 * Used to create and edit testimonials.
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useState } from "react";

import ImageUpload from "./ImageUpload";

const TestimonialForm = ({
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

      image:
        initialData.image || "",

      message:
        initialData.message || "",
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

      {/* CLIENT NAME */}

      <div>

        <label className="block mb-2 font-medium">
          Client Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter client name"
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      {/* CLIENT IMAGE */}

      <div>

        <label className="block mb-2 font-medium">
          Client Image
        </label>

        <ImageUpload
          onUploadSuccess={(url) =>
            setFormData({
              ...formData,
              image: url,
            })
          }
        />

      </div>

      {/* IMAGE PREVIEW */}

      {formData.image && (

        <div>

          <label className="block mb-2 font-medium">
            Preview
          </label>

          <img
            src={formData.image}
            alt="Client"
            className="w-32 h-32 rounded-full object-cover border"
          />

        </div>

      )}

      {/* TESTIMONIAL MESSAGE */}

      <div>

        <label className="block mb-2 font-medium">
          Testimonial
        </label>

        <textarea
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder="Write the testimonial..."
          className="w-full border rounded-lg p-3 resize-none"
          required
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
          : "Save Testimonial"}
      </button>

    </form>
  );
};

export default TestimonialForm;