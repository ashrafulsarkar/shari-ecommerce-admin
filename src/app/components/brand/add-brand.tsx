"use client";
import React from "react";
import useBrandSubmit from "@/hooks/useBrandSubmit";
import BrandTables from "./brand-table";
import BrandFormField from "./form-field-two";
import BrandDesc from "./brand-desc";
import BrandStatus from "./brand-status";

const AddBrand = () => {
  const {
    errors,
    handleSubmit,
    register,
    setStatus,
    handleSubmitBrand,
    isSubmitted,
  } = useBrandSubmit();


  // handle Change status
  const handleChange = (value: string | undefined) => {
    setStatus(value as string);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitBrand)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* Form Field */}
            <BrandFormField register={register} errors={errors} name="Name" isReq={true} />
            {/* Form Field */}

            {/* description start */}
            <BrandDesc register={register}/>
            {/* description end */}

            {/* brand status start */}
            <BrandStatus handleChange={handleChange} />
            {/* brand status end */}

            <button className="tp-btn px-7 py-2">Add Brand</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        {/* brand table start */}
        <BrandTables/>
        {/* brand table end */}
      </div>
    </div>
  );
};

export default AddBrand;
