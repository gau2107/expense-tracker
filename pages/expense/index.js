import ExpenseTable from "components/ExpenseTable";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import { useRouter } from 'next/router';

export default function Expenses({ serverData }) {
  const router = useRouter();

  const handleDeleteApiCallback = () => router.replace(router.asPath);
  
  return (
    <BaseLayout>
      <Heading heading={"Expense"} />
      <ExpenseTable {...serverData} handleDeleteApiCallback={() => handleDeleteApiCallback()} />
    </BaseLayout>
  );
}

export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense`)
  const data = await res.json();
  return { props: { serverData: data } }
});