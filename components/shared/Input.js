export default function Input({ register, errors = {}, label, errorMsg, id, type, divClassName }) {
  return (
    <div className={divClassName || "mb-6"}>
      <label
        forHtml="date"
        className="text-md font-medium text-gray-600 block mb-2"
      >
        {label}
      </label>
      <input
        type={type || 'text'}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...register("date", { required: true })}
      />
      {errors.date && (
        <span className="text-red-500">{errorMsg || 'This field is required'}</span>
      )}
    </div>
  );
}
