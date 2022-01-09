import BudgetPreviewTable from "components/budget/BudgetPreviewTable";
import AddBudgetForm from "components/forms/AddBudget";
import BaseLayout from "components/layouts/BaseLayout";
import Button from "components/shared/Button";
import Heading from "components/shared/Heading";
import { useState } from "react";
import Data from "/resources/data.json";

export default function Add() {
  const [data, setData] = useState([...Data.data]);
  const [editFormData, setEditFormData] = useState({})

  const addData = formData => {
    setData([...data, formData]);
    setEditFormData({});
  }

  const handleDelete = id => {
    let tempData = [...data];
    tempData.splice(id, 1);
    setData(tempData);
  }

  const handleEdit = data => {
    setEditFormData({data});
  }

  return (
    <BaseLayout>
      <div className=" mx-0">
        <Heading heading={`Add Recurring Budget`} />
        <AddBudgetForm callbackFn={addData} editFormData={editFormData}
        />
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <BudgetPreviewTable data={data} handleDelete={handleDelete} handleEdit={handleEdit} />
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
