"use client";
import React from "react";
import FormField from "../CustomInput/FormField";
import useAreaSubmit from "@/hooks/useAreaSubmit";
import { useGetAreaQuery } from "@/redux/area/areaApi";

const EditArea = ({ id }: { id: string }) => {
  const { data: sliderData, isError, isLoading } = useGetAreaQuery(id);
  const {
    errors,
    register,
    handleSubmit,
    error,
    isSubmitted,
    handleSubmitEditArea,
  } = useAreaSubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-12">
        {sliderData && (
          <form
            onSubmit={handleSubmit((data) => handleSubmitEditArea(data, id))}
          >
            <div className="mb-6 bg-white px-8 py-8 rounded-md grid grid-cols-2 gap-6">
              <div>
                <FormField
                  title="name"
                  isRequired={true}
                  placeHolder="Name"
                  register={register}
                  errors={errors}
                  defaultValue={sliderData?.name}
                />

            </div>
            <div>
                          <FormField
                            title="charge"
                            isRequired={true}
                            placeHolder="charge"
                            register={register}
                            errors={errors}
                            defaultValue={sliderData?.charge}
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

export default EditArea;
