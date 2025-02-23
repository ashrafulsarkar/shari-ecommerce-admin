"use client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation';
import { useAddProductMutation, useEditProductMutation } from "@/redux/product/productApi";
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
type IBrand = {
  name: string;
  id: string;
};
type IType = {
  name: string;
  id: string;
};
type ICategory = {
  name: string;
  id: string;
};

type status = "in-stock" | "out-of-stock" | "discontinued";

const useProductSubmit = () => {
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [imageURLs, setImageURLs] = useState<ImageURL[]>([]);
  const [parent, setParent] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [brand, setBrand] = useState<IBrand>({ name: "", id: "" });
  const [type, setType] = useState<IType>({ name: "", id: "" });
  const [category, setCategory] = useState<ICategory>({ name: "", id: "" });
  const [sku, setSku] = useState<string>("");
  const [count, setCount] = useState<string>("");
  const [status, setStatus] = useState<status>("in-stock");
  const [additionalInformation, setAdditionalInformation] = useState<
    {
      key: string;
      value: string;
    }[]
  >([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const router = useRouter();


  // useAddProductMutation
  const [addProduct, { data: addProductData, isError, isLoading }] =
    useAddProductMutation();
  // useAddProductMutation
  const [editProduct, { data: editProductData, isError: editErr, isLoading: editLoading }] =
    useEditProductMutation();

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
    setSku("");
    setCount("");
    setImg("");
    setTitle("");
    setSlug("");
    setImageURLs([]);
    setParent("");
    setChildren("");
    setPrice(0);
    setDiscount(0);
    setQuantity(0);
    setBrand({ name: "", id: "" });
    setType({ name: "", id: "" });
    setCategory({ name: "", id: "" });
    setStatus("in-stock");
    setDescription("");
    setAdditionalInformation([]);
    setTags([]);
    reset();
  };

  // handle submit product
  const handleSubmitProduct = async (data: any) => {
    // console.log("product data--->", data);

    // product data
    const productData = {
      title: data.title,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      img: img,
      imageURLs: imageURLs,
      parent: parent,
      children: children,
      price: data.price,
      discount: data.discount,
      quantity: data.quantity,
      brand: brand,
      type: type,
      category: category,
      sku: data.SKU,
      count: data.count,
      status: status,
      description: data.description,
      additionalInformation: additionalInformation,
      tags: tags,
    };

    // console.log('productData-------------------..>',productData)


    if (!img) {
      return notifyError("Product image is required");
    }
    if (!category.name) {
      return notifyError("Category is required");
    }
    if (Number(data.discount) > Number(data.price)) {
      return notifyError("Product price must be gether than discount");
    } else {
      const res = await addProduct(productData);
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Product created successFully");
        setIsSubmitted(true);
        resetForm();
        router.push('/products')
      }
    }
  };
  // handle edit product
  const handleEditProduct = async (data: any, id: string) => {
    // product data
    const productData = {
      title: data.title,
      img: img,
      description: data.description,
      imageURLs: imageURLs,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      parent: parent,
      children: children,
      price: data.price,
      discount: data.discount,
      quantity: data.quantity,
      brand: brand,
      type: type,
      category: category,
      sku: data.SKU,
      count: data.count,
      status: status,
      additionalInformation: additionalInformation,
      tags: tags,
    };
    console.log('edit productData---->',productData)
    const res = await editProduct({ id: id, data: productData });
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Product edit successFully");
      setIsSubmitted(true);
      router.push('/products')
      resetForm();
    }
  };

  return {
    sku,
    setSku,
    count,
    setCount,
    img,
    setImg,
    title,
    setTitle,
    slug,
    setSlug,
    imageURLs,
    setImageURLs,
    parent,
    setParent,
    children,
    setChildren,
    price,
    setPrice,
    discount,
    setDiscount,
    quantity,
    setQuantity,
    brand,
    setBrand,
    type,
    setType,
    category,
    setCategory,
    status,
    setStatus,
    description,
    setDescription,
    additionalInformation,
    setAdditionalInformation,
    tags,
    setTags,
    handleSubmitProduct,
    handleEditProduct,
    register,
    handleSubmit,
    errors,
    control,
    setIsSubmitted,
    isSubmitted,
  };
};

export default useProductSubmit;
