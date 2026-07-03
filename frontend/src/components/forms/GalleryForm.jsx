/**
 * =====================================================
 * GALLERY FORM
 * =====================================================
 * Used to create and edit gallery items.
 *
 * Supports:
 * - Create Gallery Item
 * - Edit Gallery Item
 * - Cloudinary Upload
 * - Gallery Categories
 *
 * Author : Lucky + ChatGPT
 * Project: C4PDMD Management System
 * =====================================================
 */

import { useState } from "react";

import ImageUpload from "./ImageUpload";

const GalleryForm = ({
  categories = [],
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
      title:
        initialData.title || "",

      image:
        initialData.image || "",

      categoryId:
        initialData.categoryId || "",
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

      {/* TITLE */}

      <div>

        <label className="block mb-2 font-medium">
          Image Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter image title"
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      {/* IMAGE */}

      <div>

        <label className="block mb-2 font-medium">
          Upload Image
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

        <img
          src={formData.image}
          alt="Preview"
          className="w-56 h-40 rounded-lg border object-cover"
        />

      )}

      {/* CATEGORY */}

      <div>

        <label className="block mb-2 font-medium">
          Category
        </label>

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        >

          <option value="">
            Select Category
          </option>

          {categories.map(
            (category) => (

              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>

            )
          )}

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
          : "Save Gallery Item"}
      </button>

    </form>
  );
};

export default GalleryForm;