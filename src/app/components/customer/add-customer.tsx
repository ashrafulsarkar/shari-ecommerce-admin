"use client";
import React from "react";
import FormField from "../CustomInput/FormField";
import TextArea from "../CustomInput/TextArea";
import useCustomerSubmit from "@/hooks/useCustomerSubmit";
import GlobalImageUpload from "../GlobalImageUpload/GlobalImageUpload";
import SelectOption from "../CustomInput/SelectOption";

const AddCustomer = () => {
  const {img, setImg, errors, register, handleSubmit, handleSubmitCustomer } =
    useCustomerSubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-12">
        <form onSubmit={handleSubmit(handleSubmitCustomer)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md grid grid-cols-2 gap-6">
            <div>
              <FormField
                title="name"
                isRequired={true}
                placeHolder="Name"
                register={register}
                errors={errors}
              />
              <FormField
                title="email"
                isRequired={true}
                placeHolder="email"
                register={register}
                errors={errors}
              />
              <FormField
                title="contactNumber"
                isRequired={true}
                placeHolder="contactNumber"
                register={register}
                errors={errors}
              />
              <FormField
                title="phone"
                isRequired={true}
                placeHolder="Phone"
                register={register}
                errors={errors}
              />
              <FormField
                title="password"
                isRequired={true}
                placeHolder="password"
                register={register}
                errors={errors}
              />
              <GlobalImageUpload
                imgUrl={img}
                setImgUrl={setImg}
              />
            </div>
            <div>
              <TextArea
                title="shippingAddress"
                isRequired={false}
                placeHolder="Shippping address"
                register={register}
                errors={errors}
              />
              <TextArea
                title="bio"
                isRequired={false}
                placeHolder="Bio"
                register={register}
                errors={errors}
              />
              <TextArea
                title="address"
                isRequired={false}
                placeHolder="Aaddress"
                register={register}
                errors={errors}
              />

<SelectOption
                          title="status"
                          isRequired={true}
                          options={[
                            { label: "Active", value: "active" },
                            { label: "In-Active", value: "inactive" },
                            { label: "Blocked", value: "blocked" },
                          ]}
                          register={register}
                          errors={errors}
                        />
            </div>
            <div>
              <button className="tp-btn px-7 py-2">Add customer</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
