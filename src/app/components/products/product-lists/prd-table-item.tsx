import Image from "next/image";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import EditDeleteBtn from "../../button/edit-delete-btn";
import useProductSubmit from "@/hooks/useProductSubmit";
import { IProduct } from "@/types/product-type";
import Switcher from "../../Switcher/Switcher";

const ProductTableItem = ({ product }: { product: IProduct }) => {
  const { handleStatusProduct } = useProductSubmit();
  const { _id, img, title, sku, price, reviews, status, quantity, ja, lee } = product || {};

  // State for switches
  const [jaChecked, setJaChecked] = useState<boolean>(ja || false);
  const [leeChecked, setLeeChecked] = useState<boolean>(lee || false);

  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  // Toggle switch
  const handleToggle = (field: "ja" | "lee", checked: boolean) => {
    if (field === "ja") {
      setJaChecked(checked);
    } else {
      setLeeChecked(checked);
    }
    handleStatusProduct(checked, _id, field);
  };

  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
      <td className="pr-8 py-5 whitespace-nowrap">
        <a href="#" className="flex items-center space-x-5">
          <Image
            className="w-[60px] h-[60px] rounded-md object-cover bg-[#F2F3F5]"
            src={product.img}
            width={60}
            height={60}
            alt="product img"
          />
          <span className="font-medium text-heading text-hover-primary transition">
            {title}
          </span>
        </a>
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">{quantity}</td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">৳ {price}</td>
      <td className="px-3 py-3 font-normal text-heading text-end">
        <div className="flex justify-end items-center space-x-1 text-tiny">
          <span className="text-yellow flex items-center space-x-1">
            <Rating allowFraction size={18} initialValue={averageRating} readonly />
          </span>
        </div>
      </td>
      <td className="px-3 py-3 text-end">
        <span
          className={`text-[11px] px-3 py-1 rounded-md leading-none font-medium text-end ${
            status === "in-stock" ? "text-success bg-success/10" : "text-danger bg-danger/10"
          }`}
        >
          {status}
        </span>
      </td>
      {/* Custom Switcher for 'ja' */}
      <td className="px-3 py-3 text-end">
      <Switcher checked={jaChecked} onChange={(checked) => handleToggle("ja", checked)} />

      </td>
      {/* Custom Switcher for 'lee' */}
      {/* <td className="px-3 py-3 text-end">
      <Switcher checked={leeChecked} onChange={(checked) => handleToggle("lee", checked)} />
      </td> */}
      <td className="px-9 py-3 text-end">
        <div className="flex items-center justify-end space-x-2">
          <EditDeleteBtn id={_id} />
        </div>
      </td>
    </tr>
  );
};

export default ProductTableItem;
