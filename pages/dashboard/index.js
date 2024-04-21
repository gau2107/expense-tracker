import BaseLayout from "components/layouts/BaseLayout";
import StatCard from "components/shared/StatCard";

export default function Dashboard({ serverData }) {
  return (
    <BaseLayout>
      <div className="grid gap-4 lg:gap-8 md:grid-cols-4 p-8 pt-20">
        <StatCard title={"Total credit amount"} value={serverData.total_credit_amount} />
        <StatCard title={"Total expense amount"} value={serverData.total_debit_amount} />
        <StatCard title={"Total investment amount"} value={serverData.total_invested_amount} />
        <StatCard title={"Total saving amount"} value={serverData.total_amount} />
      </div>
    </BaseLayout>
  )

}

export const getServerSideProps = (async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/statistics`)
  const data = await res.json();
  return { props: { serverData: data } }
});