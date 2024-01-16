import AddExpenseForm from "components/forms/AddExpense";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import { useRouter } from 'next/router';

export default function Add({ categoryList, editData }) {
  return (
    <BaseLayout>
      <div className="max-w-lg mx-auto">
        <Heading heading={`Add Expense`} />
        <AddExpenseForm categoryList={categoryList} editData={editData} />
      </div>
    </BaseLayout>
  );
}
export const getServerSideProps = (async (context) => {
  const { id } = context.query;
  let editData = null;
  if (id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense/${id}`)
    editData = await res.json();

  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/categories`)
  const data = await res.json();
  return { props: { categoryList: data, editData: editData } }
})
