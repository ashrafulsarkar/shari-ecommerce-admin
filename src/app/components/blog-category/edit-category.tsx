"use client";
import React from "react";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import CategoryTables from "./category-tables";
import ErrorMsg from "../common/error-msg";
import { useGetCategoryQuery } from "@/redux/category/categoryApi";
import CategoryParent from "./category-parent";
import CategoryDescription from "./category-description";

const  EditCategory = ({ id }: { id: string }) => {
  const { data: categoryData, isError, isLoading } = useGetCategoryQuery(id);
  const {
    errors,
    register,
    handleSubmit,
    error,
    isSubmitted,
    handleSubmitEditCategory,
  } = useCategorySubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        {categoryData && (
          <form
            onSubmit={handleSubmit((data) =>
              handleSubmitEditCategory(data, id)
            )}
          >
            <div className="mb-6 bg-white px-8 py-8 rounded-md">

              {/* category parent */}
              <CategoryParent
                register={register}
                errors={errors}
                default_value={categoryData.parent}
              />
              {/* category parent */}

              {/* Category Description */}
              <CategoryDescription
                register={register}
                default_value={categoryData.description}
              />
              {/* Category Description */}

              <button className="tp-btn px-7 py-2">Edit Category</button>
            </div>
          </form>
        )}
      </div>
      <div className="col-span-12 lg:col-span-8">
        <CategoryTables />
      </div>
    </div>
  );
};

export default EditCategory;
