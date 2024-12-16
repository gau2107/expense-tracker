export function getRandomColor(value) {
  const r = Math.floor(Math.random() * 156) + value;
  const g = Math.floor(Math.random() * 156) + value;
  const b = Math.floor(Math.random() * 156) + value;
  return `rgb(${r}, ${g}, ${b})`;
}

export function removeHyphen(value = '') {
  return value.replace(/-/g, '');
}

export function getChartOptions(title = '') {
  return {
    responsive: true,
    maintainAspectRatio: false,
    title: title,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          // text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          // text: 'Amount',
        },
        beginAtZero: true,
      },
    },
  };
}