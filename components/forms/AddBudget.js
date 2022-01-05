import Input from "components/shared/Input";
import { useForm } from "react-hook-form";
import { categories } from "resources/constants";
export default function AddBudgetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input register={register} label={'Salary'} id={'salary'} type={'number'}/>
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
          {...register("date", { required: true })}
        />
        {errors.date && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="mb-6">
        <label
          forHtml="category"
          className="text-md font-medium text-gray-600 block mb-2"
        >
          Category
        </label>
        <select
          name="category"
          id="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register("category", { required: true })}
        >
          <option value="">Select any one</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="mb-6">
        <label
          forHtml="amount"
          className="text-md font-medium text-gray-600 block mb-2"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register("amount", { required: true })}
        />
        {errors.amount && (
          <span className="text-red-500">This field is required</span>
        )}
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
        />
      </div>
      <input
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      />
    </form>
  );
}
