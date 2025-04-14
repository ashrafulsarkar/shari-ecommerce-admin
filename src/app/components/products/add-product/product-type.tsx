import React, { useState, useEffect } from "react";
import {
  FieldErrors,
  UseFormRegister,
  Controller,
  Control,
} from "react-hook-form";
import { useGetAllTypesQuery } from "@/redux/type/typeApi";

import ReactSelect, { GroupBase } from "react-select";
import ErrorMsg from "../../common/error-msg";
import Loading from "../../common/loading";
// prop type
type IPropType = {
  register?: UseFormRegister<any>; // optional
  errors?: FieldErrors<any>;       // optional
  control: Control;                // required
  setSelectType: React.Dispatch<React.SetStateAction<{ name?: string; id?: string }>>; // optional ✅
  default_value?: {
    type?: string; // optional inside optional
  };
};


const ProductType = ({
  errors,
  control,
  setSelectType,
  default_value,
}: IPropType) => {
  const { data: types, isError, isLoading } = useGetAllTypesQuery();

  const [hasDefaultValues, setHasDefaultValues] = useState<boolean>(false);
  // default value set
  useEffect(() => {
    if (
      default_value?.type &&
      !hasDefaultValues &&
      types?.result
    ) {
      const type = types.result.find((b) => b.name === default_value?.type);
      if (type) {
        setTimeout(() => {
          setSelectType({ id: type._id as string, name: default_value?.type });

          setHasDefaultValues(true);
        }, 0);
      }
    }
  }, [
    default_value,
    types,
    hasDefaultValues,
  ]);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Loading...</p>
        <Loading loading={isLoading} spinner="scale" />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && isError && types?.result.length === 0) {
    content = <ErrorMsg msg="No Category Found" />;
  }

  if (!isLoading && !isError && types?.success) {
    const typeItems = types.result;

    // handleTypeChange
    const handleTypeChange = (selectType: string) => {
      const type = typeItems.find((b) => b.name === selectType);
      setSelectType({ id: type?._id as string, name: selectType });
    };
    const option = typeItems.map((b) => ({
      value: b.name,
      label: b.name,
    })) as unknown as readonly (string | GroupBase<string>)[];

    content = (
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Product Types <span className="text-red">*</span></p>
        <Controller
          name="type"
          control={control}
          rules={{
            required: default_value?.type ? false : false,
          }}
          render={({ field }) => (
            <ReactSelect
              {...field}
              value={field.value}
              defaultValue={
                default_value
                  ? {
                      label: default_value?.type,
                      value: default_value?.type,
                    }
                  : {
                      label: "Select..",
                      value: 0,
                    }
              }
              onChange={(selectedOption) => {
                field.onChange(selectedOption);
                handleTypeChange(selectedOption?.value);
              }}
              options={option}
            />
          )}
        />
        <ErrorMsg msg={errors?.type?.message as string} />
        <span className="text-tiny leading-4">Set the product Type.</span>
      </div>
    );
  }
  return (
      <div>
        {content}
      </div>
  );
};

export default ProductType;