import { useState, useEffect } from "react";
import Button from "components/shared/Button";
import CrDrBtn from "components/shared/CrDrBtn";
import Input from "components/shared/Input";
import TextArea from "components/shared/TextArea";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import {
  amountMsg,
  categoryMsg,
  dateMsg,
  paymentModeMsg,
  typeMsg,
} from "resources/messages";
import { useBoundStore } from "store/store";
import SearchSelect from "components/shared/SearchSelect";

const Select = dynamic(() => import("components/shared/Select"), { ssr: false });

export default function AddExpenseForm({ editData }) {
  const categoryList = useBoundStore((state) => state.categories);
  const paymentModeList = useBoundStore((state) => state.paymentModes);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue
  } = useForm();

  const router = useRouter();
  const [type, setType] = useState("");
  const [typeError, setTypeError] = useState("");
  const [isRedirect, setIsRedirect] = useState(0);
  const [loading, setLoading] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);

  useEffect(() => {
    if (editData && editData.type) {
      setType(editData.type);
      reset({ ...editData });
    }
  }, [editData])

  useEffect(() => {
    if (isRedirect) handleSubmit(onSubmit)();
  }, [isRedirect]);


  const handleCrDrClick = (value) => setType(value);

  const onSubmit = (data, ev) => {
    if (!type.length) {
      setTypeError(typeMsg)
      return false;
    }
    setTypeError("")
    if (!isRedirect)
      setLoading(true);
    else setRedirectLoading(true);
    data = { ...data, type: type, user_id: 1 };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense${editData?.id ? '/' + editData.id : ''}`, {
      method: editData?.id ? 'put' : 'post', body: JSON.stringify(data), headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      if (ev) ev.target.reset();
      setType("");
      setLoading(false);
      setRedirectLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        toast: true,
        title: "Expense saved successfully",
        showConfirmButton: false,
        heightAuto: false,
        timer: 1500
      }).then((result) => {
        if (isRedirect) router.push('/expense');
      });
    });

  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 ">
        <CrDrBtn label={'Type'} handleClick={handleCrDrClick} selectedItem={type} errorMsg={typeError} />
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
      <SearchSelect
        control={control}
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
        setValue={setValue}
      />

      <Select
        className="mb-6"
        label={"Mode of payment"}
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
        divClassName={"mb-6"}
        label={"Note"}
        id={"description"}
        name={"description"}
        rows={2}
        inpRef={{ ...register("description") }}
      />

      <div className="col-span-1 ">
        {!editData ?
          <>
            <Button label={"Save & Add New"} type={"submit"} loading={loading} />
            <Button label={"Save & View"} type={"button"} loading={redirectLoading} onClick={() => { setIsRedirect(isRedirect + 1) }} />
          </> :
          <>
            <Button label={"Cancel"} type={"button"} color={"red"} onClick={() => router.push('/expense')} />
            <Button label={"Update"} type={"button"} loading={redirectLoading} onClick={() => setIsRedirect(isRedirect + 1)} />
          </>
        }

      </div>
    </form>
  );
}
