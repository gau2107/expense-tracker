export default function MonthFilter({ onChange }) {
  return (
    <>
      <input type="month"
        onChange={(ev) => onChange(ev.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </>
  )
}