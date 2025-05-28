"use client";
import React from "react";
import FormField from "../CustomInput/FormField";
import GlobalImageUpload from "../GlobalImageUpload/GlobalImageUpload";
import useSliderSubmit from "@/hooks/useSliderSubmit";
import { useGetSliderQuery } from "@/redux/slider/sliderApi";
import SelectOption from "../CustomInput/SelectOption";

const EditAlbum = ({ id }: { id: string }) => {
  const { data: sliderData, isError, isLoading } = useGetSliderQuery(id);
  const {
    img,
    setImg,
    icon, setIcon,
    errors,
    register,
    handleSubmit,
    error,
    isSubmitted,
    handleSubmitEditSlider,
  } = useSliderSubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-12">
        {sliderData && (
          <form
            onSubmit={handleSubmit((data) => handleSubmitEditSlider(data, id))}
          >
            <div className="mb-6 bg-white px-8 py-8 rounded-md grid grid-cols-2 gap-6">
              <div>
                <FormField
                  title="title_1"
                  isRequired={true}
                  placeHolder="Title 1"
                  register={register}
                  errors={errors}
                  defaultValue={sliderData?.title_1}
                />
                <FormField
                                title="sub_title_1"
                                isRequired={true}
                                placeHolder="Sub Title 1"
                                register={register}
                                errors={errors}
                                defaultValue={sliderData?.sub_title_1}
                              />
                              <FormField
                                title="title_2"
                                isRequired={false}
                                placeHolder="Title 2"
                                register={register}
                                errors={errors}
                                defaultValue={sliderData?.title_2}
                              />
                              <FormField
                                title="sub_title_2"
                                isRequired={false}
                                placeHolder="Sub Title 2"
                                register={register}
                                errors={errors}
                                defaultValue={sliderData?.sub_title_2}
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
                  defaultValue={sliderData?.type}
                />

              </div>
              <div>
                <h4>Slider Image</h4>
                <GlobalImageUpload
                  imgUrl={img}
                  setImgUrl={setImg}
                  default_img={sliderData?.img}
                />
              </div>
              </div>

               <div>
                <h4>Icon Image</h4>
              <GlobalImageUpload
                imgUrl={icon}
                setImgUrl={setIcon}
                default_img={sliderData?.icon}
              />
            </div>
              <div>
                <button className="tp-btn px-7 py-2">Update</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditAlbum;
