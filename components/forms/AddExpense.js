import { useState, useEffect } from "react";
import Button from "components/shared/Button";
import CrDrBtn from "components/shared/CrDrBtn";
import Input from "components/shared/Input";
import Select from "components/shared/Select";
import TextArea from "components/shared/TextArea";
import { useForm } from "react-hook-form";
import {
  amountMsg,
  categoryMsg,
  dateMsg,
} from "resources/messages";
export default function AddExpenseForm({ categoryList }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [type, setType] = useState("");
  const handleCrDrClick = (value) => setType(value);

  const onSubmit = (data, ev) => {
    if (!type.length) return false;
    data = { ...data, type: type };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense`, {
      method: 'post', body: data, headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(json => console.log(json));
    setType("");
    ev.target.reset();
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 ">
        <CrDrBtn label={'Type'} handleClick={handleCrDrClick} selectedItem={type} />
      </div>

      <Input
        divClassName={"mb-6 "}
        label={"Amount"}
        id={"amount"}
        name={"amount"}
        type={"number"}
        inpRef={{ ...register("amount", { required: true }) }}
        errors={errors}
        errorMsg={amountMsg}
      />
      <Input
        divClassName={"mb-6"}
        label={"Date"}
        id={"date"}
        name={"date"}
        type={"date"}
        inpRef={{ ...register("date", { required: true }) }}
        errors={errors}
        errorMsg={dateMsg}
      />

      <Select
        className="mb-6"
        label={"Category"}
        id={"category"}
        name={"category"}
        options={categoryList}
        valueKey={'id'}
        labelKey={'name'}
        inpRef={{ ...register("category", { required: true }) }}
        errors={errors}
        errorMsg={categoryMsg}
      />

      <TextArea
        divClassName={"mb-6"}
        label={"Note"}
        id={"note"}
        name={"note"}
        rows={2}
        inpRef={{ ...register("note") }}
      />

      <div className="col-span-1 ">
        <Button label={"Save & Add New"} type={"submit"} />
        <Button label={"Save & View"} type={"submit"} />
      </div>
    </form>
  );
}
