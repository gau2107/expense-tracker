import Button from "components/shared/Button";
import CrDrBtn from "components/shared/CrDrBtn";
import Input from "components/shared/Input";
import Select from "components/shared/Select";
import TextArea from "components/shared/TextArea";
import { categories } from "resources/constants";
import { useForm } from "react-hook-form";
export default function AddBudgetForm({}) {

  const { register, handleSubmit,formState: {errors} } = useForm();
  //FIXME parse float amount 
  const onSubmit = (data) => console.log(data);

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-1 ">
          <CrDrBtn />
        </div>

        <Input
          divClassName={"col-span-2 "}
          placeHolder={"Amount"}
          id={"amount"}
          name={'amount'}
          type={"number"}
          inpRef={{...register("amount", { required: true })}}
          errors={errors}
        />
        <Input
          divClassName={"col-span-2 "}
          placeHolder={"Date"}
          id={"date"}
          name={'date'}
          type={"date"}
          inpRef={{...register("date", { required: true })}}
        />

        <Select
          className="col-span-2"
          defaultValue={"Category"}
          id={"category"}
          name={'category'}
          options={categories}
          inpRef={{...register("category", { required: true })}}
        />

        <TextArea
          divClassName={"col-span-2 "}
          placeHolder={"Note"}
          id={"note"}
          name={'note'}
          rows={1}
          inpRef={{...register("note")}}
        />

        <div className="col-span-1 ">
          <Button label={"Add"} type={"submit"} />
        </div>
      </div>
    </form>
  );
}
