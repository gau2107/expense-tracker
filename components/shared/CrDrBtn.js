import ValidationMessage from "./ValidationMesage";

export default function CrDrBtn({ handleClick, selectedItem, className, divClassName, label, isRequired, errorMsg }) {
  return (
    <div className={divClassName || "mb-6"}>
      {label && (
        <label
          className="text-md font-medium text-gray-600 block mb-2"
        >
          {label}
        </label>
      )}
      <div className={`flex items-center ${className}`}>
        <div
          className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
          role="toolbar"
        >
          {selectedItem === "cr" ? (
            <button
              type="button"
              onClick={() => handleClick("cr")}
              className="rounded-l inline-block px-4 py-2.5 bg-black focus:ring-0
              text-white font-medium text-xs leading-tight uppercase focus:outline-none
              transition duration-150 ease-in-out"
            >
              Cr
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleClick("cr")}
              className="rounded-l inline-block px-4 py-2.5 bg-white focus:ring-0
              text-black font-medium text-xs leading-tight uppercase focus:outline-none   
              transition duration-150 ease-in-out"
            >
              Cr {!selectedItem && isRequired && <ValidationMessage message={'*'} />}
            </button>
          )}

          {selectedItem === "dr" ? (
            <button
              type="button"
              onClick={() => handleClick("dr")}
              className="rounded-l inline-block px-4 py-2.5 bg-black focus:ring-0
            text-white font-medium text-xs leading-tight uppercase focus:outline-none
            transition duration-150 ease-in-out"
            >
              Dr
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleClick("dr")}
              className="rounded-l inline-block px-4 py-2.5 bg-white focus:ring-0
            text-black font-medium text-xs leading-tight uppercase focus:outline-none   
            transition duration-150 ease-in-out"
            >
              Dr {!selectedItem && isRequired && <ValidationMessage message={'*'} />}
            </button>
          )}
        </div>
      </div>
      {errorMsg && <ValidationMessage message={errorMsg} />}

    </div>
  );
}
