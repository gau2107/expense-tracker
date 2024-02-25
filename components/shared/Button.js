export default function Button({ onClick, label, type, color }) {
  const baseClass = `inline-block xl:text-base text-sm mr-6 border-2 font-500 leading-tight uppercase rounded-full focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-pointer
    px-2 sm:mr-2 xl:px-6 lg:px-4 xl:mr-10`;
  let colors = {
    "red": `${baseClass} py-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white`,
    "white": `${baseClass} py-2 border-black text-black hover:bg-black hover:text-white`,
    "black": `${baseClass} py-4 bg-black border-white text-white hover:bg-white hover:text-black hover:border-black`
  };
  return (
    <button
      type={type}
      onClick={() => onClick && onClick()}
      className={colors[color || "white"]}
    >{label}</button>
  );
}
