import { Controller } from "react-hook-form";
import ValidationMessage from "./ValidationMesage";
import Select from 'react-select'

export default function SearchSelect({
  errors = {},
  label,
  name,
  id,
  divClassName,
  placeHolder,
  options,
  errorMsg,
  valueKey,
  labelKey,
  control,
  setValue
}) {
  return (
    <div className={typeof (divClassName) === 'string' ? divClassName : "mb-6"}>
      {label && (
        <label
          htmlFor={id}
          className="text-md font-medium text-gray-600 block mb-2"
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        id={id}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={options.find((val) => val.id == field.value)}
            onChange={(selectedOption) => {
              setValue(name, selectedOption.id)
            }}
            placeholder={placeHolder}
            // classNamePrefix ="bg-gray-50 border-gray-300 text-black sm:text-sm rounded-lg block w-full"
            options={options}
            getOptionLabel={(option) => option[labelKey]}
            getOptionValue={(option) => option[valueKey]}
          />
        )} />
      {errors[name] && <ValidationMessage message={errorMsg} />}
    </div>
  );
}
