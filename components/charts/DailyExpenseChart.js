import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getRandomColor } from 'utils/Utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Daily expense',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};


export default function DailyExpenseChart({ data, dates }) {

  const labels = dates;

  let datasets = [];

  data.forEach((obj) => {
    datasets.push({
      label: obj.categoryName,
      data: generateSets(obj.data),
      backgroundColor: getRandomColor(80),
    })
  });

  function generateSets(catData) {
    let returnVal = [];
    for (let i = 0; i < dates.length; i++) {
      let found = catData.find((val) => val.date === dates[i]);
      returnVal.push(found?.amount || 0)
    }
    return returnVal;

  }
  const chartData = {
    labels,
    datasets: datasets,
  };
  return (
    <Bar height={'600px'} width={'800px'} options={options} data={chartData} />
  )
}
