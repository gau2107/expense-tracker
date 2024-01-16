export default function Button({ onClick, label, type, color }) {
  let colors = {
    "red": "inline-block px-6 mr-6 py-2 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase \
    rounded-full hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-pointer",
    "black": "inline-block px-6 mr-6 py-2 border-2 border-black text-black font-medium text-xs leading-tight uppercase \
    rounded-full hover:bg-black hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-pointer"
  };
  return (
    <input
      type={type}
      onClick={() => onClick && onClick()}
      className={colors[color || "black"]}
      value={label}
    ></input>
  );
}
