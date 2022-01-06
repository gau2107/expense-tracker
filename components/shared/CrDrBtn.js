export default function CrDrBtn() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
        role="toolbar"
      >
        <button
          type="button"
          className="rounded-l inline-block px-4 py-2.5 bg-white focus:ring-0
                text-black font-medium text-xs leading-tight uppercase focus:outline-none
                hover:bg-black hover:text-white focus:bg-black focus:text-white  
                active:bg-black active:text-white transition duration-150 ease-in-out"
        >
          Cr
        </button>
        <button
          type="button"
          className="rounded-l inline-block px-4 py-2.5 bg-white focus:ring-0
                text-black font-medium text-xs leading-tight uppercase focus:outline-none
                hover:bg-black hover:text-white focus:bg-black focus:text-white  
                active:bg-black active:text-white transition duration-150 ease-in-out"
        >
          Db
        </button>
      </div>
    </div>
  );
}
