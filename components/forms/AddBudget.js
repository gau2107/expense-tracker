import { useState, useEffect } from "react";
import Button from "components/shared/Button";
import CrDrBtn from "components/shared/CrDrBtn";
import Input from "components/shared/Input";
import Select from "components/shared/Select";
import TextArea from "components/shared/TextArea";
import { categories, frequencies } from "resources/constants";
import { useForm } from "react-hook-form";
import {
  amountMsg,
  categoryMsg,
  dateMsg,
  frequencyMsg,
} from "resources/messages";
export default function AddBudgetForm({ callbackFn, editFormData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [type, setType] = useState("");
  const handleCrDrClick = (value) => setType(value);

  useEffect(() => {
    reset({ ...editFormData });
    setType(editFormData.type);
  }, [editFormData]);

  const onSubmit = (data, ev) => {
    if (!type || !type.length) return false;
    data = { ...data, type: type, id: editFormData?.id };
    callbackFn(data);
    setType("");
    reset({
      amount: null,
      date: null,
      frequency: null,
      category: null,
      note: null,
    });
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-1 ">
          <CrDrBtn
            className={"justify-center"}
            handleClick={handleCrDrClick}
            selectedItem={type}
          />
        </div>

        <Input
          divClassName={"col-span-2 "}
          placeHolder={"Amount"}
          id={"amount"}
          name={"amount"}
          type={"number"}
          inpRef={{ ...register("amount", { required: true }) }}
          errors={errors}
          errorMsg={amountMsg}
        />
        <Input
          divClassName={"col-span-2 "}
          placeHolder={"Date"}
          id={"date"}
          name={"date"}
          type={"date"}
          inpRef={{ ...register("date", { required: true }) }}
          errors={errors}
          errorMsg={dateMsg}
        />

        <Select
          className="col-span-2"
          placeHolder={"Frequency"}
          id={"frequency"}
          name={"frequency"}
          options={frequencies}
          inpRef={{ ...register("frequency", { required: true }) }}
          errors={errors}
          errorMsg={frequencyMsg}
        />

        <Select
          className="col-span-2"
          placeHolder={"Category"}
          id={"category"}
          name={"category"}
          options={categories}
          inpRef={{ ...register("category", { required: true }) }}
          errors={errors}
          errorMsg={categoryMsg}
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
