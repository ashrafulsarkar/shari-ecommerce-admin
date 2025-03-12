"use client";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useBusinessSettingMutation, useGetbusinessSettingAllQuery } from "@/redux/auth/authApi";
import { useGetAllTypesQuery } from "@/redux/type/typeApi";
import ProductTypeSelect from "./ProductTypeSelect";
type IType = {
  name: string;
  id: string;
};
const SettingContent = () => {
  const { data: settings = [], isError, isLoading } = useGetbusinessSettingAllQuery();
  const [businessSetting] = useBusinessSettingMutation();
  const { data: types, } = useGetAllTypesQuery();

  const formattedTypes = types?.result?.map((type: any) => ({
    id: type._id || type.name, // Fallback to name if id is missing
    name: type.name,
  })) || [];

  const { user } = useSelector((state: RootState) => state.auth);
  const [type, setType] = useState<IType>({ name: "", id: "" });
  const [typeTopSeller, setTypeTopSeller] = useState<IType>({ name: "", id: "" });
  const [typeFeatureProduct, setTypeFeatureProduct] = useState<IType>({ name: "", id: "" });

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue, // Use setValue to update the field value directly
  } = useForm();


  // Manage switch state for product feature (defaulting to the value from settings)
  useEffect(() => {
    if (settings?.app_name || settings?.inside_dhaka || settings?.outside_dhaka || settings?.is_feature_enabled !== undefined) {
      reset({
        app_name: settings?.app_name || "",
        inside_dhaka: settings?.inside_dhaka || "",
        outside_dhaka: settings?.outside_dhaka || "",
        is_feature_enabled: settings?.is_feature_enabled ?? false,  // Set default value for the feature toggle
      });
    }
  }, [settings, reset]);

  // onSubmit handler
  const onSubmit = async (formData: {
    app_name?: string;
    outside_dhaka?: string;
    inside_dhaka?: string;
    is_feature_enabled?: boolean;
  }) => {
    if (user?._id && formData) {
      // Prepare the settings data to send
      const settingsData = [
        { key: "app_name", value: formData.app_name },
        { key: "inside_dhaka", value: formData.inside_dhaka },
        { key: "outside_dhaka", value: formData.outside_dhaka },
        { key: "is_feature_enabled", value: formData.is_feature_enabled },
        { key: "popular_type", value: type },
        { key: "typeTopSeller", value: typeTopSeller },
        { key: "typeFeatureProduct", value: typeFeatureProduct },
      ];

      // Call the mutation to update the settings
      const res = await businessSetting(settingsData);

      // Handle the response
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Setting updated successfully");

      }
    }
  };

  // Loading or error handling
  if (isLoading) return <div>Loading settings...</div>;
  if (isError) return <div>Error loading settings.</div>;



  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-8">
        <div className="py-10 px-10 bg-white rounded-md">
          <h5 className="text-xl mb-6">Basic Information</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
              <div className="mb-5">
                <p className="mb-0 text-base text-black">App Name</p>
                <input
                  {...register("app_name")}
                  name="app_name"
                  className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
                  type="text"
                  placeholder="App name"
                />
              </div>
            </div>
            <div className="mb-5">
              <p className="mb-0 text-base text-black">Inside Dhaka</p>
              <input
                {...register("inside_dhaka")}
                name="inside_dhaka"
                className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
                type="text"
                placeholder="Inside Dhaka"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
              <div className="mb-5">
                <p className="mb-0 text-base text-black">Outside Dhaka</p>
                <input
                  {...register("outside_dhaka")}
                  name="outside_dhaka"
                  className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
                  type="text"
                  placeholder="Outside Dhaka"
                />
              </div>
            </div>

            {/* Product Feature Switch */}
            <div className="flex items-center justify-between mt-5">
              <p className="mb-0 text-base text-black">Enable Product Feature</p>
              <label className="switch">
                <input
                  type="checkbox"
                  {...register("is_feature_enabled")} // Registering the checkbox as a field
                  onChange={(e) => setValue("is_feature_enabled", e.target.checked)} // Update the value of the field
                />
                <span className="slider"></span>
              </label>
            </div>
            {/* Product Feature Switch */}
            <div className="flex items-center justify-between mt-5">
              <p className="mb-0 text-base text-black">Popular Product</p>
              <ProductTypeSelect
              options={formattedTypes}
              defaultValue={settings?.popular_type?.name}
              onChange={setType}
            />

            </div>
            {/* Product Feature Switch */}
            <div className="flex items-center justify-between mt-5">
              <p className="mb-0 text-base text-black">Top Seller Product</p>
              <ProductTypeSelect
              options={formattedTypes}
              defaultValue={settings?.typeTopSeller?.name}
              onChange={setTypeTopSeller}
            />
            </div>
            {/* Product Feature Switch */}
            <div className="flex items-center justify-between mt-5">
              <p className="mb-0 text-base text-black">Feature Product</p>
              <ProductTypeSelect
              options={formattedTypes}
              defaultValue={settings?.typeFeatureProduct?.name}
              onChange={setTypeFeatureProduct}
            />
            </div>

            <div className="text-end mt-5">
              <button className="tp-btn px-10 py-2">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingContent;
