"use client";
import React from "react";
import CategoryTables from "./category-tables";
import ErrorMsg from "../common/error-msg";
import CategoryParent from "./category-parent";
import CategoryDescription from "./category-description";
import { useGetBlogCategoryQuery } from "@/redux/blog-category/categoryApi";
import useBlogCategorySubmit from "@/hooks/useBlogCategorySubmit";

const  EditCategory = ({ id }: { id: string }) => {
  const { data: categoryData, isError, isLoading } = useGetBlogCategoryQuery(id);
  const {
    errors,
    register,
    handleSubmit,
    error,
    isSubmitted,
    handleSubmitEditBlogCategory,
  } = useBlogCategorySubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        {categoryData && (
          <form
            onSubmit={handleSubmit((data) =>
              handleSubmitEditBlogCategory(data, id)
            )}
          >
            <div className="mb-6 bg-white px-8 py-8 rounded-md">

              {/* category parent */}
              <CategoryParent
                register={register}
                errors={errors}
                default_value={categoryData.name}
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
