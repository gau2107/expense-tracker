import MonthFilter from "components/MonthFilter";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import StatCard from "components/shared/StatCard";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getRandomColor } from "utils/Utils";
import DailyExpenseChart from "components/charts/DailyExpenseChart";
export default function Statistics({ serverData, queryObj }) {

  const router = useRouter();
  const curMonth = dayjs().format('YYYY-MM');
  const [filters, setFilters] = useState({ month: queryObj.month || curMonth });

  const [data, setData] = useState({});
  const [dataByCategories, setDataByCategories] = useState([]);
  const [dailyExpenseData, setDailyExpenseData] = useState([]);
  const [dailyDates, setDailyDates] = useState([]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const chartData = {
    labels: dataByCategories.map(obj => obj.categoryName),
    datasets: [
      {
        data: dataByCategories.map(obj => obj.amount),
        borderWidth: 1,
        backgroundColor: dataByCategories.map(obj => obj.bgColor),
        borderColor: dataByCategories.map(obj => "#36454F"),
      },
    ],
  };

  useEffect(() => {
    setData(serverData);
    if (filters.month !== queryObj.month) {
      router.replace(`/statistics?${queryString.stringify(filters)}`);
      return;
    }
    let { list } = serverData;
    let drList = [...list].filter((obj) => obj.type === 'dr');

    let categoryWiseDataArray = [];
    let dailyExpenseData = [];
    let dates = [];
    drList.forEach((expenseObj) => {
      if (!dates.includes(expenseObj.date)) {
        dates.push(expenseObj.date);
      }
      let amt = parseFloat(expenseObj.amount);
      let bgColor = getRandomColor(120);
      let foundIndex = categoryWiseDataArray.findIndex(obj => obj.categoryId === expenseObj.category.id);
      if (foundIndex >= 0) {
        categoryWiseDataArray[foundIndex].amount += amt;
        let foundDateIndex = dailyExpenseData[foundIndex].data.findIndex(obj => obj.date === expenseObj.date)
        if (foundDateIndex >= 0) {
          dailyExpenseData[foundIndex].data[foundDateIndex].amount += amt;
        }
        else {
          dailyExpenseData[foundIndex].data.push({ date: expenseObj.date, amount: amt })
        }
      }
      else {
        categoryWiseDataArray.push({ categoryName: expenseObj.category.name, categoryId: expenseObj.category.id, amount: amt, bgColor: bgColor });
        dailyExpenseData.push({ categoryName: expenseObj.category.name, data: [{ date: expenseObj.date, amount: amt }] });

      }
    });
    setDailyExpenseData(dailyExpenseData)
    setDailyDates(dates);
    setDataByCategories([...categoryWiseDataArray]);

  }, [filters, serverData]);

  const checkIsPositive = (value) => value > 0;
  const options = {
    cutout: 60,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {

      legend: {
        position: 'bottom', animation: true, title: {
          display: true,
          padding: 12,
          text: 'Expense by category',
          color: 'black'
        },
      }
    }
  }
  return (
    <BaseLayout>
      <div className="grid grid-cols-2">
        <Heading heading={"Statistics"} />
        <div className="flex justify-end items-center">
          <MonthFilter onChange={(value) => setFilters({ ...filters, month: value })} value={filters.month} />
        </div>
      </div>
      <div className="grid gap-4 lg:gap-8 md:grid-cols-4 p-8 pt-20">
        <StatCard title={"Credit"} value={data.total_credit_amount} info={`${data.total_credit_amount_diff}`}
          isGood={checkIsPositive(data.total_credit_amount_diff)} staticText={`this month`} />
        <StatCard title={"Expenses"} value={data.total_debit_amount} info={`${data.total_debit_amount_diff}`}
          isGood={checkIsPositive(data.total_debit_amount_diff)} reverse={true} staticText={`this month`} />
        <StatCard title={"Investments"} value={data.total_invested_amount} info={`${data.total_invested_amount_diff}`}
          staticText={`this month`} isGood={checkIsPositive(data.total_invested_amount_diff)} />
        <StatCard title={"Savings"} value={data.total_amount} info={`${data.total_amount_diff}`}
          staticText={`this month`} isGood={checkIsPositive(data.total_amount_diff)} />
      </div>
      <div className="flex">
        <div style={{ height: '400px', width: '40%' }} >
          <Doughnut data={chartData} options={options} />
        </div>
        <div style={{ height: '400px', width: '60%' }} >
          <DailyExpenseChart data={dailyExpenseData} dates={dailyDates} />
        </div>
      </div>
    </BaseLayout>
  )
}
export const getServerSideProps = (async (context) => {
  const { query } = context;
  const curMonth = dayjs().format('YYYY-MM');
  let filters = { month: query.month || curMonth }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/monthly-statistics?${queryString.stringify(filters)}`)
  const data = await res.json();
  return { props: { serverData: data, queryObj: filters } }
});