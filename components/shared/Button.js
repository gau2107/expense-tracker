export default function Button({ onClick, label, type, color }) {
  let colors = {
    "red": "inline-block px-6 mr-6 py-2 border-2 border-red-500 text-red-500 font-500 leading-tight uppercase \
      rounded-full hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-pointer",
    "white": "inline-block px-6 mr-6 py-2 border-2 border-black text-black font-500 leading-tight uppercase \
      rounded-full hover:bg-black hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-pointer",
    "black": "inline-block px-6 mr-6 py-4 border-2 bg-black border-white text-white font-500 leading-tight uppercase \
      rounded-full hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-pointer"
  };
  return (
    <button
      type={type}
      onClick={() => onClick && onClick()}
      className={colors[color || "white"]}
    >{label}</button>
  );
}
