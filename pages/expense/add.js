import AddExpenseForm from "components/forms/AddExpense";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";

export default function Add({ editData }) {

  return (
    <BaseLayout>
      <div className="max-w-lg xl:mx-auto m-4">
        <Heading heading={`Add Expense`} />
        <AddExpenseForm editData={editData} />
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
  return { props: { editData: editData } }
})
