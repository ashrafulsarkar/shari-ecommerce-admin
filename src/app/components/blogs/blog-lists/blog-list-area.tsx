"use client";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import BlogTableHead from "./prd-table-head";
import ProductTableItem from "./prd-table-item";
import Pagination from "../../ui/Pagination";
import { Search } from "@/svg";
import ErrorMsg from "../../common/error-msg";
import usePagination from "@/hooks/use-pagination";
import { useGetAllBlogsQuery } from "@/redux/blog/blogApi";

// Defining Blog interface
interface Blog {
  _id: string;
  title?: string;
  meta_title?: string;
}

// Defining the BlogListArea component
const BlogListArea = () => {
  // Get data from the API, with a fallback to an empty array
  const { data: blogs = [], isError, isLoading } = useGetAllBlogsQuery();

  // Local state for items
  const [items, setItems] = useState<Blog[]>([]);

  // Synchronize items with the fetched blogs data
  useEffect(() => {
    if (blogs.length > 0) {
      setItems(blogs);
    }
  }, [blogs]);

  // Pagination logic
  const paginationData = usePagination<Blog>(items || [], 8);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  // Search value state
  const [searchValue, setSearchValue] = useState<string>("");

  // Handle search input change
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Search logic using useMemo to optimize performance
  const filteredBlogs = useMemo(() => {
    if (!searchValue) return [...currentItems].reverse(); // No search, return reversed currentItems
    return [...currentItems].reverse().filter((p) =>
      p.title?.toLowerCase().includes(searchValue.toLowerCase())
    ); // Filter based on searchValue
  }, [currentItems, searchValue]);

  // Determine content based on the loading and error states
  let content = null;
  if (isLoading) {
    content = <h2>Loading....</h2>;
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (blogs.length === 0) {
    content = <ErrorMsg msg="No Blogs Found" />;
  } else {
    content = (
      <>
        <div className="relative overflow-x-auto mx-8">
          <table className="w-full text-base text-left text-gray-500">
            {/* Table Header */}
            <BlogTableHead />
            <tbody>
              {filteredBlogs.map((blog) => (
                <ProductTableItem key={blog._id} blog={blog} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center flex-wrap mx-8">
          <p className="mb-0 text-tiny">
            Showing {filteredBlogs.length} of {blogs.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center mx-8 pagination">
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Table Container */}
      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        <div className="tp-search-box flex items-center justify-between px-8 py-8">
          <div className="search-input relative">
            <input
              onChange={handleSearchProduct}
              className="input h-[44px] w-full pl-14"
              type="text"
              placeholder="Search by blog title"
            />
            <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
              <Search />
            </button>
          </div>
          <div className="flex justify-end space-x-6">
            <div className="product-add-btn flex">
              <Link href="/add-blog" className="tp-btn">
                Add Blog
              </Link>
            </div>
          </div>
        </div>
        {content}
      </div>
    </>
  );
};

export default BlogListArea;
