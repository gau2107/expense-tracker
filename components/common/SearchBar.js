export default function SearchBar({ onChange, value }) {
  return (
    <div>
      <input onChange={(ev) => onChange(ev.target.value)} value={value} name="search" placeholder="Search"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
    </div>
  )
}