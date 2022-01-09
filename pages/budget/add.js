import BudgetPreviewTable from "components/budget/BudgetPreviewTable";
import AddBudgetForm from "components/forms/AddBudget";
import BaseLayout from "components/layouts/BaseLayout";
import Button from "components/shared/Button";
import Heading from "components/shared/Heading";
import { useState } from "react";
import Data from "/resources/data.json";

export default function Add() {
  const [data, setData] = useState([...Data.data]);
  const addData = formData => {
    setData([...data, formData]);
  }
  return (
    <BaseLayout>
      <div className=" mx-0">
        <Heading heading={`Add Budget`} />
        <AddBudgetForm callbackFn={addData}
        />
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <BudgetPreviewTable data={data} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 float-right">
          <Button type={"button"} label={"Save"} />
        </div>
      </div>
    </BaseLayout>
  );
}
