"use client";
import React from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import EditProductSubmit from "@/app/components/products/edit-product/edit-product-submit";
import { useGetProductQuery } from "@/redux/product/productApi";
import { IProduct, IBrand, IType } from "@/types/product-type";

const EditProduct = ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = React.use(params);
	const { data: productData, isLoading, refetch } = useGetProductQuery(id);

	React.useEffect(() => {
	refetch(); // This forces a fresh fetch
	}, []);

	// Transform the product data to handle brand and type objects
	const transformedProductData = React.useMemo(() => {
		if (!productData) return null;

		// Handle brand field
		let transformedBrand = productData.brand;
		if (typeof productData.brand === 'object' && productData.brand !== null) {
			transformedBrand = (productData.brand as IBrand).id;
		}

		// Handle type field
		let transformedType = productData.type;
		if (typeof productData.type === 'object' && productData.type !== null) {
			transformedType = (productData.type as IType).id;
		}

		return {
			...productData,
			brand: transformedBrand,
			type: transformedType
		};
	}, [productData]);

	return (
		<Wrapper>
			<div className="body-content px-8 py-8 bg-slate-100">
				{/* breadcrumb start */}
				<Breadcrumb title="Edit Product" subtitle="Edit Product" />
				{/* breadcrumb end */}

				{/* add a product start */}
				<div className="grid grid-cols-12">
					<div className="col-span-12 2xl:col-span-12">
						{isLoading ? (
							<div className="text-center py-10">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
								<h2 className="mt-4">Loading product data...</h2>
							</div>
						) : (
							<EditProductSubmit id={id} product={transformedProductData} />
						)}
					</div>
				</div>
				{/* add a product end */}
			</div>
		</Wrapper>
	);
};

export default EditProduct;