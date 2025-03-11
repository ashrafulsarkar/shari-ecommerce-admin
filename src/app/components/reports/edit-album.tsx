"use client";
import React from "react";
import FormField from "../CustomInput/FormField";
import GlobalImageUpload from "../GlobalImageUpload/GlobalImageUpload";
import useAlbumSubmit from "@/hooks/useAlbumSubmit";
import { useGetAlbumQuery } from "@/redux/album/albumApi";

const EditAlbum = ({ id }: { id: string }) => {
  const { data: albumData, isError, isLoading } = useGetAlbumQuery(id);
  const {
    img,
    setImg,
    errors,
    register,
    handleSubmit,
    error,
    isSubmitted,
    handleSubmitEditAlbum,
  } = useAlbumSubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-12">
        {albumData && (
          <form
            onSubmit={handleSubmit((data) => handleSubmitEditAlbum(data, id))}
          >
            <div className="mb-6 bg-white px-8 py-8 rounded-md grid grid-cols-2 gap-6">
              <div>
                <FormField
                  title="name"
                  isRequired={true}
                  placeHolder="Name"
                  register={register}
                  errors={errors}
                  defaultValue={albumData?.name}
                />

                <GlobalImageUpload
                  imgUrl={img}
                  setImgUrl={setImg}
                  default_img={albumData?.img}
                />
              </div>
              <div></div>
              <div>
                <button className="tp-btn px-7 py-2">Update customer</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditAlbum;
