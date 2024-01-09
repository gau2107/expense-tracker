import ExpenseTable from "components/ExpenseTable";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";

export default function Expenses({ serverData }) {
  return (
    <BaseLayout>
      <Heading heading={"Expense"} />
      <ExpenseTable {...serverData} />
    </BaseLayout>
  );
}

export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense`)
  const data = await res.json();
  return { props: { serverData: data } }
});