"use client";
import React from "react";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import CategoryTables from "./category-tables";
import CategoryParent from "./category-parent";
import CategoryDescription from "./category-description";

const AddCategory = () => {
  const {
    errors,
    register,
    handleSubmit,
    handleSubmitCategory,
  } = useCategorySubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitCategory)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* category parent */}
            <CategoryParent register={register} errors={errors} />
            {/* category parent */}
            {/* Category Description */}
            <CategoryDescription register={register} />
            {/* Category Description */}
            <button className="tp-btn px-7 py-2">Add Blog Category</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <CategoryTables />
      </div>
    </div>
  );
};

export default AddCategory;
