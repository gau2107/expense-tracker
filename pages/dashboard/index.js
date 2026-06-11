import MonthlyExpenseLineGraph from "components/charts/MonthlyExpenseLineGraph";
import BaseLayout from "components/layouts/BaseLayout";
import StatCard from "components/shared/StatCard";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useState } from "react";

const MIN_YEAR = 2000;

function buildYearOptions(currentYear) {
  return Array.from({ length: currentYear - MIN_YEAR + 1 }, (_, index) => currentYear - index);
}

export default function Dashboard({ serverData, graphs, selectedYear }) {
  const router = useRouter();
  const currentYear = dayjs().year();
  const [year, setYear] = useState(String(selectedYear || currentYear));

  const handleYearChange = (event) => {
    const nextYear = event.target.value;
    setYear(nextYear);
    router.replace({ pathname: "/dashboard", query: { year: nextYear } });
  };

  const yearOptions = buildYearOptions(currentYear);

  return (
    <BaseLayout>
      <div className="flex flex-col gap-4 px-8 pt-20 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>
        <div className="w-full md:w-48">
          <select
            id="dashboard-year"
            value={year}
            onChange={handleYearChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          >
            {yearOptions.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 p-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <StatCard title={"Total credits of"} value={serverData.total_credit_amount} />

        <StatCard
          title={"Total expenses of"}
          value={serverData.total_debit_amount}
          info={`${serverData.total_debit_percent}%`}
          staticText={`of total expenses accounted`}
        />

        <StatCard
          title={"Total liability of"}
          value={serverData.total_liability_amount}
          info={`${serverData.total_liability_percent}%`}
          staticText={`of total liability accounted`}
        />

        <StatCard
          title={"Total investments of"}
          value={serverData.total_invested_amount}
          info={`${serverData.total_invested_percent}%`}
          staticText={`allocated for investments`}
        />
        <StatCard
          title={"Total savings of"}
          value={serverData.total_amount}
          info={`${serverData.total_savings_percent}%`}
          staticText={`set aside as savings`}
        />
      </div>

      <div className="flex h-[600px] w-full flex-wrap">
        <MonthlyExpenseLineGraph data={graphs} />
      </div>
    </BaseLayout>
  );
}

export const getServerSideProps = async (context) => {
  const { query } = context;
  const currentYear = dayjs().year();
  const parsedYear = Number(query.year);
  const normalizedYear =
    Number.isInteger(parsedYear) && parsedYear >= MIN_YEAR && parsedYear <= currentYear
      ? parsedYear
      : currentYear;

  const filters = { year: normalizedYear };
  const queryParams = queryString.stringify(filters);

  const [statisticsRes, graphsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/statistics?${queryParams}`),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/graphs?${queryParams}`),
  ]);

  const [data, graphsData] = await Promise.all([statisticsRes.json(), graphsRes.json()]);

  return { props: { serverData: data, graphs: graphsData, selectedYear: normalizedYear } };
};