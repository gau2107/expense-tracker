import MonthFilter from "components/MonthFilter";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import StatCard from "components/shared/StatCard";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useState } from "react";

export default function Statistics({ serverData, queryObj }) {

  const router = useRouter();
  const curMonth = dayjs().format('YYYY-MM');
  const [filters, setFilters] = useState({ month: queryObj.month || curMonth });

  const [data, setData] = useState({});
  useEffect(() => {
    setData(serverData)
    if (filters.month !== queryObj.month)
      router.replace(`/statistics?${queryString.stringify(filters)}`);
  }, [filters, serverData]);

  const checkIsPositive = (value) => value > 0;

  return (
    <BaseLayout>
      <div className="grid grid-cols-2">
        <Heading heading={"Statistics"} />
        <div className="flex justify-end items-center">
          <MonthFilter onChange={(value) => setFilters({ ...filters, month: value })} value={filters.month} />
        </div>
      </div>
      <div className="grid gap-4 lg:gap-8 md:grid-cols-4 p-8 pt-20">
        <StatCard title={"Credit"} value={data.total_credit_amount} info={`${data.total_credit_amount_diff}`} isGood={checkIsPositive(data.total_credit_amount_diff)}/>
        <StatCard title={"Expenses"} value={data.total_debit_amount} info={`${data.total_debit_amount_diff}`} isGood={checkIsPositive(data.total_debit_amount_diff)} reverse={true}/>
        <StatCard title={"Investments"} value={data.total_invested_amount} info={`${data.total_invested_amount_diff}`} isGood={checkIsPositive(data.total_invested_amount_diff)}/>
        <StatCard title={"Savings"} value={data.total_amount} info={`${data.total_amount_diff}`} isGood={checkIsPositive(data.total_amount_diff)}/>
      </div>
    </BaseLayout>
  )
}
export const getServerSideProps = (async (context) => {
  const { query } = context;
  const curMonth = dayjs().format('YYYY-MM');
  let filters = { month: query.month || curMonth }
  console.log(queryString.stringify(filters));
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/statistics?${queryString.stringify(filters)}`)
  const data = await res.json();
  return { props: { serverData: data, queryObj: filters } }
});