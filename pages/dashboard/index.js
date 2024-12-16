import MonthlyExpenseLineGraph from "components/charts/MonthlyExpenseLineGraph";
import BaseLayout from "components/layouts/BaseLayout";
import StatCard from "components/shared/StatCard";

export default function Dashboard({ serverData, graphs }) {
  return (
    <BaseLayout>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-4 lg:gap-8 md:grid-cols-2 p-8 pt-20">
        <StatCard title={"Total credits of"} value={serverData.total_credit_amount} />

        <StatCard title={"Total expenses of"} value={serverData.total_debit_amount}
          info={`${serverData.total_debit_percent}%`} staticText={`of total expenses accounted`} />

        <StatCard title={"Total liability of"} value={serverData.total_liability_amount}
          info={`${serverData.total_liability_percent}%`} staticText={`of total liability accounted`} />

        <StatCard title={"Total investments of"} value={serverData.total_invested_amount}
          info={`${serverData.total_invested_percent}%`} staticText={`allocated for investments`} />
        <StatCard title={"Total savings of"} value={serverData.total_amount}
          info={`${serverData.total_savings_percent}%`} staticText={`set aside as savings`} />

      </div>

      <div className="flex flex-wrap w-full h-[600px]">
        <MonthlyExpenseLineGraph data={graphs} />
      </div>
    </BaseLayout>
  )

}

export const getServerSideProps = (async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/statistics`);
  const data = await res.json();
  const graphs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/graphs`);
  const graphsData = await graphs.json();
  return { props: { serverData: data, graphs: graphsData } }
});