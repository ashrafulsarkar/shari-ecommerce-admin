import React, { useEffect, useState } from "react";

type ProductTypeSelectProps = {
  options: { id: string; name: string }[];
  defaultValue?: string;
  onChange: (selectedType: { id: string; name: string }) => void;
};

const ProductTypeSelect = ({ options, defaultValue, onChange }: ProductTypeSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      const defaultType = options.find((option) => option.name === defaultValue);
      if (defaultType) {
        onChange(defaultType);
      }
    }
  }, [defaultValue]);

  const handleSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find((option) => option.name === event.target.value);
    if (selectedOption) {
      setSelectedValue(selectedOption.name);
      onChange(selectedOption);
    }
  };

  return (
    <select value={selectedValue} className="input w-full py-3" onChange={handleSelected}>
      <option value="" disabled>
        Select type
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default ProductTypeSelect;
