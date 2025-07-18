"use client";
import React from "react";
import FormField from "../CustomInput/FormField";
import GlobalImageUpload from "../GlobalImageUpload/GlobalImageUpload";
import useAlbumSubmit from "@/hooks/useAlbumSubmit";

const AddAlbum = () => {
  const {img, setImg, errors, register, handleSubmit, handleSubmitAlbum } =
    useAlbumSubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-12">
        <form onSubmit={handleSubmit(handleSubmitAlbum)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md grid grid-cols-2 gap-6">
            <div>
              <FormField
                title="name"
                isRequired={true}
                placeHolder="Name"
                register={register}
                errors={errors}
              />
              <GlobalImageUpload
                imgUrl={img}
                setImgUrl={setImg}
              />
            </div>
            <div>

            </div>
            <div>
              <button className="tp-btn px-7 py-2">Add Album</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlbum;
