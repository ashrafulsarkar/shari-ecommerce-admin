import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { useAddTypeMutation, useEditTypeMutation } from "@/redux/type/typeApi";
import { notifyError, notifySuccess } from "@/utils/toast";

const useTypeSubmit = () => {
  const [logo, setLogo] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [addType,{ data:typeData,isError,isLoading }] = useAddTypeMutation();
  // add
  const [editType, { data: typeEditData, isError: typeIsErr, isLoading: typeLoading }] =
    useEditTypeMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit handle
  const handleSubmitType = async (data: any) => {
    // console.log('data-->', data);

    try {
      const type_data = {
        name: data?.name,
        description: data?.description
      };
      const res = await addType({ ...type_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Type added successfully");
        setIsSubmitted(true);
        reset();
        setLogo("");
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  //handle Submit edit Category
  const handleSubmitEditType = async (data: any, id: string) => {
    try {
      const type_data = {
        name: data?.name,
        description: data?.description,
        email: data?.email,
        website: data.website,
        location: data.location,
        logo: logo,
        status: status
      };
      const res = await editType({ id, data: type_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Type update successfully");
        router.push('/types')
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
    errors,
    setLogo,
    setStatus,
    handleSubmitType,
    isSubmitted,
    setIsSubmitted,
    handleSubmitEditType,
  };
};

export default useTypeSubmit;
