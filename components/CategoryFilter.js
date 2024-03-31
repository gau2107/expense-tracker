import { useState } from "react";
import Select from "react-tailwindcss-select";
import { useBoundStore } from "store/store";

export default function CategoryFilter({ onChange }) {
  let temp = useBoundStore((state) => state.categories)
  let categories = [];
  temp.forEach((val) => categories.push({ value: val.id, label: val.name }));


  const [selectedCategories, setSelectedCategories] = useState(null);
  const handleChange = value => {
    setSelectedCategories(value);
    onChange(value);
  };

  return (
    <Select
      placeholder="Filter by categories"
      classNames={{
        menuButton: () => ` mx-2 flex text-gray-900 p-0.5 sm:text-sm bg-gray-50 border border-gray-300 rounded-full shadow-sm transition-all duration-300 focus:outline-none`
      }}
      isSearchable={true}
      isMultiple={true}
      value={selectedCategories}
      onChange={handleChange}
      options={categories}
    />
  );
}