import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { uploadImage } from "../../api/uploadApi/uploadApi";

const ImageUpload = ({
  onUploadSuccess,
}) => {

  const mutation =
    useMutation({
      mutationFn:
        uploadImage,

      onSuccess: (
        data
      ) => {

        toast.success(
          "Image Uploaded"
        );

        onUploadSuccess(
          data.imageUrl
        );
      },

      onError: () => {
        toast.error(
          "Upload Failed"
        );
      },
    });

  const handleChange =
    (e) => {

      const file =
        e.target.files[0];

      if (file) {
        mutation.mutate(
          file
        );
      }
    };

  return (
    <div>

      <input
        type="file"
        accept="image/*"
        onChange={
          handleChange
        }
      />

      {mutation.isPending && (
        <p>
          Uploading...
        </p>
      )}

    </div>
  );
};

export default ImageUpload;