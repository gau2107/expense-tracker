import BudgetPreviewTable from "components/budget/BudgetPreviewTable";
import AddBudgetForm from "components/forms/AddBudget";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import { useState } from "react";
import { useRouter } from 'next/router';

export default function Add({list}) {
  const router = useRouter();

  const [editFormData, setEditFormData] = useState({});

  const reloadPage = async (formData) => {
    await router.replace(router.asPath);
  };

  const handleEdit = (data) => setEditFormData({ ...data });

  return (
    <BaseLayout>
      <div className=" mx-0">
        <Heading heading={`Add Recurring Budget`} />
        <div className="grid gap-4 xl:grid-cols-4 m-4 ">
          <AddBudgetForm callbackFn={reloadPage} editFormData={editFormData} />
          <div className="xl:col-span-3 xl:row-span-6 overflow-x-auto">
            <div className=" sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <BudgetPreviewTable
                    data={list}
                    callbackFn={reloadPage}
                    handleEdit={handleEdit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/recurring-expense`)
  const list = await res.json();
  return { props: {list} }
});