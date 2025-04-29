import React, { useState, useEffect } from "react";
import { FieldErrors, UseFormRegister, Controller, Control } from "react-hook-form";
import { useGetAllBrandsQuery } from "@/redux/brand/brandApi";
import ReactSelect, { GroupBase } from "react-select";
import ErrorMsg from "../../common/error-msg";
import Loading from "../../common/loading";

type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control;
  setSelectBrand: React.Dispatch<React.SetStateAction<{ name: string; id: string }>>;
  default_value?: { brand: { id: string; name: string; } | string; } | null;
};

const ProductBrand = ({ errors, control, setSelectBrand, default_value }: IPropType) => {
  const { data: brands, isError, isLoading } = useGetAllBrandsQuery();
  const [hasDefaultValues, setHasDefaultValues] = useState<boolean>(false);

  // default value set
  useEffect(() => {
    if (default_value?.brand && !hasDefaultValues && brands?.result) {
      const brandId = typeof default_value.brand === 'string' ? default_value.brand : default_value.brand.id;
      const brand = brands.result.find((b) => b._id === brandId);
      if (brand) {
        setSelectBrand({ id: brand._id, name: brand.name });
        setHasDefaultValues(true);
      }
    }
  }, [default_value, brands, hasDefaultValues, setSelectBrand]);

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
  if (!isLoading && !isError && brands?.result.length === 0) {
    content = <ErrorMsg msg="No Brands Found" />;
  }

  if (!isLoading && !isError && brands?.success) {
    const brandItems = brands.result;

    // handleBrandChange
    const handleBrandChange = (selectBrand: string) => {
      const brand = brandItems.find((b) => b.name === selectBrand);
      if (brand) {
        setSelectBrand({ id: brand._id, name: brand.name });
      }
    };

    const option = brandItems.map((b) => ({
      value: b.name,
      label: b.name,
    })) as unknown as readonly (string | GroupBase<string>)[];

    const defaultBrandValue = default_value?.brand ? {
      label: typeof default_value.brand === 'string' 
        ? brandItems.find(b => b._id === default_value.brand)?.name || 'Select..'
        : default_value.brand.name || 'Select..',
      value: typeof default_value.brand === 'string'
        ? brandItems.find(b => b._id === default_value.brand)?.name || ''
        : default_value.brand.name || ''
    } : {
      label: "Select..",
      value: ''
    };

    content = (
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Brands <span className="text-red">*</span></p>
        <Controller
          name="brand"
          control={control}
          rules={{
            required: default_value?.brand ? false : "Brand is required!",
          }}
          render={({ field }) => (
            <ReactSelect
              {...field}
              value={field.value || defaultBrandValue}
              defaultValue={defaultBrandValue}
              onChange={(selectedOption) => {
                field.onChange(selectedOption);
                handleBrandChange(selectedOption?.value);
              }}
              options={option}
            />
          )}
        />
        <ErrorMsg msg={errors?.brand?.message as string} />
        <span className="text-tiny leading-4">Set the product Brand.</span>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default ProductBrand;
