export default function Button({ onCLick, label, type }) {
  return (
    <input
      type={type}
      className="inline-block px-6 mr-6 py-2 border-2 border-black text-black font-medium text-xs leading-tight uppercase 
    rounded-full hover:bg-black hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-pointer"
      value={label}
    ></input>
  );
}
