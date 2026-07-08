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

import { useEffect, useState } from "react";

import ImageUpload from "./ImageUpload";

const PartnerForm = ({
  onSubmit,
  initialData = {},
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    logo: initialData.logo || "",
    description: initialData.description || "",
    website: initialData.website || "",
    linkedin: initialData.linkedin || "",
    facebook: initialData.facebook || "",
    twitter: initialData.twitter || "",
    whatsapp: initialData.whatsapp || "",
  });

  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      logo: initialData.logo || "",
      description: initialData.description || "",
      website: initialData.website || "",
      linkedin: initialData.linkedin || "",
      facebook: initialData.facebook || "",
      twitter: initialData.twitter || "",
      whatsapp: initialData.whatsapp || "",
    });
  }, [initialData?.id, initialData?.name, initialData?.logo, initialData?.description, initialData?.website, initialData?.linkedin, initialData?.facebook, initialData?.twitter, initialData?.whatsapp]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const normalizeSocialValue = (type, value) => {
    if (!value) return "";

    const trimmed = String(value).trim();
    if (!trimmed) return "";

    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }

    const handle = trimmed.replace(/^@/, "");

    switch (type) {
      case "linkedin":
        return `https://www.linkedin.com/in/${handle}`;
      case "facebook":
        return `https://www.facebook.com/${handle}`;
      case "twitter":
        return `https://x.com/${handle}`;
      case "whatsapp":
        return `https://wa.me/${handle}`;
      default:
        return trimmed;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalized = {
      ...formData,
      linkedin: normalizeSocialValue("linkedin", formData.linkedin),
      facebook: normalizeSocialValue("facebook", formData.facebook),
      twitter: normalizeSocialValue("twitter", formData.twitter),
      whatsapp: normalizeSocialValue("whatsapp", formData.whatsapp),
    };

    onSubmit(normalized);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow p-6">
      <div>
        <label className="block mb-2 font-medium">Partner Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter partner name" className="w-full border rounded-lg p-3" required />
      </div>

      <div>
        <label className="block mb-2 font-medium">Partner Logo</label>
        <ImageUpload onUploadSuccess={(url) => setFormData({ ...formData, logo: url })} label="Upload a partner logo or image from your device" />
      </div>

      {formData.logo && (
        <div>
          <label className="block mb-2 font-medium">Logo Preview</label>
          <img src={formData.logo} alt="Partner Logo" className="w-40 h-40 object-contain rounded-lg border p-2" />
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Add a short description about the partner" className="w-full border rounded-lg p-3" />
      </div>

      <div>
        <label className="block mb-2 font-medium">Website</label>
        <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" className="w-full border rounded-lg p-3" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">LinkedIn</label>
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/handle or @handle" className="w-full border rounded-lg p-3" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Facebook</label>
          <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="https://facebook.com/handle or @handle" className="w-full border rounded-lg p-3" />
        </div>
        <div>
          <label className="block mb-2 font-medium">X (Twitter)</label>
          <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="https://x.com/handle or @handle" className="w-full border rounded-lg p-3" />
        </div>
        <div>
          <label className="block mb-2 font-medium">WhatsApp</label>
          <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="Phone number or full URL" className="w-full border rounded-lg p-3" />
        </div>
      </div>

      <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition">
        {loading ? "Saving..." : "Save Partner"}
      </button>
    </form>
  );
};

export default PartnerForm;
