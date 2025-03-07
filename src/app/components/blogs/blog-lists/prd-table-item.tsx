import Image from "next/image";
import React from "react";
import EditDeleteBlogBtn from "../edit-delete-btn";

const ProductTableItem = ({ blog }: { blog: any }) => {
  const {_id, img, title,meta_title,description,category } = blog || {};


  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
      <td className="pr-8 py-5 whitespace-nowrap">
        <a href="#" className="flex items-center space-x-5">
          <Image
            className="w-[60px] h-[60px] rounded-md object-cover bg-[#F2F3F5]"
            src={img}
            width={60}
            height={60}
            alt="product img"
          />
          <span className="font-medium text-heading text-hover-primary transition">
            {title}
          </span>
        </a>
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-center">{category.name}</td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-center">{description.slice(0,50)}</td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-center">{meta_title}</td>

      <td className="px-9 py-3 text-end">
        <div className="flex items-center justify-end space-x-2">
          <EditDeleteBlogBtn id={_id}/>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableItem;
