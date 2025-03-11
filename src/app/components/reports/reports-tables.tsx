"use client";
import React, { useState, useEffect, useMemo } from "react";
import Pagination from "../ui/Pagination";
import ErrorMsg from "../common/error-msg";
import usePagination from "@/hooks/use-pagination";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Search } from "@/svg";
import { useGetOrderReportQuery } from "@/redux/order/orderApi";

interface ItemType {
  _id: string;
  name?: string;
  address?: string;
  email?: string;
  contact?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  subTotal?: string;
  shippingCost?: string;
  discount?: string;
  totalAmount?: string;
  shippingOption?: string;
  paymentMethod?: string;
  invoice?: string;
  status?: string;
}

const ReportsTables = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data: allOrders = [], isError, isLoading } = useGetOrderReportQuery(
    { startDate, endDate },
    { skip: !startDate || !endDate } // Skip query execution if dates are not selected
  );

  const [items, setItems] = useState<ItemType[]>([]);

  // Update categories when allOrders change
  useEffect(() => {
    if (allOrders.length > 0) {
      setItems(allOrders);
    }
  }, [allOrders]);

  const paginationData = usePagination<ItemType>(items, 5);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  // Search value state
  const [searchValue, setSearchValue] = useState<string>("");

  // Handle search input change
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "startDate") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };
  const handleDownloadCSV = () => {
    if (!filteredItems || filteredItems.length === 0) {
      alert("No data available to download.");
      return;
    }

    // Define CSV Headers
    const csvHeaders = [
      "Invoice",
      "Customer",
      "Contact",
      "City",
      "Country",
      "Zip Code",
      "Sub Total",
      "Shipping Cost",
      "Discount",
      "Total Amount",
      "Shipping Option",
      "Payment Method",
      "Status",
    ];

    // Map data to CSV format
    const csvData = filteredItems.map((item) => ({
      Invoice: item.invoice,
      Customer: item.name,
      Contact: item.contact,
      City: item.city,
      Country: item.country,
      "Zip Code": item.zipCode,
      "Sub Total": item.subTotal,
      "Shipping Cost": item.shippingCost,
      Discount: item.discount,
      "Total Amount": item.totalAmount,
      "Shipping Option": item.shippingOption,
      "Payment Method": item.paymentMethod,
      Status: item.status,
    }));

    // Convert to CSV String
    const csvString = Papa.unparse({
      fields: csvHeaders,
      data: csvData,
    });

    // Create Blob and Trigger Download
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "order_report.csv");
  };

  // Search logic using useMemo to optimize performance
  const filteredItems = useMemo(() => {
    if (!searchValue) return [...currentItems].reverse();
    return [...currentItems]
      .reverse()
      .filter((p) => p.name?.toLowerCase().includes(searchValue.toLowerCase()));
  }, [currentItems, searchValue]);

  // Decide what to render
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
            {/* Search Box */}
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

            <button
  onClick={handleDownloadCSV}
  className="bg-green-500 text-white px-4 py-2 rounded-md"
>
  Download CSV
</button>



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
                    Info
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start"
                  >
                    Sub Total
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start"
                  >
                    Shipping Cost
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start"
                  >
                    Discount
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start"
                  >
                    Total Amount
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start"
                  >
                    Shipping Option
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start"
                  >
                    Payment Method
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start"
                  >
                    Invoice
                  </th>
                  <th
                    scope="col"
                    className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-start"
                  >
                    status
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

                    <td className="px-9 py-3 text-start">
                      <div>
                        <strong>Name:</strong> <span>{item.name}</span> <br/>
                        <strong>Address:</strong> <span>{item.address}</span> <br/>
                        <strong>Email:</strong> <span>{item.email}</span> <br/>
                        <strong>Contact:</strong> <span>{item.contact}</span> <br/>
                        <strong>City:</strong> <span>{item.city}</span> <br/>
                        <strong>Country:</strong> <span>{item.country}</span> <br/>
                        <strong>ZipCode:</strong> <span>{item.zipCode}</span> <br/>
                      </div>
                    </td>
                    <td className="px-9 py-3 text-start">
                        {item.subTotal}
                    </td>
                    <td className="px-9 py-3 text-start">
                        {item.shippingCost}
                    </td>
                    <td className="px-9 py-3 text-start">
                        {item.discount}
                    </td>
                    <td className="px-9 py-3 text-start">
                        {item.totalAmount}
                    </td>
                    <td className="px-9 py-3 text-start">
                        {item.shippingOption}
                    </td>
                    <td className="px-9 py-3 text-start">
                        {item.paymentMethod}
                    </td>
                    <td className="px-9 py-3 text-start">
                        {item.invoice}
                    </td>
                    <td className="px-9 py-3 text-start">
                        {item.status}
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
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
          </div>
        </div>
      </>
    );
  }




  return (
    <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
      {/* Date Range Selection */}
      <div className="flex space-x-3">
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={handleDateChange}
                className="border p-2 rounded-md"
              />
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleDateChange}
                className="border p-2 rounded-md"
              />
            </div>
      {content}
    </div>
  );
};

export default ReportsTables;
