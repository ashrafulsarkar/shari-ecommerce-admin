import React, { useState } from "react";
import { notifySuccess } from "@/utils/toast";
import { useUpdateStatusMutation } from "@/redux/order/orderApi";

// Order status options
const options = [
  { value: "delivered", label: "Delivered" },
  { value: "processing", label: "Processing" },
  { value: "pending", label: "Pending" },
  { value: "cancel", label: "Cancel" },
];

const OrderStatusChange = ({ id }: { id: string }) => {
  const [updateStatus] = useUpdateStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);

    const res = await updateStatus({ id, status: { status: value } });
    if ("data" in res && "message" in res.data) {
      notifySuccess(res.data.message);
    }
  };

  return (
    <div className="relative w-60">
      <select
        value={selectedStatus}
        onChange={handleChange}
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 cursor-pointer"
      >
        <option value="" disabled>Select Status...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderStatusChange;
