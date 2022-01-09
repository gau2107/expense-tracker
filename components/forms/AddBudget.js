import { useState } from "react";
import Button from "components/shared/Button";
import CrDrBtn from "components/shared/CrDrBtn";
import Input from "components/shared/Input";
import Select from "components/shared/Select";
import TextArea from "components/shared/TextArea";
import { categories, frequencies } from "resources/constants";
import { useForm } from "react-hook-form";
import { amount, category, date, frequency } from "resources/messages";
export default function AddBudgetForm({callbackFn, editFormData}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //FIXME parse float amount

  const [type, setType] = useState("");
  const handleCrDrClick = (value) => setType(value);

  const onSubmit = (data, ev) => {
    if (!type.length) return false;
    data = { ...data, type: type };
    callbackFn(data);
    setType('');
    ev.target.reset();
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-1 ">
          <CrDrBtn handleClick={handleCrDrClick} selectedItem={type} />
        </div>

        <Input
          divClassName={"col-span-2 "}
          placeHolder={"Amount"}
          id={"amount"}
          name={"amount"}
          type={"number"}
          inpRef={{ ...register("amount", { required: true }) }}
          errors={errors}
          errorMsg={amount}
        />
        <Input
          divClassName={"col-span-2 "}
          placeHolder={"Date"}
          id={"date"}
          name={"date"}
          type={"date"}
          inpRef={{ ...register("date", { required: true }) }}
          errors={errors}
          errorMsg={date}
        />

        <Select
          className="col-span-2"
          defaultValue={"Frequency"}
          id={"frequency"}
          name={"frequency"}
          options={frequencies}
          inpRef={{ ...register("frequency", { required: true }) }}
          errors={errors}
          errorMsg={frequency}
        />

        <Select
          className="col-span-2"
          defaultValue={"Category"}
          id={"category"}
          name={"category"}
          options={categories}
          inpRef={{ ...register("category", { required: true }) }}
          errors={errors}
          errorMsg={category}
        />

        <TextArea
          divClassName={"col-span-2 "}
          placeHolder={"Note"}
          id={"note"}
          name={"note"}
          rows={1}
          inpRef={{ ...register("note") }}
        />

        <div className="col-span-1 ">
          <Button label={"Add"} type={"submit"} />
        </div>
      </div>
    </form>
  );
}
