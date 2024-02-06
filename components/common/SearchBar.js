import Image from "next/image";

export default function SearchBar({ onChange, value }) {
  return (
    <div className="relative flex mx-2 w-full">
      <input onChange={(ev) => onChange(ev.target.value)} value={value} name="search" placeholder="Search..."
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full block w-full p-2.5" />
      <div className="absolute right-0 top-0 bottom-0 flex items-center px-4 rounded-full">
        <Image src={'/assets/search-outline.svg'} width={16} height={16} alt="search" />
      </div>
    </div>
  )
}