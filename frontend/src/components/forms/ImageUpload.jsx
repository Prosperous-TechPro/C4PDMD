import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { uploadImage } from "../../api/uploadApi/uploadApi";

const ImageUpload = ({
  onUploadSuccess,
  accept = "image/*,video/*",
  label = "Upload media",
  className = "",
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewType, setPreviewType] = useState("image");

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const uploadedUrl = data?.imageUrl || data?.url || "";
      const isVideo = /\.(mp4|mov|webm|ogg|m4v)$/i.test(uploadedUrl) || /\/video\//i.test(uploadedUrl);

      toast.success("Media uploaded");
      setPreviewUrl(uploadedUrl);
      setPreviewType(isVideo ? "video" : "image");
      onUploadSuccess?.(uploadedUrl);
    },
    onError: () => {
      toast.error("Upload failed");
    },
  });

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      mutation.mutate(file);
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type="file" accept={accept} onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100" />

      {mutation.isPending && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}

      {previewUrl && (
        <div className="mt-3">
          {previewType === "video" ? (
            <video controls src={previewUrl} className="h-48 w-full rounded-lg border object-cover" />
          ) : (
            <img src={previewUrl} alt="Uploaded preview" className="h-48 w-full rounded-lg border object-cover" />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;