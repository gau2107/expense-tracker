export default function Select({
  register,
  errors = {},
  label,
  errorMsg,
  id,
  divClassName,
  placeHolder,
  options,
  defaultValue
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
      <select
        id={id} placeholder={placeHolder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...register("category", { required: true })}
      >
        {defaultValue && <option value="">Category</option>}
        {options.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      {errors.category && (
        <span className="text-red-500">This field is required</span>
      )}
    </div>
  );
}
