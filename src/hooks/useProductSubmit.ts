"use client";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import slugify from "slugify";
import { useAddProductMutation, useEditProductMutation } from "@/redux/product/productApi";

export type ImageURL = {
  img?: string;
} | string;

interface ProductData {
  title: any;
  img: string;
  description: any;
  imageURLs: string[];
  slug: string;
  parent: string;
  price: number;
  discount: number;
  quantity: number;
  brand: string;
  category: string;
  type?: string;
  sku: any;
  count: number;
  status: any;
  additionalInformation: any[];
  tags: string[];
}

const useProductSubmit = () => {
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  const [tags, setTags] = useState<string[]>([]);
  const [additionalInformation, setAdditionalInformation] = useState<any[]>([]);
  const [category, setCategory] = useState<{ name: string; id: string }>({ name: "", id: "" });
  const [parent, setParent] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [brand, setBrand] = useState<{ name: string; id: string }>({ name: "", id: "" });
  const [type, setType] = useState<{ name?: string; id?: string }>({ name: "", id: "" });
  const [imageURLs, setImageURLs] = useState<ImageURL[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  // handle product status update (ja/lee)
  const handleStatusProduct = async (checked: boolean, id: string, field: "ja" | "lee") => {
    try {
      const res = await editProduct({ 
        id, 
        data: { [field]: checked } 
      });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong updating product status");
    }
  };

  const {
    register,
    handleSubmit,
    reset: resetForm,
    control,
    formState: { errors },
  } = useForm();

  // handle submit product
  const handleSubmitProduct = async (data: any) => {
    const productData: ProductData = {
      title: data.title,
      img: img,
      description: data.description,
      imageURLs: imageURLs.map(url => typeof url === 'string' ? url : url.img || ''),
      slug: slugify(data.title, { replacement: "-", lower: true }),
      parent: parent,
      price: Number(data.price),
      discount: Number(data.discount) || 0,
      quantity: Number(data.quantity),
      brand: brand.id,
      category: category.id,
      sku: data.SKU,
      count: Number(data.count),
      status: data.status,
      additionalInformation: additionalInformation,
      tags: tags,
    };
    
    if (type?.id) {
      productData.type = type.id;
    }

    // Validate required fields
    if (!img) {
      return notifyError("Product image is required");
    }
    if (!category.name || !category.id) {
      return notifyError("Category is required");
    }
    if (!brand.name || !brand.id) {
      return notifyError("Brand is required");
    }
    if (!data.title) {
      return notifyError("Product title is required");
    }
    if (!data.price || Number(data.price) <= 0) {
      return notifyError("Product price must be greater than 0");
    }
    if (Number(data.discount) > Number(data.price)) {
      return notifyError("Product price must be greater than discount");
    }
    if (!data.quantity || Number(data.quantity) < 0) {
      return notifyError("Product quantity must be 0 or greater");
    }

    try {
      const res = await addProduct(productData);
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
          return notifyError("An error occurred while creating the product");
        }
      } else {
        notifySuccess("Product created successfully");
        setIsSubmitted(true);
        resetForm();
        router.push('/products')
      }
    } catch (error) {
      notifyError("An unexpected error occurred");
    }
  };

  // handle edit product
  const handleEditProduct = async (data: any, id: string) => {
    // Validate required fields
    if (!img) {
      return notifyError("Product image is required");
    }
    if (!category.name || !category.id) {
      return notifyError("Category is required");
    }
    if (!brand.name || !brand.id) {
      return notifyError("Brand is required");
    }
    if (!data.title) {
      return notifyError("Product title is required");
    }
    if (!data.price || Number(data.price) <= 0) {
      return notifyError("Product price must be greater than 0");
    }
    if (!data.quantity || Number(data.quantity) < 0) {
      return notifyError("Product quantity must be 0 or greater");
    }

    const productData: ProductData = {
      title: data.title,
      img: img,
      description: data.description,
      imageURLs: imageURLs.map(url => typeof url === 'string' ? url : url.img || ''),
      slug: slugify(data.title, { replacement: "-", lower: true }),
      parent: parent,
      price: Number(data.price),
      discount: Number(data.discount) || 0,
      quantity: Number(data.quantity),
      brand: brand.id,
      category: category.id,
      sku: data.SKU,
      count: Number(data.count) || 0,
      status: data.status || "in-stock",
      additionalInformation: additionalInformation || [],
      tags: tags || []
    };

    if (type?.id) {
      productData.type = type.id;
    }

    try {
      const res = await editProduct({ id: id, data: productData });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Product updated successfully");
        setIsSubmitted(true);
        resetForm();
        router.push('/products')
      }
    } catch (error) {
      console.error('Error updating product:', error);
      notifyError("An unexpected error occurred while updating the product");
    }
  };

  return {
    register,
    handleSubmit,
    handleSubmitProduct,
    handleEditProduct,
    handleStatusProduct,
    errors,
    tags,
    setTags,
    additionalInformation,
    setAdditionalInformation,
    control,
    setCategory,
    setParent,
    setImg,
    img,
    setBrand,
    setType,
    setImageURLs,
    isSubmitted,
    imageURLs,
  };
};

export default useProductSubmit;
