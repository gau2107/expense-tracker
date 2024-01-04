import AddExpenseForm from "components/forms/AddExpense";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";

export default function Add({categoryList}) {
  return (
    <BaseLayout>
      <div className="max-w-lg mx-auto">
        <Heading heading={`Add Expense`} />
        <AddExpenseForm categoryList={categoryList} />
      </div>
    </BaseLayout>
  );
}
export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/categories`)
  const data = await res.json();
  return { props: { categoryList: data } }
})
