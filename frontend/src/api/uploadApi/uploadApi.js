import API from "../axios";

/**
 * Upload Image to Cloudinary
 */
export const uploadImage = async (file) => {

  const formData = new FormData();

  formData.append(
    "image",
    file
  );

  const response = await API.post(
    "/upload/image",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};