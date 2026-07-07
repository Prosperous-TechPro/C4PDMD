import { useEffect } from "react";
import { useForm } from "react-hook-form";

import ImageUpload from "./ImageUpload";

const ServiceForm = ({ onSubmit = () => {}, initialData = {}, loading = false }) => {
  const isEdit = Boolean(initialData && initialData.id);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      status: "ACTIVE",
    }
  });

  useEffect(() => {
    if (!initialData || !initialData.id) {
      return;
    }

    reset({
      title: initialData.title || "",
      description: initialData.description || "",
      image: initialData.image || "",
      status: initialData.status || "ACTIVE",
    });
  }, [initialData?.id, initialData?.title, initialData?.description, initialData?.image, initialData?.status, reset]);

  const imageValue = watch("image");
  const isVideoUrl = (value) => /\.(mp4|mov|webm|ogg|m4v)$/i.test(value || "");

  const submit = (values) => onSubmit(values);

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white p-6 rounded-xl shadow border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input {...register("title", { required: "Title is required" })} className="mt-1 w-full border rounded p-2" />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select {...register("status")} className="mt-1 w-full border rounded p-2">
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea {...register("description")} rows={4} className="mt-1 w-full border rounded p-2" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Media</label>
          <div className="mt-1 space-y-3">
            <ImageUpload onUploadSuccess={(url) => setValue("image", url)} label="Upload a picture or video from your device" />
            <input {...register("image")} className="w-full border rounded p-2" placeholder="Or paste an image/video URL" />
            {imageValue ? (
              isVideoUrl(imageValue) ? (
                <video controls src={imageValue} className="h-48 w-full rounded-lg border object-cover" />
              ) : (
                <img src={imageValue} alt="Service preview" className="h-48 w-full rounded-lg border object-cover" />
              )
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? "Saving..." : isEdit ? "Update" : "Create"}</button>
        <button type="button" onClick={() => reset()} className="bg-gray-100 px-4 py-2 rounded">Reset</button>
      </div>
    </form>
  );
};

export default ServiceForm;
