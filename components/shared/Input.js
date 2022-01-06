export default function Input({
  name,
  errors = {},
  label,
  errorMsg,
  id,
  type,
  divClassName,
  placeHolder,
  inpRef
}) {
  console.log(errors);
  return (
    <div className={divClassName || "mb-6"}>
      {label && (
        <label
          forHtml="date"
          className="text-md font-medium text-gray-600 block mb-2"
        >
          {label}
        </label>
      )}
      <input
        name={name}
        type={type || "text"}
        id={id} placeholder={placeHolder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...inpRef}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm ">
          {errorMsg || "This field is required"}
        </span>
      )}
    </div>
  );
}
