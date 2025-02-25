"use client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation';
import { useAddBlogMutation, useEditBlogMutation } from "@/redux/blog/blogApi";
import { notifyError, notifySuccess } from "@/utils/toast";

// ImageURL type
export interface ImageURL {
  color: {
    name?: string;
    clrCode?: string;
  };
  img: string;
  sizes?: string[];
}

type ICategory = {
  name: string;
  id: string;
};

type status = "in-stock" | "out-of-stock" | "discontinued";

const useBlogSubmit = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [parent, setParent] = useState<string>("");
  const [category, setCategory] = useState<ICategory>({ name: "", id: "" });
  const [status, setStatus] = useState<status>("in-stock");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const router = useRouter();


  // useAddBlogMutation
  const [addBlog, { data: addBlogData, isError, isLoading }] =
    useAddBlogMutation();
  // useAddBlogMutation
  const [editBlog, { data: editBlogData, isError: editErr, isLoading: editLoading }] =
    useEditBlogMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();
  // resetForm
  const resetForm = () => {
    setImg("");
    setTitle("");
    setParent("");
    setCategory({ name: "", id: "" });
    setTags([]);
    reset();
  };

  // handle submit Blog
  const handleSubmitBlog = async (data: any) => {
    // console.log("blog data--->", data);

    // blog data
    const blogData = {
      title: data.title,
      img: img,
      parent: parent,
      category: category,
      status: status,
      description: data.description,
      tags: tags,
    };

    // console.log('blogData-------------------..>',blogData)


    if (!img) {
      return notifyError("Blog image is required");
    }
    if (!category.name) {
      return notifyError("Category is required");
    }
    
    const res = await addBlog(blogData);
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Blog created successFully");
      setIsSubmitted(true);
      resetForm();
      router.push('/blogs')
    }
  };
  // handle edit blog
  const handleEditBlog = async (data: any, id: string) => {
    // blog data
    const blogData = {
      title: data.title,
      img: img,
      description: data.description,
      parent: parent,
      category: category,
      tags: tags,
    };
    console.log('edit blogData---->',blogData)
    const res = await editBlog({ id: id, data: blogData });
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Blog edit successFully");
      setIsSubmitted(true);
      router.push('/blogs')
      resetForm();
    }
  };

  return {
    img,
    setImg,
    title,
    setTitle,
    parent,
    setParent,
    category,
    setCategory,
    description,
    setDescription,
    tags,
    setTags,
    handleSubmitBlog,
    handleEditBlog,
    register,
    handleSubmit,
    errors,
    control,
    setIsSubmitted,
    isSubmitted,
  };
};

export default useBlogSubmit;
