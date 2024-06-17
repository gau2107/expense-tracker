import Spinner from "./Spinner";

export default function Button({ onClick, label, type, color, loading, disabled }) {
  const baseClass = `inline-block text-sm xl:text-base mr-2 sm:mr-4 lg:mr-6 xl:mr-10 border-2 font-500 leading-tight uppercase rounded-full focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor-pointer
    px-2 lg:px-4 xl:px-6`;
  let colors = {
    "red": `${baseClass} py-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white`,
    "white": `${baseClass} py-2 border-black text-black hover:bg-black hover:text-white`,
    "black": `${baseClass} py-2 sm:py-4 bg-black border-white text-white hover:bg-white hover:text-black hover:border-black`
  };
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={() => onClick && onClick()}
      className={colors[color || "white"]}
    >{loading ? <Spinner /> : label} </button>
  );
}
