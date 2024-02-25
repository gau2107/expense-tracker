import { useEffect } from "react";
import ValidationMessage from "./ValidationMesage";
import { useForm } from 'react-hook-form';

export default function Input({
  name,
  errors = {},
  label,
  errorMsg,
  id,
  type,
  divClassName,
  placeHolder,
  inpRef,
  defaultValue
}) {

  useEffect(() => {
    // stop step on mouse wheel events
    const input = document.querySelector(`input[name=${name}]`);
    input.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });

    return () => {
      input.removeEventListener('wheel', (e) => e.preventDefault());
    };

  }, [])
  return (
    <div className={typeof (divClassName) ? divClassName : "mb-6"}>
      {label && (
        <label
          htmlFor={id}
          className="text-md font-medium text-gray-600 block mb-2"
        >
          {label}
        </label>
      )}
      <input
        name={name}
        defaultValue={defaultValue}
        type={type || "text"}
        step={0.1}
        id={id} placeholder={placeHolder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
        {...inpRef}
      />
      {errors[name] && <ValidationMessage message={errorMsg} />}
    </div>
  );
}
