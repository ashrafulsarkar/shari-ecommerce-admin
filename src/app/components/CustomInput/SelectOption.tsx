import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMsg from "../common/error-msg";

const SelectOption = ({
  title,
  isRequired,
  bottomTitle,
  options,
  register,
  errors,
  defaultValue,
}: {
  title: string;
  isRequired: boolean;
  bottomTitle?: string;
  options: { label: string; value: string | number }[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  defaultValue?: string | number;
}) => {
  return (
    <div className="mb-6">
      {title && (
        <p className="mb-0 text-base text-black capitalize">
          {title} {isRequired && <span className="text-red">*</span>}
        </p>
      )}
      <select
        {...register(title.split(" ").join("_"), {
          required: isRequired ? `${title} is required!` : false,
        })}
        defaultValue={defaultValue}
        className="input w-full py-3"
      >
        <option value="" disabled>
          Select {title}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isRequired && (
        <ErrorMsg msg={(errors?.[title.split(" ").join("_")]?.message as string) || ""} />
      )}
      {bottomTitle && <span className="text-tiny leading-4">{bottomTitle}</span>}
    </div>
  );
};

export default SelectOption;
