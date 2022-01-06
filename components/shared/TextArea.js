export default function TextArea({
  register,
  errors = {},
  label,
  errorMsg,
  id,
  rows,
  divClassName,
  placeHolder,
}) {
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
      <textarea
        rows={rows || 3}
        id={id}
        placeholder={placeHolder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 
        focus:border-blue-500 block w-full p-2.5"
      />
      {errors.date && (
        <span className="text-red-500">
          {errorMsg || "This field is required"}
        </span>
      )}
    </div>
  );
}
