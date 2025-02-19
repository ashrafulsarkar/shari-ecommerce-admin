"use client";
import React from "react";
import useTypeSubmit from "@/hooks/useTypeSubmit";
import ErrorMsg from "../common/error-msg";
import TypeTables from "./type-table";
import { useGetTypeQuery } from "@/redux/type/typeApi";
import Loading from "../common/loading";
import TypeFormField from "./form-field-two";
import TypeDesc from "./type-desc";
import TypeStatus from "./type-status";

const EditType = ({id}:{id:string}) => {
  const {
    errors,
    handleSubmit,
    register,
    setStatus,
    handleSubmitEditType,
    isSubmitted,
  } = useTypeSubmit();
  // get Type 
  const {
    data: type,
    isLoading,
    isError
  } = useGetTypeQuery(id)

  // handle Change status
  const handleChange = (value: string | undefined) => {
    setStatus(value as string);
  };

  // decide to render
  let content = null;
  if(isLoading){
    content = <Loading loading={isLoading} spinner="bar" />
  }
  if(!type && isError){
    content = <ErrorMsg msg="There was an error" />
  }
  if(type && !isError){
    content = (
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit((data) => handleSubmitEditType(data, id))}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            
            {/* Form Field */}
            <TypeFormField default_val={type.name} register={register} errors={errors} name="Name" isReq={true} />
            {/* Form Field */}

            {/* description start */}
            <TypeDesc register={register} default_val={type.description}/>
            {/* description end */}

            <button className="tp-btn px-7 py-2">Edit Type</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {content}
      <div className="col-span-12 lg:col-span-8">
        {/* Type table start */}
        <TypeTables/>
        {/* Type table end */}
      </div>
    </div>
  );
};

export default EditType;
