import { notifySuccess, notifyError } from "@/utils/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { useAddAlbumMutation, useEditAlbumMutation } from "@/redux/album/albumApi";

const useAlbumSubmit = () => {
  const [parent, setParent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [
    addAlbum,
    { data: categoryData, isError, isLoading, error: addCateErr },
  ] = useAddAlbumMutation();
  // edit
  const [
    editAlbum,
    { data: editCateData, isError: editErr, isLoading: editLoading, error: editCateErr },
  ] = useEditAlbumMutation();

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
      const res = await addAlbum({...data,img:img});
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Album added successfully");
        setIsSubmitted(true);
        setImg("")
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };
  //handle Submit edit Category
  const handleSubmitEditAlbum = async (data: any, id: string) => {
    try {

      const res = await editAlbum({ id, data:{
        ...data,
        img:img
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
        notifySuccess("Album update successfully");

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
    handleSubmitEditAlbum,
    img, setImg
  };
};

export default useAlbumSubmit;
