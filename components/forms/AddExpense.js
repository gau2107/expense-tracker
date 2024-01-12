import { useState, useEffect } from "react";
import Button from "components/shared/Button";
import CrDrBtn from "components/shared/CrDrBtn";
import Input from "components/shared/Input";
import Select from "components/shared/Select";
import TextArea from "components/shared/TextArea";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import Swal from "sweetalert2";

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

  const router = useRouter();
  const [type, setType] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    if (isRedirect) handleSubmit(onSubmit)();
  }, [isRedirect]);


  const handleCrDrClick = (value) => setType(value);

  const onSubmit = (data, ev) => {
    if (!type.length) return false;
    data = { ...data, type: type, user_id: 1 };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense`, {
      method: 'post', body: JSON.stringify(data), headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      if (ev) ev.target.reset();
      setType("");
      Swal.fire({
        position: "top-end",
        icon: "success",
        toast: true,
        title: "Expense saved successfully",
        showConfirmButton: false,
        heightAuto: false,
        timer: 1500
      }).then((result) => {
        if (isRedirect) router.push('/expense')
      });
    });

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
        id={"category_id"}
        name={"category_id"}
        options={categoryList}
        valueKey={'id'}
        labelKey={'name'}
        inpRef={{ ...register("category_id", { required: true }) }}
        errors={errors}
        errorMsg={categoryMsg}
      />

      <TextArea
        divClassName={"mb-6"}
        label={"Note"}
        id={"description"}
        name={"description"}
        rows={2}
        inpRef={{ ...register("description") }}
      />

      <div className="col-span-1 ">
        <Button label={"Save & Add New"} type={"submit"} />
        <Button label={"Save & View"} type={"button"} onClick={() => setIsRedirect(true)} />
      </div>
    </form>
  );
}
