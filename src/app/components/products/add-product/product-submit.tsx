"use client";
import React, { useRef, useEffect } from "react";
import useProductSubmit from "@/hooks/useProductSubmit";
import DescriptionTextarea from "./description-textarea";
import ProductBrand from "./product-brand";
import ProductType from "./product-type";
import AdditionalInformation from "./additional-information";
import ProductImgUpload from "./product-img-upload";
import ProductCategory from "../../category/product-category";
import Tags from "./tags";
import FormField from "../form-field";
import useMultipleImageUpload from "@/hooks/useMultipleImageUpload";
import ThumbItems from "./thumb-items";
import TiptapEditor from "../../TiptapEditor/TiptapEditor";

const ProductSubmit = () => {
	const {
		handleSubmit,
		handleSubmitProduct,
		register,
		errors,
		tags,
		setTags,
		setAdditionalInformation,
		additionalInformation,
		control,
		setCategory,
		setParent,
		setImg,
		img,
		setBrand,
		setType,
		setImageURLs,
		isSubmitted,
		imageURLs,
		setDescription,
		description
	} = useProductSubmit();

	const { handleMultipleImageUpload, isUploading } = useMultipleImageUpload(setImageURLs);

	// Reference to file input for resetting
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Create a derived array for ThumbItems that always has the correct format
	const galleryItems = imageURLs.map(url => {
		if (typeof url === 'string') {
			return { url, id: '' };
		} else {
			return {
				url: url.img || '',
				id: url.id || '',
			};
		}
	});

	// Listen to changes in imageURLs to update ThumbItems
	useEffect(() => {
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, [imageURLs.length]);
	console.log(description)

	return (
		<form onSubmit={handleSubmit(handleSubmitProduct)}>
			<div className="grid grid-cols-12 gap-6 mb-6">
				{/* left side */}
				<div className="col-span-12 xl:col-span-8 2xl:col-span-9">
					<div className="mb-6 bg-white px-8 py-8 rounded-md">
						<h4 className="text-[22px]">General</h4>
						<FormField
							title="title"
							isRequired={true}
							placeHolder="Product Title"
							register={register}
							errors={errors}
						/>
						{/* <DescriptionTextarea register={register} errors={errors} /> */}
					</div>
					<div className="mb-6 bg-white px-8 py-8 rounded-md">
						<h4>Product description</h4>
						<TiptapEditor onChange={(html) => setDescription(html)} />
					</div>

					<div className="bg-white px-8 py-8 rounded-md mb-6">
						<div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-x-6">
							<FormField
								title="price"
								isRequired={true}
								placeHolder="Product price"
								bottomTitle="Set the base price of product."
								type="number"
								register={register}
								errors={errors}
							/>
							<FormField
								title="quantity"
								isRequired={true}
								placeHolder="Quantity"
								bottomTitle="Enter the product quantity."
								type="number"
								register={register}
								errors={errors}
							/>
							<FormField
								title="discount"
								type="number"
								isRequired={false}
								placeHolder="Discount"
								bottomTitle="Product Discount Percentage."
								register={register}
								errors={errors}
							/>
							<FormField
								title="count"
								isRequired={false}
								placeHolder="Count"
								bottomTitle="Enter the product count."
								type="number"
								register={register}
								errors={errors}
							/>
						</div>
					</div>

					<div className="bg-white px-8 py-8 rounded-md mb-6">
						<div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-6">
							<ProductBrand
								register={register}
								errors={errors}
								control={control}
								setSelectBrand={setBrand}
							/>
							<ProductType
								register={register}
								errors={errors}
								control={control}
								setSelectType={setType}
							/>
						</div>
					</div>

					{/* additional information page start */}
					<AdditionalInformation
						setAdditionalInformation={setAdditionalInformation}
					/>
					{/* additional information page end */}

					{/* Image Gallery */}
					<div className="bg-white px-8 py-8 rounded-md mb-6">
						<h4 className="text-[18px] mb-4">Product Gallery</h4>
						<div className="flex flex-wrap gap-4">
							{galleryItems.length > 0 && (
								<ThumbItems uploadItems={galleryItems} />
							)}
						</div>
						<input
							type="file"
							id="gallery_image"
							className="hidden"
							multiple
							accept="image/*"
							onChange={handleMultipleImageUpload}
							ref={fileInputRef}
							disabled={isUploading}
						/>
						<label
							htmlFor="gallery_image"
							className={`mt-4 text-tiny w-full inline-block py-2 px-4 rounded-md border border-gray6 text-center ${isUploading
									? "bg-gray-300 cursor-not-allowed"
									: "hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme"
								} transition`}
						>
							{isUploading ? "Uploading..." : "Add Gallery Images"}
						</label>
					</div>
				</div>

				{/* right side */}
				<div className="col-span-12 xl:col-span-4 2xl:col-span-3">
					<ProductImgUpload
						imgUrl={img}
						setImgUrl={setImg}
						isSubmitted={isSubmitted}
					/>

					<div className="bg-white px-8 py-8 rounded-md mb-6">
						<p className="mb-5 text-base text-black">Product Category <span className="text-red">*</span></p>
						{/* category start */}
						<div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
							<ProductCategory
								setCategory={setCategory}
								setParent={setParent}
							/>
						</div>
					</div>

					<div className="bg-white px-8 py-8 rounded-md mb-6">
						<p className="mb-5 text-base text-black">Product Tags</p>
						{/* tags start */}
						<div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
							<Tags tags={tags} setTags={setTags} />
						</div>
					</div>
				</div>
			</div>
			<button className="tp-btn px-5 py-2 mt-5" type="submit">
				Submit Product
			</button>
		</form>
	);
};

export default ProductSubmit;