"use client";
import React from "react";
import useBlogSubmit from "@/hooks/useBlogSubmit";
import ErrorMsg from "../../common/error-msg";
import FormField from "../form-field";
import DescriptionTextarea from "../add-blog/description-textarea";
import { useGetBlogQuery } from "@/redux/blog/blogApi";
import BlogImgUpload from "../add-blog/blog-img-upload";
import Tags from "../add-blog/tags";
import BlogCategory from "../../blog-category/blog-category";

const EditBlogSubmit = ({ id }: { id: string }) => {
  const { data: blog, isError, isLoading } = useGetBlogQuery(id);
  const {
    handleSubmit,
    handleSubmitBlog,
    register,
    errors,
    tags,
    setTags,
    control,
    setCategory,
    setParent,
    setImg,
    img,
    isSubmitted,
    setIsSubmitted,
    handleEditBlog,
  } = useBlogSubmit();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && blog) {
    content = (
      <form onSubmit={handleSubmit((data) => handleEditBlog(data, id))}>
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
                defaultValue={blog.title}
              />
              <DescriptionTextarea
                register={register}
                errors={errors}
                defaultValue={blog.description}
              />
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
                <BlogCategory
                  setCategory={setCategory}
                  setParent={setParent}
                  default_value={{
                    parent: blog.category.name,
                    id: blog.category.id,
                  }}
                />
            </div>
          </div>

          {/* right side */}
          <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
            <BlogImgUpload
              imgUrl={img}
              setImgUrl={setImg}
              default_img={blog.img}
              isSubmitted={isSubmitted}
            />

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="mb-5 text-base text-black">Blog Category</p>
              {/* category start */}
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
                <Tags
                  tags={tags}
                  setTags={setTags}
                  default_value={blog.tags}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="tp-btn px-5 py-2 mt-5" type="submit">
          Submit Blog
        </button>
      </form>
    );
  }

  return <>{content}</>;
};

export default EditBlogSubmit;
