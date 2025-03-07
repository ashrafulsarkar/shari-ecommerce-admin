import { notifySuccess, notifyError } from "@/utils/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { useAddCustomerMutation, useEditCustomerMutation } from "@/redux/customer/customerApi";

const useCustomerSubmit = () => {
  const [parent, setParent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [
    addCustomer,
    { data: categoryData, isError, isLoading, error: addCateErr },
  ] = useAddCustomerMutation();
  // edit
  const [
    editCustomer,
    { data: editCateData, isError: editErr, isLoading: editLoading, error: editCateErr },
  ] = useEditCustomerMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  //handleSubmitCustomer
  const handleSubmitCustomer = async (data: any) => {
    try {
      const res = await addCustomer({...data,imageURL:img});
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Customer added successfully");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };
  //handle Submit edit Category
  const handleSubmitEditCustomer = async (data: any, id: string) => {
    try {

      const res = await editCustomer({ id, data:{
        ...data,
        imageURL:img
      } });
      // console.log(res)
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Customer update successfully");

        setIsSubmitted(true);
        // reset();
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
    handleSubmitCustomer,
    error,
    isSubmitted,
    handleSubmitEditCustomer,
    img, setImg
  };
};

export default useCustomerSubmit;
