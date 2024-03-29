import { useState, useEffect } from "react";
import Button from "components/shared/Button";
import CrDrBtn from "components/shared/CrDrBtn";
import Input from "components/shared/Input";
import TextArea from "components/shared/TextArea";
import { frequencies } from "resources/constants";
import { useForm } from "react-hook-form";
import {
  amountMsg,
  categoryMsg,
  dateMsg,
  frequencyMsg,
  paymentModeMsg,
} from "resources/messages";
import { useBoundStore } from "store/store";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";

const Select = dynamic(() => import("components/shared/Select"), { ssr: false });

export default function AddBudgetForm({ callbackFn, editFormData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [type, setType] = useState("");
  const handleCrDrClick = (value) => setType(value);

  const paymentModeList = useBoundStore((state) => state.paymentModes);
  const categoryList = useBoundStore((state) => state.categories);

  useEffect(() => {
    reset({ ...editFormData });
    setType(editFormData.type);
  }, [editFormData]);

  const onSubmit = (data, ev) => {
    if (!type.length) return false;
    data = { ...data, type: type, user_id: 1 };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/recurring-expense${editFormData?.id ? '/' + editFormData.id : ''}`, {
      method: editFormData?.id ? 'put' : 'post', body: JSON.stringify(data), headers: {
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
        reset({
          amount: null,
          date: null,
          frequency: null,
          category: null,
          description: null,
        });
        callbackFn(response);
      });
    });
   
  };

  return (
    <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <CrDrBtn
          divClassName={"mb-0"}
          handleClick={handleCrDrClick}
          selectedItem={type}
        />
      </div>
      <Input
        divClassName={""}
        placeHolder={"Amount"}
        id={"amount"}
        name={"amount"}
        type={"number"}
        inpRef={{ ...register("amount", { required: true }) }}
        errors={errors}
        errorMsg={amountMsg}
      />
      <Input
        divClassName={""}
        placeHolder={"Date"}
        id={"date"}
        name={"date"}
        type={"date"}
        inpRef={{ ...register("date", { required: true }) }}
        errors={errors}
        errorMsg={dateMsg}
      />
      <Select
        divClassName=""
        placeHolder={"Frequency"}
        id={"frequency"}
        name={"frequency"}
        options={frequencies}
        inpRef={{ ...register("frequency", { required: true }) }}
        errors={errors}
        errorMsg={frequencyMsg}
        valueKey={'value'}
        labelKey={'label'}
      />
      <Select
        divClassName=""
        placeHolder={"Category"}
        id={"category_id"}
        name={"category_id"}
        options={categoryList}
        inpRef={{ ...register("category_id", { required: true }) }}
        errors={errors}
        errorMsg={categoryMsg}
        valueKey={'id'}
        labelKey={'name'}
      />
      <Select
        className="mb-6"
        placeHolder={"Mode of payment"}
        id={"payment_mode_id"}
        name={"payment_mode_id"}
        options={paymentModeList}
        valueKey={'id'}
        labelKey={'name'}
        inpRef={{ ...register("payment_mode_id", { required: true }) }}
        errors={errors}
        errorMsg={paymentModeMsg}
      />

      <TextArea
        divClassName={" "}
        placeHolder={"Note"}
        id={"description"}
        name={"description"}
        rows={3}
        inpRef={{ ...register("description") }}
      />
      <div className="text-right">
        <Button label={"Save"} type={"submit"} />
      </div>

    </form>
  );
}
