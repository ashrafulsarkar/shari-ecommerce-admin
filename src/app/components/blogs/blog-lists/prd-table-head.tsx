import React from 'react';

const BlogTableHead = () => {
  return (
    <thead className="bg-white">
      <tr className="border-b border-gray6 text-tiny">
        <th scope="col" className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
          Title
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-center">
        Category
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-center">
        Description
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-center">
        Meta title
        </th>

        <th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default BlogTableHead;