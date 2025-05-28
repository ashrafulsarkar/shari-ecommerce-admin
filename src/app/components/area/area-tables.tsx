"use client";
import React, { useState, useEffect, useMemo } from "react";
import Pagination from "../ui/Pagination";
import ErrorMsg from "../common/error-msg";
import usePagination from "@/hooks/use-pagination";
import Image from "next/image";
import Link from "next/link";
import { Search } from "@/svg";
import { useGetAllAreasQuery } from "@/redux/area/areaApi";
import AreaEditDelete from "./edit-delete-area";



const AreaTables = () => {
	const {
		data: allSlider = [],
		isError,
		isLoading,
	} = useGetAllAreasQuery();
	const [items, setItems] = useState<any[]>([]);

	// Update categories when allSlider change
	useEffect(() => {
		if (allSlider.length > 0) {
			setItems(allSlider);
		}
	}, [allSlider]);

	const paginationData = usePagination<any>(items, 5);
	const { currentItems, handlePageClick, pageCount } = paginationData;

	// Search value state
	const [searchValue, setSearchValue] = useState<string>("");

	// Handle search input change
	const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	// Search logic using useMemo to optimize performance
	const filteredItems = useMemo(() => {
		if (!searchValue) return [...currentItems].reverse(); // No search, return reversed currentItems
		return [...currentItems]
			.reverse()
			.filter((p) => p.title_1?.toLowerCase().includes(searchValue.toLowerCase())); // Filter based on searchValue
	}, [currentItems, searchValue]);

	// decide what to render
	let content = null;

	if (isLoading) {
		content = <h2>Loading....</h2>;
	}
	if (!isLoading && isError) {
		content = <ErrorMsg msg="There was an error" />;
	}
	if (!isLoading && !isError && items?.length === 0) {
		content = <ErrorMsg msg="No slider Found" />;
	}

	if (!isLoading && !isError ) {
		content = (
			<>
				<div className="overflow-scroll 2xl:overflow-visible">
					<div className="tp-search-box flex items-center justify-between px-8 py-8">
						<div className="search-input relative">
							<input
								onChange={handleSearchProduct}
								className="input h-[44px] w-full pl-14"
								type="text"
								placeholder="Search by name"
							/>
							<button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
								<Search />
							</button>
						</div>
						<div className="flex justify-end space-x-6">
							<div className="product-add-btn flex">
								<Link href="/area/add" className="tp-btn">
									Add area
								</Link>
							</div>
						</div>
					</div>

					<div className="w-[975px] 2xl:w-full">
						<table className="w-full text-base text-left text-gray-500 ">
							<thead>
								<tr className="border-b border-gray6 text-tiny">
									<th scope="col" className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
										ID
									</th>
									<th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[180px]">
										Name
									</th>
									<th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{filteredItems.map((item: any) => (
									<tr key={item._id} className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
										<td className="px-3 py-3 pl-0 font-normal text-[#55585B]">
											#{item._id.slice(2, 10)}
										</td>
										<td className="pr-8 py-5 whitespace-normal">
											<a href="#" className="flex items-center space-x-5">

												<div>
													<div className="font-medium text-heading text-hover-primary transition">
														{item.name}
													</div>
												</div>
											</a>
										</td>
										<td className="px-9 py-3 text-end">
											<div className="flex items-center justify-end space-x-2">
												<AreaEditDelete id={item._id} />
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="flex justify-between items-center flex-wrap">
					<p className="mb-0 text-tiny">
						Showing 1-{currentItems.length} of {items.length}
					</p>
					<div className="pagination py-3 flex justify-end items-center pagination">
						<Pagination
							handlePageClick={handlePageClick}
							pageCount={pageCount}
						/>
					</div>
				</div>
			</>
		);
	}
	return (
		<div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
			{content}
		</div>
	);
};

export default AreaTables;