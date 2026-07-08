import { useEffect } from "react";
import { useForm } from "react-hook-form";

import ImageUpload from "./ImageUpload";

const TeamForm = ({ onSubmit = () => {}, initialData = {}, loading = false }) => {
  const isEdit = Boolean(initialData && initialData.id);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      position: "",
      biography: "",
      image: "",
      linkedin: "",
      facebook: "",
      twitter: "",
      whatsapp: "",
    }
  });

  useEffect(() => {
    if (!initialData || !initialData.id) {
      return;
    }

    reset({
      name: initialData.name || "",
      position: initialData.position || "",
      biography: initialData.biography || "",
      image: initialData.image || "",
      linkedin: initialData.linkedin || "",
      facebook: initialData.facebook || "",
      twitter: initialData.twitter || "",
      whatsapp: initialData.whatsapp || "",
    });
  }, [initialData?.id, initialData?.name, initialData?.position, initialData?.biography, initialData?.image, initialData?.linkedin, initialData?.facebook, initialData?.twitter, initialData?.whatsapp, reset]);

  const imageValue = watch("image");
  const isVideoUrl = (value) => /\.(mp4|mov|webm|ogg|m4v)$/i.test(value || "");

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

  const submit = (values) => {
    const normalized = {
      ...values,
      linkedin: normalizeSocialValue("linkedin", values.linkedin),
      facebook: normalizeSocialValue("facebook", values.facebook),
      twitter: normalizeSocialValue("twitter", values.twitter),
      whatsapp: normalizeSocialValue("whatsapp", values.whatsapp),
    };

    onSubmit(normalized);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white p-6 rounded-xl shadow border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input {...register("name", { required: "Name is required" })} className="mt-1 w-full border rounded p-2" />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Position</label>
          <input {...register("position", { required: "Position is required" })} className="mt-1 w-full border rounded p-2" />
          {errors.position && <p className="text-red-600 text-sm mt-1">{errors.position.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Biography</label>
          <textarea {...register("biography")} rows={4} className="mt-1 w-full border rounded p-2" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Social Media</label>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input {...register("linkedin")} className="mt-1 w-full border rounded p-2" placeholder="https://linkedin.com/in/handle or @handle" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Facebook</label>
              <input {...register("facebook")} className="mt-1 w-full border rounded p-2" placeholder="https://facebook.com/handle or @handle" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">X (Twitter)</label>
              <input {...register("twitter")} className="mt-1 w-full border rounded p-2" placeholder="https://x.com/handle or @handle" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
              <input {...register("whatsapp")} className="mt-1 w-full border rounded p-2" placeholder="Phone number or full URL" />
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">You can enter a full link or just the handle/phone number. The system will save it as a working profile link.</p>
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
                <img src={imageValue} alt="Team preview" className="h-48 w-full rounded-lg border object-cover" />
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

export default TeamForm;
