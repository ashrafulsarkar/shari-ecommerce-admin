"use client";
import React from "react";
import useBlogSubmit from "@/hooks/useBlogSubmit";
import DescriptionTextarea from "./description-textarea";
import BlogImgUpload from "./blog-img-upload";
import BlogCategory from "../../blog-category/blog-category";
import Tags from "./tags";
import FormField from "../form-field";

const BlogSubmit = () => {
  const {
    handleSubmit,
    handleSubmitBlog,
    register,
    errors,
    tags,
    setTags,
    setCategory,
    setParent,
    setImg,
    img,
    isSubmitted,
  } = useBlogSubmit();

  // console.log('additionalInformation--->',additionalInformation)

  return (
    <form onSubmit={handleSubmit(handleSubmitBlog)}>
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* left side */}
        <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <h4 className="text-[22px]">General</h4>
            <FormField
              title="title"
              isRequired={true}
              placeHolder="Blog Title"
              register={register}
              errors={errors}
            />
            <DescriptionTextarea register={register} errors={errors} />
          </div>
          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Blog Category <span className="text-red">*</span></p>
            {/* category start */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <BlogCategory
                setCategory={setCategory}
                setParent={setParent}
              />
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <BlogImgUpload
            imgUrl={img}
            setImgUrl={setImg}
            isSubmitted={isSubmitted}
          />
          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Blog Tags</p>
            {/* tags start */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <Tags tags={tags} setTags={setTags} />
            </div>
          </div>
        </div>
      </div>
      <button className="tp-btn px-5 py-2 mt-5" type="submit">
        Submit Blog
      </button>
    </form>
  );
};

export default BlogSubmit;
