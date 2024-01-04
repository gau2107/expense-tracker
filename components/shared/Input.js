import ValidationMessage from "./ValidationMesage";

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
  return (
    <div className={divClassName || "mb-6"}>
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
        id={id} placeholder={placeHolder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...inpRef}
      />
       {errors[name] && <ValidationMessage message={errorMsg}/>}
    </div>
  );
}
