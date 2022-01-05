import Input from "components/shared/Input";
import ToggleSwitch from "components/shared/ToggleSwitch";
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
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-4 justify-evenly">
        <Input
          register={register}
          label={"Amount"}
          id={"amount"}
          type={"number"}
        />
        <Input register={register} label={"Date"} id={"date"} type={"date"} />
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
      </div>
    </form>
  );
}
