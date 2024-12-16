import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import dayjs from 'dayjs';
import { Line } from "react-chartjs-2";
import { getChartOptions } from "utils/Utils";
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export default function MonthlyExpenseLineGraph({ data }) {


  const chartData = {
    labels: data.map((obj) => dayjs(obj.month).format('MMM YYYY')),
    datasets: [{
      label: 'Cumulative Credits',
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      data: data.map((obj) => parseInt(obj.cumulativeAmount)),
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }, {
      label: 'Cumulative Debits',
      borderColor: 'rgba(200, 0, 0, 1)',
      backgroundColor: 'rgba(200, 0, 0, 0.2)',
      data: data.map((obj) => parseInt(obj.cumulativeDebitAmount)),
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }, {
      label: 'Cumulative Debits without liabilities',
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      data: data.map((obj) => parseInt(obj.cumulativeDebitAmountWOLiabilities)),
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }, {
      label: 'Cumulative Liability',
      borderColor: 'rgba(255, 99, 55, 1)',
      backgroundColor: 'rgba(255, 99, 55, 0.2)',
      data: data.map((obj) => parseInt(obj.cumulativeLiabilityAmount)),
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }, {
      label: 'Cumulative Investments',
      borderColor: 'rgba(100, 99, 132, 1)',
      backgroundColor: 'rgba(100, 99, 132, 0.2)',
      data: data.map((obj) => parseInt(obj.cumulativeInvestmentAmount)),
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }, {
      label: 'Cumulative Savings',
      borderColor: 'rgba(0, 255, 132, 1)',
      backgroundColor: 'rgba(0, 255, 132, 0.2)',
      data: data.map((obj) => parseInt(obj.cumulativeSavingsAmount)),
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    }]
  };


  return (
    <Line height={'600px'} width={'800px'} options={getChartOptions('Monthly Credits')} data={chartData} />
  )
}