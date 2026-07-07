import { useEffect, useState } from "react";

import ImageUpload from "./ImageUpload";

const ProjectForm = ({ onSubmit = () => {}, initialData = {}, loading = false, categories = [] }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    image: initialData.image || "",
    status: initialData.status || "ACTIVE",
    categoryId: initialData.categoryId || categories[0]?.id || "",
  });

  useEffect(() => {
    if (!formData.categoryId && categories[0]?.id) {
      setFormData((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, formData.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isVideoUrl = (value) => /\.(mp4|mov|webm|ogg|m4v)$/i.test(value || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      categoryId: formData.categoryId && !Number.isNaN(Number(formData.categoryId))
        ? Number(formData.categoryId)
        : undefined,
    };

    if (!payload.categoryId) {
      delete payload.categoryId;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required placeholder="Enter project title" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
          <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500">
            {categories.length ? categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            )) : <option value="">No categories available</option>}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required rows={6} placeholder="Describe the project" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Media</label>
          <div className="space-y-3">
            <ImageUpload onUploadSuccess={(url) => setFormData((prev) => ({ ...prev, image: url }))} label="Upload a picture or video from your device" />
            <input name="image" value={formData.image} onChange={handleChange} placeholder="Or paste an image/video URL" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
            {formData.image ? (
              isVideoUrl(formData.image) ? (
                <video controls src={formData.image} className="h-48 w-full rounded-lg border object-cover" />
              ) : (
                <img src={formData.image} alt="Project preview" className="h-48 w-full rounded-lg border object-cover" />
              )
            ) : null}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Saving..." : "Save Project"}</button>
    </form>
  );
};

export default ProjectForm;
