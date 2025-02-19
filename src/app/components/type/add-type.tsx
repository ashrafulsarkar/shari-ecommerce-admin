"use client";
import React from "react";
import ReactSelect from "react-select";
import useTypeSubmit from "@/hooks/useTypeSubmit";
import TypeTables from "./type-table";
import TypeFormField from "./form-field-two";
import TypeDesc from "./type-desc";
import TypeStatus from "./type-status";

const AddType = () => {
  const {
    errors,
    handleSubmit,
    register,
    setStatus,
    handleSubmitType,
    isSubmitted,
  } = useTypeSubmit();


  // handle Change status
  const handleChange = (value: string | undefined) => {
    setStatus(value as string);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitType)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* Form Field */}
            <TypeFormField register={register} errors={errors} name="Name" isReq={true} />
            {/* Form Field */}

            {/* description start */}
            <TypeDesc register={register}/>
            {/* description end */}

            <button className="tp-btn px-7 py-2">Add Type</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        {/* Type table start */}
        <TypeTables/>
        {/* Type table end */}
      </div>
    </div>
  );
};

export default AddType;
