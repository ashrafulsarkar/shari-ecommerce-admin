"use client";
import React from "react";
import useProductSubmit from "@/hooks/useProductSubmit";
import DescriptionTextarea from "../add-product/description-textarea";
import ProductBrand from "../add-product/product-brand";
import ProductType from "../add-product/product-type";
import AdditionalInformation from "../add-product/additional-information";
import ProductImgUpload from "../add-product/product-img-upload";
import ProductCategory from "../../category/product-category";
import Tags from "../add-product/tags";
import FormField from "../form-field";
import ErrorMsg from "../../common/error-msg";
import ThumbItems from "../add-product/thumb-items";
import useMultipleImageUpload from "@/hooks/useMultipleImageUpload";

const EditProductSubmit = ({ id, product }: { id: string; product: any }) => {
	const {
		handleSubmit,
		handleEditProduct,
		register,
		errors,
		tags,
		setTags,
		setAdditionalInformation,
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
	} = useProductSubmit();

	const { handleMultipleImageUpload } = useMultipleImageUpload(setImageURLs);

	React.useEffect(() => {
		const initializeProductData = () => {
			if (!product) return;

			// Initialize all state in a single effect
			const updates = {
				tags: product.tags || [],
				img: product.img || '',
				imageURLs: product.imageURLs ? product.imageURLs.map((url: string | { img: string }) => {
					if (typeof url === 'string') return { img: url };
					return url.img ? url : { img: '' };
				}) : [],
				brand: {
					id: typeof product.brand === 'string' ? 
						product.brand : 
						(product.brand?._id || product.brand?.id || product.brand || ''),
					name: typeof product.brand === 'object' ? product.brand?.name || '' : ''
				},
				type: {
					id: typeof product.type === 'string' ? 
						product.type : 
						(product.type?._id || product.type?.id || product.type || ''),
					name: typeof product.type === 'object' ? product.type?.name || '' : ''
				},
				category: {
					id: typeof product.category === 'string' ? 
						product.category : 
						(product.category?._id || product.category?.id || ''),
					name: typeof product.category === 'object' ? product.category?.name || '' : ''
				},
				parent: product.parent || ''
			};

			// Apply all updates
			setTags(updates.tags);
			setImg(updates.img);
			setImageURLs(updates.imageURLs);
			setBrand(updates.brand);
			setType(updates.type);
			setCategory(updates.category);
			setParent(updates.parent);
		};

		initializeProductData();
	}, [product]);

	// decide what to render
	let content = null;

	if (!product || Object.keys(product).length === 0) {
		content = (
			<div className="text-center py-10">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
				<h2 className="mt-4">Loading...</h2>
			</div>
		);
	} else {
		content = (
			<form onSubmit={handleSubmit((data) => handleEditProduct(data, id))}>
				<div className="grid grid-cols-12 gap-6 mb-6">
					<div className="col-span-12 xl:col-span-8 2xl:col-span-9">
						<div className="mb-6 bg-white px-8 py-8 rounded-md">
							<h4 className="text-[22px]">General</h4>
							<FormField
								title="title"
								isRequired={true}
								placeHolder="Product Title"
								register={register}
								errors={errors}
								defaultValue={product.title}
							/>
							<DescriptionTextarea
								register={register}
								errors={errors}
								defaultValue={product.description}
							/>
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
									defaultValue={product.price}
								/>
								<FormField
									title="quantity"
									isRequired={true}
									placeHolder="Quantity"
									bottomTitle="Enter the product quantity."
									type="number"
									register={register}
									errors={errors}
									defaultValue={product.quantity}
								/>
								<FormField
									title="discount"
									type="number"
									isRequired={false}
									placeHolder="Discount"
									bottomTitle="Product Discount Percentage."
									register={register}
									errors={errors}
									defaultValue={product.discount}
								/>
								<FormField
									title="count"
									isRequired={false}
									placeHolder="Count"
									bottomTitle="Enter the product count."
									type="number"
									register={register}
									errors={errors}
									defaultValue={product.count}
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
									default_value={product.brand ? { brand: product.brand } : undefined}
								/>
								<ProductType
									register={register}
									errors={errors}
									control={control}
									setSelectType={setType}
									default_value={product.type ? { type: product.type } : undefined}
								/>
							</div>
						</div>

						<AdditionalInformation
							setAdditionalInformation={setAdditionalInformation}
							default_value={product.additionalInformation}
						/>

						<div className="bg-white px-8 py-8 rounded-md mb-6">
							<h4 className="text-[18px] mb-4">Product Gallery</h4>
							<div className="flex flex-wrap gap-4">
								{imageURLs && imageURLs.length > 0 && (
									<ThumbItems uploadItems={imageURLs.map(url => ({
										url: typeof url === 'string' ? url : url.img || '',
										id: ''
									}))} />
								)}
							</div>
							<input
								type="file"
								id="gallery_image"
								className="hidden"
								multiple
								accept="image/*"
								onChange={handleMultipleImageUpload}
							/>
							<label
								htmlFor="gallery_image"
								className="mt-4 text-tiny w-full inline-block py-2 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
							>
								Add Gallery Images
							</label>
						</div>
					</div>

					<div className="col-span-12 xl:col-span-4 2xl:col-span-3">
						<ProductImgUpload
							imgUrl={img}
							setImgUrl={setImg}
							default_img={product.img}
							isSubmitted={isSubmitted}
						/>
						<div className="bg-white px-8 py-8 rounded-md mb-6">
							<p className="mb-5 text-base text-black">
								Product Category <span className="text-red">*</span>
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
								<ProductCategory
									setCategory={setCategory}
									setParent={setParent}
									default_value={{
										category: product.category,
										parent: product.parent,
									}}
								/>
							</div>
						</div>

						<div className="bg-white px-8 py-8 rounded-md mb-6">
							<p className="mb-5 text-base text-black">Product Tags</p>
							<div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
								<Tags tags={tags} setTags={setTags} />
							</div>
						</div>
					</div>
				</div>
				<button className="tp-btn px-5 py-2 mt-5" type="submit">
					Update Product
				</button>
			</form>
		);
	}

	return content;
};

export default EditProductSubmit;