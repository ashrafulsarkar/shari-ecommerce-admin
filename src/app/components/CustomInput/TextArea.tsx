import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMsg from "../common/error-msg";

const TextArea = ({
  title,
  isRequired,
  bottomTitle,
  placeHolder,
  register,
  errors,
  defaultValue,
}: {
  title: string;
  isRequired: boolean;
  bottomTitle?: string;
  placeHolder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  defaultValue?:string | number;
}) => {
  return (
    <div className="mb-6">
      {title && (
        <p className="mb-0 text-base text-black capitalize">
          {title} {isRequired && <span className="text-red">*</span>}
        </p>
      )}
      <textarea
        {...register(title.split(" ").join("_"), {
          required: isRequired ? `${title} is required!` : false,
        })}
        name={title}
        id={title}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        className="input h-[100px] w-full py-3 resize-none"

      />
       {isRequired && (
        <ErrorMsg msg={(errors?.[title]?.message as string) || ""} />
      )}
      {bottomTitle && (
        <span className="text-tiny leading-4">{bottomTitle}</span>
      )}
    </div>
  );
};

export default TextArea;
