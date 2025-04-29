import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface IAdditionalInfo {
  id: string;
  title: string;
  description: string;
}

interface IPropType {
  setAdditionalInformation: React.Dispatch<React.SetStateAction<IAdditionalInfo[]>>;
  default_value?: IAdditionalInfo[];
}

const AdditionalInformation = ({ setAdditionalInformation, default_value }: IPropType) => {
  const [info, setInfo] = useState<IAdditionalInfo[]>(default_value || []);

  useEffect(() => {
    if (default_value) {
      setInfo(default_value);
      setAdditionalInformation(default_value);
    }
  }, [default_value, setAdditionalInformation]);

  // handle add row
  const handleAddRow = () => {
    const newInfo = [...info, { id: uuidv4(), title: "", description: "" }];
    setInfo(newInfo);
    setAdditionalInformation(newInfo);
  };

  // handleInputChange
  const handleInputChange = (
    id: string,
    field: keyof Omit<IAdditionalInfo, "id">,
    value: string
  ) => {
    const updatedInfo = info.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setInfo(updatedInfo);
    setAdditionalInformation(updatedInfo);
  };

  // handleRemoveRow
  const handleRemoveRow = (id: string) => {
    const filteredInfo = info.filter((item) => item.id !== id);
    setInfo(filteredInfo);
    setAdditionalInformation(filteredInfo);
  };

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <div className="mb-6">
        <h4 className="text-[22px]">Additional Information</h4>
      </div>
      {info.map((item) => (
        <div key={item.id} className="relative">
          <div className="grid grid-cols-12 gap-x-6 mb-6">
            <div className="col-span-5">
              <input
                onChange={(e) =>
                  handleInputChange(item.id, "title", e.target.value)
                }
                value={item.title}
                type="text"
                placeholder="Key"
                className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              />
            </div>
            <div className="col-span-5">
              <input
                onChange={(e) =>
                  handleInputChange(item.id, "description", e.target.value)
                }
                value={item.description}
                type="text"
                placeholder="Value"
                className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              />
            </div>
            <div className="col-span-2">
              <button
                onClick={() => handleRemoveRow(item.id)}
                type="button"
                className="tp-btn px-5 py-2 mb-5 delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleAddRow}
        type="button"
        className="tp-btn px-5 py-2 mb-5"
      >
        Add Item
      </button>
    </div>
  );
};

export default AdditionalInformation;
