export function getRandomColor(value) {
  const r = Math.floor(Math.random() * 156) + value;
  const g = Math.floor(Math.random() * 156) + value;
  const b = Math.floor(Math.random() * 156) + value;
  return `rgb(${r}, ${g}, ${b})`;
}

export function removeHyphen(value = '') {
  console.log(value)
  return value.replace(/-/g, '');
}