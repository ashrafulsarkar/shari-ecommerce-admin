import { notifySuccess, notifyError } from "@/utils/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddAreaMutation, useEditAreaMutation } from "@/redux/area/areaApi";

const useAreaSubmit = () => {
  const [error, setError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // add
  const [
    addArea,
    { data: categoryData, isError, isLoading, error: addCateErr },
  ] = useAddAreaMutation();
  // edit
  const [
    editArea,
    { data: editCateData, isError: editErr, isLoading: editLoading, error: editCateErr },
  ] = useEditAreaMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  //handleSubmitArea
  const handleSubmitArea = async (data: any) => {
    try {
      const res = await addArea({...data});
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Area added successfully");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };
  //handle Submit edit Category
  const handleSubmitEditArea = async (data: any, id: string) => {
    try {

      const res = await editArea({ id, data:{
        ...data
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
        notifySuccess("Area update successfully");

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
    handleSubmitArea,
    error,
    isSubmitted,
    handleSubmitEditArea,
  };
};

export default useAreaSubmit;
