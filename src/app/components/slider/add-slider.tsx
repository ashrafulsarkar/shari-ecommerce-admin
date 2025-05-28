"use client";
import React from "react";
import FormField from "../CustomInput/FormField";
import GlobalImageUpload from "../GlobalImageUpload/GlobalImageUpload";
import useSliderSubmit from "@/hooks/useSliderSubmit";
import SelectOption from "../CustomInput/SelectOption";

const AddAlbum = () => {
  const {img, setImg,icon, setIcon, errors, register, handleSubmit, handleSubmitAlbum } =
    useSliderSubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-12">
        <form onSubmit={handleSubmit(handleSubmitAlbum)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md grid grid-cols-2 gap-6">
            <div>
              <FormField
                title="title_1"
                isRequired={true}
                placeHolder="Title 1"
                register={register}
                errors={errors}
              />

              <FormField
                title="sub_title_1"
                isRequired={true}
                placeHolder="Sub Title 1"
                register={register}
                errors={errors}
              />
              <FormField
                title="title_2"
                isRequired={false}
                placeHolder="Title 2"
                register={register}
                errors={errors}
              />
              <FormField
                title="sub_title_2"
                isRequired={false}
                placeHolder="Sub Title 2"
                register={register}
                errors={errors}
              />
              <div>
                <SelectOption
                  title="type"
                  isRequired={true}
                  options={[
                    { label: "Slider", value: "slider" },
                    { label: "Jo", value: "jo" },
                    { label: "Lee", value: "lee" },
                  ]}
                  register={register}
                  errors={errors}
                />

              </div>
              <div>
                <h4>Slider Image</h4>
                <GlobalImageUpload
                imgUrl={img}
                setImgUrl={setImg}
              />
              </div>
               <div>
                <h4>Icon Image</h4>
              <GlobalImageUpload
                imgUrl={icon}
                setImgUrl={setIcon}
              />
            </div>
            </div>
            <div>

            </div>
            <div>
              <button className="tp-btn px-7 py-2">Add Slider</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlbum;
