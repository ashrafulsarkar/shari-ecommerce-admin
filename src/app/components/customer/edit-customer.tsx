"use client";
import React from "react";
import TextArea from "../CustomInput/TextArea";
import FormField from "../CustomInput/FormField";
import useCustomerSubmit from "@/hooks/useCustomerSubmit";
import { useGetCustomerQuery } from "@/redux/customer/customerApi";
import SelectOption from "../CustomInput/SelectOption";
import GlobalImageUpload from "../GlobalImageUpload/GlobalImageUpload";

const  EditCustomer = ({ id }: { id: string }) => {
  const { data: customerData, isError, isLoading } = useGetCustomerQuery(id);
  const {
    img,
    setImg,
    errors,
    register,
    handleSubmit,
    error,
    isSubmitted,
    handleSubmitEditCustomer,
  } = useCustomerSubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-12">
        {customerData && (
          <form
            onSubmit={handleSubmit((data) =>
              handleSubmitEditCustomer(data, id)
            )}
          >
           <div className="mb-6 bg-white px-8 py-8 rounded-md grid grid-cols-2 gap-6">
                       <div>
                       <FormField
                         title="name"
                         isRequired={true}
                         placeHolder="Name"
                         register={register}
                         errors={errors}
                         defaultValue={customerData?.name}
                       />
                       <FormField
                         title="email"
                         isRequired={true}
                         placeHolder="email"
                         register={register}
                         errors={errors}
                         defaultValue={customerData?.email}
                       />
                       <FormField
                         title="contactNumber"
                         isRequired={false}
                         placeHolder="Contact Number"
                         register={register}
                         errors={errors}
                         defaultValue={customerData?.contactNumber}
                       />
                       <FormField
                         title="phone"
                         isRequired={false}
                         placeHolder="Phone"
                         register={register}
                         errors={errors}
                         defaultValue={customerData?.phone}
                       />
                       <FormField
                         title="password"
                         isRequired={false}
                         placeHolder="password"
                         register={register}
                         errors={errors}

                       />
                       <GlobalImageUpload
                          imgUrl={img}
                          setImgUrl={setImg}
                          default_img={customerData?.imageURL}
                        />
                       </div>
                       <div>

                       <TextArea
                         title="shippingAddress"
                         isRequired={false}
                         placeHolder="Shippping address"
                         register={register}
                         errors={errors}
                         defaultValue={customerData?.shippingAddress}
                       />
                       <TextArea
                         title="bio"
                         isRequired={false}
                         placeHolder="Bio"
                         register={register}
                         errors={errors}
                         defaultValue={customerData?.bio}
                       />
                       <TextArea
                         title="address"
                         isRequired={false}
                         placeHolder="Aaddress"
                         register={register}
                         errors={errors}
                         defaultValue={customerData?.address}
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
                          defaultValue={customerData?.status}
                        />


           </div>
           <div>
           <button className="tp-btn px-7 py-2">Update customer</button>
           </div>
                     </div>
          </form>
        )}
      </div>

    </div>
  );
};

export default EditCustomer;
