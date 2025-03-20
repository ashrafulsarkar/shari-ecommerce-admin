import React from "react";
import ReactSelect from "react-select";

// type
type IPropType = {
  handleChange: (value: string | undefined) => void;
  default_val?: string;
};

const BrandStatus = ({ handleChange, default_val }: IPropType) => {
  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const defaultValue = options.find(option => option.value === default_val);

  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">Status</p>
      <ReactSelect
        onChange={(value) => handleChange(value?.value)}
        options={options}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default BrandStatus;
