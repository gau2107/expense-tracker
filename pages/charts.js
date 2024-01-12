import { Doughnut, Line, Pie } from "react-chartjs-2";
export default function Charts() {
  const random = () => Math.round(Math.random() * 255);
  const crDrDoughnut = {
    labels: ["Credit", "Debit"],
    datasets: [
      {
        label: "My First Dataset",
        data: [33, 77],
        backgroundColor: [
          `rgb(${random()}, ${random()}, ${random()})`,
          `rgb(${random()}, ${random()}, ${random()})`,
          `rgb(${random()}, ${random()}, ${random()})`,
        ],
        hoverOffset: 4,
      },
    ],
  };
  const categoryDebitDoughnut = {
    labels: ["Shopping", "Travel", "Beauty", "Food", "Transport"],
    datasets: [
      {
        label: "My First Dataset",
        data: [10, 40, 5, 25, 20],
        backgroundColor: [
          `rgb(${random()}, ${random()}, ${random()})`,
          `rgb(${random()}, ${random()}, ${random()})`,
          `rgb(${random()}, ${random()}, ${random()})`,
          `rgb(${random()}, ${random()}, ${random()})`,
          `rgb(${random()}, ${random()}, ${random()})`,
        ],
        hoverOffset: 4,
      },
    ],
  };

  // const labels = Utils.days({ count: 30 });
  const debitLine = {
    labels: [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
      "22", "23", "24", "25", "26", "27", "28", "29", "30"
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          0, 100, 1000, 1100, 2000, 2000, 2000, 2000, 2000, 2000, 10000, 15000,
          15100, 15200, 15200, 15800, 17000, 21000,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return (
    <>
      <Doughnut data={crDrDoughnut} />

      <Doughnut data={categoryDebitDoughnut} />
      <Line data={debitLine} />
    </>
  );
}
