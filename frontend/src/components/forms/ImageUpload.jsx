import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { uploadImage } from "../../api/uploadApi/uploadApi";

const ImageUpload = ({
  onUploadSuccess,
  accept = "image/*,video/*",
  label = "Upload media",
  className = "",
}) => {
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      toast.success("Media uploaded");
      onUploadSuccess?.(data.imageUrl);
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
    </div>
  );
};

export default ImageUpload;