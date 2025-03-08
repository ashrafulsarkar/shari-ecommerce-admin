"use client";
import React, { useState, useEffect, useMemo } from "react";
import Pagination from "../ui/Pagination";
import ErrorMsg from "../common/error-msg";
import usePagination from "@/hooks/use-pagination";
import Image from "next/image";
import Link from "next/link";
import { Search } from "@/svg";
import { useGetAllAlbumsQuery } from "@/redux/album/albumApi";
import CustomerEditDelete from "../customer/edit-delete-customer";
import AlbumEditDelete from "./edit-delete-album";

interface ItemType {
  _id: string;
  name?: string;
  img?: string;
}

const AlbumTables = () => {
  const {
    data: allAlbum = [],
    isError,
    isLoading,
  } = useGetAllAlbumsQuery();
  const [items, setItems] = useState<ItemType[]>([]);

  // Update categories when allAlbum change
  useEffect(() => {
    if (allAlbum.length > 0) {
      setItems(allAlbum);
    }
  }, [allAlbum]);

  const paginationData = usePagination<ItemType>(items, 5);
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
      .filter((p) => p.name?.toLowerCase().includes(searchValue.toLowerCase())); // Filter based on searchValue
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
    content = <ErrorMsg msg="No customer Found" />;
  }

  if (!isLoading && !isError && currentItems.length > 0) {
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
                <Link href="/album/add" className="tp-btn">
                  Add Album
                </Link>
              </div>
            </div>
          </div>

          <div className="w-[975px] 2xl:w-full">
            <table className="w-full text-base text-left text-gray-500 ">
              <thead>
                <tr className="border-b border-gray6 text-tiny">
                  <th
                    scope="col"
                    className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[180px]"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item: ItemType) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                  >
                    <td className="px-3 py-3 pl-0 font-normal text-[#55585B]">
                      #{item._id.slice(2, 10)}
                    </td>
                    <td className="pr-8 py-5 whitespace-normal">
                      <a href="#" className="flex items-center space-x-5">
                        <Image
                          className="w-[60px] h-[60px] rounded-md object-cover bg-[#F2F3F5]"
                          src={item.img || "/"}
                          width={60}
                          height={60}
                          alt="product img"
                        />
                        <div>
                        <div className="font-medium text-heading text-hover-primary transition">
                          {item.name}
                        </div>
                        </div>
                      </a>
                    </td>
                    <td className="px-9 py-3 text-end">
                      <div className="flex items-center justify-end space-x-2">
                        <AlbumEditDelete id={item._id} />
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

export default AlbumTables;
