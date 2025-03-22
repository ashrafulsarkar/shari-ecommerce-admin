import React from "react";

interface SwitcherProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switcher: React.FC<SwitcherProps> = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={`w-10 h-[20px] rounded-full transition-all duration-300 peer-focus:outline-none ${
          checked ? "bg-blue-500" : "bg-red"
        }`}
      >
        <div
          className={`absolute top-1 w-3.5 h-3.5 bg-white rounded-full transition-all duration-300 ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switcher;
