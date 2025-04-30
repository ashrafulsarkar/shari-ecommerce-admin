import { useState } from "react";
import { useUploadImageMutation } from "@/redux/cloudinary/cloudinaryApi";
import { ImageURL } from "./useProductSubmit";
import { notifyError, notifySuccess } from "@/utils/toast";
import { ICloudinaryPostResponse } from "@/redux/cloudinary/type";

const useMultipleImageUpload = (
  setImageURLs: React.Dispatch<React.SetStateAction<ImageURL[]>>
) => {
  const [uploadImage] = useUploadImageMutation();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setIsUploading(true);

      try {
        // Upload each file and collect promises
        const uploadPromises = files.map((file) => {
          const formData = new FormData();
          formData.append("image", file);
          return uploadImage(formData);
        });

        // Wait for all uploads to complete
        const results = await Promise.all(uploadPromises);

        // Filter successful uploads and update state
        const successfulUploads = results
          .filter((result): result is { data: ICloudinaryPostResponse } => 
            'data' in result && result.data?.data?.url !== undefined
          )
          .map(result => ({
            img: result.data.data.url,
            id: result.data.data.public_id || result.data.data.asset_id || "",
            color: { name: "", clrCode: "" },
            sizes: []
          }));

        if (successfulUploads.length > 0) {
          setImageURLs(prevUrls => {
            // Filter out any undefined values
            const validPrevUrls = prevUrls.filter(url => url !== undefined);
            return [...validPrevUrls, ...successfulUploads];
          });
          notifySuccess(`${successfulUploads.length} image(s) uploaded successfully`);
        }

        // Check if any uploads failed
        const failedUploads = results.filter(result => 'error' in result);
        if (failedUploads.length > 0) {
          notifyError(`${failedUploads.length} image(s) failed to upload`);
        }
        
        // Reset the file input to allow re-uploading
        e.target.value = '';
      } catch (error) {
        console.error("Failed to upload images:", error);
        notifyError("Failed to upload images");
        // Reset the file input even if there's an error
        e.target.value = '';
      } finally {
        setIsUploading(false);
      }
    }
  };

  return {
    handleMultipleImageUpload,
    isUploading
  };
};

export default useMultipleImageUpload;