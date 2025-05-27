import { notifySuccess, notifyError } from "@/utils/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { useAddSliderMutation, useEditSliderMutation } from "@/redux/slider/sliderApi";

const useSliderSubmit = () => {
  const [parent, setParent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [
    addSlider,
    { data: categoryData, isError, isLoading, error: addCateErr },
  ] = useAddSliderMutation();
  // edit
  const [
    editSlider,
    { data: editCateData, isError: editErr, isLoading: editLoading, error: editCateErr },
  ] = useEditSliderMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  //handleSubmitAlbum
  const handleSubmitAlbum = async (data: any) => {
    try {
      const res = await addSlider({...data,img:img,icon:icon});
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Slider added successfully");
        setIsSubmitted(true);
        setImg("")
        setIcon("")
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };
  //handle Submit edit Category
  const handleSubmitEditSlider = async (data: any, id: string) => {
    try {

      const res = await editSlider({ id, data:{
        ...data,
        img:img,
        icon:icon
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
        notifySuccess("Slider update successfully");

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
    handleSubmitAlbum,
    error,
    isSubmitted,
    handleSubmitEditSlider,
    img, setImg,
    icon, setIcon
  };
};

export default useSliderSubmit;
