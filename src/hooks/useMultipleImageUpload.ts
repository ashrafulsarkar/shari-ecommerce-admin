import { useUploadImageMutation } from "@/redux/cloudinary/cloudinaryApi";
import { ImageURL } from "./useProductSubmit";
import { notifyError } from "@/utils/toast";
import { ICloudinaryPostResponse } from "@/redux/cloudinary/type";

const useMultipleImageUpload = (
  setImageURLs: React.Dispatch<React.SetStateAction<ImageURL[]>>
) => {
  const [uploadImage] = useUploadImageMutation();

  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      // Upload each file and collect promises
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("image", file);
        return uploadImage(formData);
      });

      try {
        // Wait for all uploads to complete
        const results = await Promise.all(uploadPromises);

        // Filter successful uploads and update state
        const successfulUploads = results
          .filter((result): result is { data: ICloudinaryPostResponse } => 
            'data' in result && result.data?.data?.url !== undefined
          )
          .map(result => ({
            img: result.data.data.url,
            color: { name: "", clrCode: "" },
            sizes: []
          }));

        if (successfulUploads.length > 0) {
          setImageURLs(prevUrls => [...prevUrls, ...successfulUploads]);
        }

        // Check if any uploads failed
        const failedUploads = results.filter(result => 'error' in result);
        if (failedUploads.length > 0) {
          notifyError("Some images failed to upload");
        }
      } catch (error) {
        notifyError("Failed to upload images");
      }
    }
  };

  return {
    handleMultipleImageUpload
  };
};

export default useMultipleImageUpload;