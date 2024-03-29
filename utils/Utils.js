export function getRandomColor(value) {
  const r = Math.floor(Math.random() * 156) + value;
  const g = Math.floor(Math.random() * 156) + value;
  const b = Math.floor(Math.random() * 156) + value;
  return `rgb(${r}, ${g}, ${b})`;
}