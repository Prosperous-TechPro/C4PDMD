import { useEffect, useMemo, useRef, useState } from "react";
import { uploadImage } from "../../api/uploadApi/uploadApi";
import RichTextEditor from "./RichTextEditor";

const BlogForm = ({ onSubmit = () => {}, initialData = {}, loading = false, categories = [] }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
    status: initialData.status || "PUBLISHED",
    categoryId: initialData.categoryId || categories[0]?.id || "",
  });
  const [mediaItems, setMediaItems] = useState(
    initialData.media || []
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    if (!formData.categoryId && categories[0]?.id) {
      setFormData((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, formData.categoryId]);

  const mediaPreviews = useMemo(
    () => mediaItems.map((media) => ({
      id: media.id,
      url: media.url,
      type: media.type,
      label: media.type === "video" ? "Video" : "Image",
    })),
    [mediaItems]
  );

  const addMedia = async (file) => {
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const response = await uploadImage(file);
      const mediaUrl = response?.imageUrl || response?.url || response?.data?.imageUrl || "";
      if (!mediaUrl) {
        throw new Error("Upload completed but no file URL was returned.");
      }

      const mediaType = file.type.startsWith("video/") ? "video" : "image";
      const newMedia = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        url: mediaUrl,
        type: mediaType,
      };

      setMediaItems((prev) => [...prev, newMedia]);
    } catch (error) {
      console.error("MEDIA UPLOAD ERROR:", error);
      setUploadError(error?.response?.data?.message || error?.message || "Failed to upload media.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaInput = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    for (const file of files) {
      await addMedia(file);
    }

    e.target.value = "";
  };

  const handleRemoveMedia = (id) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleInsertMedia = (media) => {
    if (!editorRef.current || !media?.url) return;

    editorRef.current.insertMedia(media);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      categoryId: formData.categoryId && !Number.isNaN(Number(formData.categoryId))
        ? Number(formData.categoryId)
        : undefined,
      media: mediaItems,
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
          <input name="title" value={formData.title} onChange={handleChange} required placeholder="Enter blog title" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
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
        <label className="mb-1 block text-sm font-medium text-slate-700">Content</label>
        <RichTextEditor
          ref={editorRef}
          value={formData.content}
          onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
          placeholder="Write the blog content here"
          className="w-full"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Upload Media</label>
          <input type="file" accept="image/*,video/*" multiple onChange={handleMediaInput} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <p className="mt-1 text-xs text-slate-500">Upload one or more images or videos, then click inside the editor where you want them and press Insert on the preview.</p>
          {uploading && <p className="mt-2 text-sm text-blue-600">Uploading media...</p>}
          {uploadError && <p className="mt-2 text-sm text-red-600">{uploadError}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>

      {mediaPreviews.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Media Preview</h3>
            <span className="text-xs text-slate-500">Click preview to insert into the editor</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {mediaPreviews.map((media) => (
              <div key={media.id} className="rounded-2xl border border-slate-200 bg-white p-3">
                <div className="mb-3 overflow-hidden rounded-xl bg-slate-100">
                  {media.type === "video" ? (
                    <video src={media.url} controls className="h-40 w-full object-cover" />
                  ) : (
                    <img src={media.url} alt={media.label} className="h-40 w-full object-cover" />
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleInsertMedia(media)}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    Insert
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(media.id)}
                    className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="submit" disabled={loading || uploading} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Saving..." : uploading ? "Uploading..." : "Save Blog"}</button>
    </form>
  );
};

export default BlogForm;
