"use client";
import React, { useState } from "react";
import ErrorMsg from "../common/error-msg";
import Pagination from "../ui/Pagination";
import { useGetAllTypesQuery as useGetAllTypesQuery } from "@/redux/type/typeApi";
import TypeEditDelete from "./type-edit-del";
import usePagination from "@/hooks/use-pagination";

const TypeTables = () => {
  const { data: types, isError, isLoading } = useGetAllTypesQuery();
  const paginationData = usePagination(types?.result || [], 5);
  
  const { currentItems, handlePageClick, pageCount } = paginationData;
  console.log(currentItems);
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && types?.result.length === 0) {
    content = <ErrorMsg msg="No Types Found" />;
  }

  if (!isLoading && !isError && currentItems) {

    content = (
      <>
        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[975px] 2xl:w-full">
            <table className="w-full text-base text-left text-gray-500 ">
              <thead>
                <tr className="border-b border-gray6 text-tiny">
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px]"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...currentItems.reverse()].map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                    >
                      <td className="pr-8 py-5 whitespace-nowrap font-medium text-heading">
                        {item.name}
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {item.description}
                      </td>
                      <td className="px-9 py-3 text-end">
                        <div className="flex items-center justify-end space-x-2">
                          <TypeEditDelete id={item._id}/>
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
            Showing 1-
            {currentItems.length} of{" "}
            {types?.result.length}
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

export default TypeTables;
