export default function Button({onCLick, label, type}) {
  return (
    <input
    type={type}
    className="inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase 
    rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    >
    </input>
  );
}
