"use client";
import React from "react";
import FormField from "../CustomInput/FormField";
import useAreaSubmit from "@/hooks/useAreaSubmit";

const AddArea = () => {
  const { errors, register, handleSubmit, handleSubmitArea } =
    useAreaSubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-12">
        <form onSubmit={handleSubmit(handleSubmitArea)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md grid grid-cols-2 gap-6">
            <div>
              <FormField
                title="name"
                isRequired={true}
                placeHolder="Name"
                register={register}
                errors={errors}
              />
            </div>
            <div>
              <FormField
                title="charge"
                isRequired={true}
                placeHolder="charge"
                register={register}
                errors={errors}
              />
            </div>
            <div>

            </div>
            <div>
              <button className="tp-btn px-7 py-2">Add Area</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArea;
