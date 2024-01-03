import ValidationMessage from "./ValidationMesage";

export default function Select({
  errors = {},
  label,
  name,
  id,
  divClassName,
  placeHolder,
  options,
  defaultValue,
  inpRef,
  errorMsg,
  valueKey,
  labelKey
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
        name={name}
        id={id}
        // defaultValue={defaultValue}
        placeholder={placeHolder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...inpRef}
      >
        {placeHolder && <option value="">{placeHolder}</option>}
        {options.map((cat) => (
          <option key={cat[valueKey]} value={cat[valueKey]}>
            {cat[labelKey]}
          </option>
        ))}
      </select>
      {errors[name] && <ValidationMessage message={errorMsg}/>}
    </div>
  );
}
