import Constants from "/resources/constants.js";
export default function AddExpenseForm() {
  const categories = Constants.categories;
  return (
    <div className="max-w-lg mx-auto">
      <form>
        <div className="mb-6">
          <label
            forHtml="date"
            className="text-md font-medium text-gray-600 block mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required="true"
          />
        </div>

        <div className="mb-6">
          <label
            forHtml="cr_dr"
            className="text-md font-medium text-gray-600 block mb-2"
          >
            Credit / Debit
          </label>
          <div>
            <input
              id="country-option-1"
              type="radio"
              name="cr_dr"
              value="USA"
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby="country-option-1"
              aria-describedby="country-option-1"
              checked=""
            />
            <label
              forHtml="credit"
              className="text-md font-medium text-gray-600 m-4"
            >
              Credit
            </label>
            <input
              id="country-option-1"
              type="radio"
              name="countries"
              value="USA"
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby="country-option-1"
              aria-describedby="country-option-1"
              checked=""
            />
            <label
              forHtml="Debit"
              className="text-md font-medium text-gray-600 m-4"
            >
              Debit
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label
            forHtml="category"
            className="text-md font-medium text-gray-600 block mb-2"
          >
            Category
          </label>
          <select
            name="cars"
            id="cars"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required="true"
          >
            <option value="">Select any one</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            forHtml="date"
            className="text-md font-medium text-gray-600 block mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required="true"
          />
        </div>

        <div className="mb-6">
          <label
            forHtml="priority"
            className="text-md font-medium text-gray-600 block mb-2"
          >
            Priority
          </label>
          <input
            type="range"
            id="priority"
            list="priority"
            min={1}
            max={5}
            step={1}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required="false"
          ></input>
          <datalist id="priority">
            <option value="1" label="Lowest"></option>
            <option value="2" label="Low"></option>
            <option value="3" label="Medium"></option>
            <option value="4" label="High"></option>
            <option value="5" label="Highest"></option>
          </datalist>
        </div>

        <div className="mb-6">
          <label
            forHtml="note"
            className="text-md font-medium text-gray-600 block mb-2"
          >
            Note
          </label>
          <textarea
            id="note"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required="false"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
