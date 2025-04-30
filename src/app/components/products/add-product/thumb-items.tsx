import React, { useState } from "react";
import Image from "next/image";
import { notifySuccess, notifyError } from "@/utils/toast";
import { useDeleteCloudinaryImgMutation } from "@/redux/cloudinary/cloudinaryApi";

type IPropType = {
	uploadItems: { url: string; id: string }[];
	onDeleteImage?: (deletedIndex: number) => void;
};

const ThumbItems = ({ uploadItems, onDeleteImage }: IPropType) => {
	// Track which image is currently being deleted
	const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

	const [
		deleteCloudinaryImg,
		{ isLoading: delLoading }
	] = useDeleteCloudinaryImgMutation();

	const handleDeleteImg = async (file: { url: string; id: string }, index: number) => {
		// Set the current deleting index
		setDeletingIndex(index);

		try {
			console.log("Deleting image with details:", { file, index });

			// Extract ID information
			const id = file.id;

			// If there's no ID to delete, just notify the parent component
			if (!id || id === "") {
				console.log("No ID available for deletion, removing from UI only");
				if (onDeleteImage) {
					onDeleteImage(index);
				}
				notifySuccess("Image removed from gallery");
				setDeletingIndex(null);
				return;
			}

			// Get folder_name and public_id from the id string
			let folder_name = "";
			let public_id = id;

			// Check if ID contains a folder structure
			if (id.includes("/")) {
				[folder_name, public_id] = id.split("/");
				console.log("Extracted folder and ID:", { folder_name, public_id });
			}

			// Call the delete API
			const result = await deleteCloudinaryImg({
				folder_name,
				id: public_id,
			}).unwrap();

			console.log("Delete API response:", result);

			// Notify parent component to update its state
			if (onDeleteImage) {
				onDeleteImage(index);
			}

			notifySuccess("Image deleted successfully");
		} catch (error) {
			console.error("Error deleting image:", error);
			notifyError("Failed to delete image. Please try again.");
		} finally {
			// Reset deleting state
			setDeletingIndex(null);
		}
	};

	return (
		<>
			{uploadItems.map((file, i) => (
				<div
					key={i}
					className="relative inline-block mr-5 group"
				>
					<Image
						className="inline-flex border-2 border-gray-100 w-24 max-h-24 object-cover"
						src={file.url}
						alt="thumb image"
						width={120}
						height={120}
					/>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleDeleteImg(file, i);
						}}
						disabled={delLoading || deletingIndex !== null}
						className="absolute -top-2 -right-2 text-white rounded-full w-6 h-6 flex items-center justify-center group-hover:opacity-100 transition-opacity"
						aria-label="Delete image" style={{ backgroundColor: "red" }}
					>
						{deletingIndex === i ? "..." : "×"}
					</button>
				</div>
			))}
		</>
	);
};

export default ThumbItems;