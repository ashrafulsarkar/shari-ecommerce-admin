import React from "react";

type SizesProps = {
  handleSizeChange: (sizes: string[], index: number) => void;
  field: any;
  index: number;
};

const Sizes: React.FC<SizesProps> = ({ handleSizeChange, field, index }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sizes = e.target.value.split(",").map((size) => size.trim());
    handleSizeChange(sizes, index);
  };

  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">Sizes</p>
      <input
        className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
        type="text"
        placeholder="Sizes"
        value={field.sizes.join(", ")}
        onChange={handleChange}
      />
      <span className="text-tiny leading-4">Enter sizes separated by commas.</span>
    </div>
  );
};

export default Sizes;