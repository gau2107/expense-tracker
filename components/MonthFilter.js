export default function MonthFilter({ onChange, value }) {
  return (
    <>
      <input type="month"
        max={new Date()}
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full 
      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </>
  )
}