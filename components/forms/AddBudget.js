import Button from "components/shared/Button";
import CrDrBtn from "components/shared/CrDrBtn";
import Input from "components/shared/Input";
import Select from "components/shared/Select";
import TextArea from "components/shared/TextArea";
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
        <div className="col-span-1 ">
          <CrDrBtn />
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

        <Select
          register={register}
          className="col-span-2"
          defaultValue={"Category"}
          id={"category"}
          options={categories}
        />

        <TextArea
          divClassName={"col-span-2 "}
          register={register}
          placeHolder={"Note"}
          id={"note"}
          rows={1}
        />

        <div className="col-span-1 ">
          <Button label={"Add"} type={"button"} />
        </div>
      </div>
    </form>
  );
}
