export default function MonthFilter({ onChange, value }) {
  return (
    <>
      <input type="month"
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full
          block p-2.5 mx-2 min-w-fit"
      />
    </>
  )
}