import { notifySuccess, notifyError } from "@/utils/toast";
import { useAddBlogCategoryMutation, useEditBlogCategoryMutation } from "@/redux/blog-category/categoryApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'

const useBlogCategorySubmit = () => {
  const [parent, setParent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [
    addBlogCategory,
    { data: categoryData, isError, isLoading, error: addCateErr },
  ] = useAddBlogCategoryMutation();
  // edit
  const [
    editBlogCategory,
    { data: editCateData, isError: editErr, isLoading: editLoading, error: editCateErr },
  ] = useEditBlogCategoryMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  //handleSubmitCategory
  const handleSubmitCategory = async (data: any) => {
    try {
      const category_data = {
        name: data?.name,
        description: data?.description,
      };
      console.log(category_data)
      const res = await addBlogCategory(category_data);
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Category added successfully");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };
  //handle Submit edit Category
  const handleSubmitEditBlogCategory = async (data: any, id: string) => {
    try {
      const category_data = {
        name: data?.name,
        description: data?.description,
      };
      const res = await editBlogCategory({ id, data: category_data });
      // console.log(res)
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Category update successfully");

        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    control,
    parent,
    setParent,
    description,
    setDescription,
    handleSubmitCategory,
    error,
    isSubmitted,
    handleSubmitEditBlogCategory,
  };
};

export default useBlogCategorySubmit;
