import Button from "components/shared/Button";
import Input from "components/shared/Input";
import AddSvg from "components/shared/svg/Add";
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
      <div className="grid grid-cols-10 gap-2">

        <div className="col-span-1 m-auto">
          <div className="flex items-center justify-center">
            <div
              className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
              role="toolbar"
            >
              <button
                type="button"
                className="rounded-l inline-block px-2 py-2.5 bg-white focus:ring-0
                text-black font-medium text-xs leading-tight uppercase focus:outline-none
                hover:bg-black hover:text-white focus:bg-black focus:text-white  
                active:bg-black active:text-white transition duration-150 ease-in-out"
              >
                Cr
              </button>
              <button
                type="button"
                className="rounded-l inline-block px-2 py-2.5 bg-white focus:ring-0
                text-black font-medium text-xs leading-tight uppercase focus:outline-none
                hover:bg-black hover:text-white focus:bg-black focus:text-white  
                active:bg-black active:text-white transition duration-150 ease-in-out"
              >
                Db
              </button>
            </div>
          </div>
        </div>

        <Input
          divClassName={"col-span-2 "}
          register={register}
          placeHolder={"Amount"}
          id={"amount"}
          type={"number"}
        />
        <Input
          divClassName={"col-span-2 "}
          register={register}
          placeHolder={"Date"}
          id={"date"}
          type={"date"}
        />

        <div className="col-span-2">
          <select
            name="category"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("category", { required: true })}
          >
            <option value="">Category</option>
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

        <div className="col-span-2">
          <textarea rows={1}
            id="note" placeholder="Note"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="col-span-1 m-auto">
          <Button label={"Add"} type={"button"} />
        </div>
      </div>
    </form>
  );
}
