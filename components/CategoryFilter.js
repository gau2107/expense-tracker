import { useState } from "react";
import Select from "react-tailwindcss-select";
import useCategoryStore from "store/store";

export default function CategoryFilter({ onChange, value }) {
  let temp = useCategoryStore((state) => state.categories)
  let categories = [];
  temp.forEach((val) => categories.push({ value: val.id, label: val.name }));


  const [selectedCategories, setSelectedCategories] = useState(null);
  const handleChange = value => {
    setSelectedCategories(value);
    onChange(value);
  };

  return (
    <Select
      classNames={{
        menuButton: () => ` mx-2 flex text-gray-900 p-0.5 sm:text-sm bg-gray-50 border border-gray-300 rounded-full shadow-sm transition-all duration-300 focus:outline-none`
      }}
      isMultiple={true}
      value={selectedCategories}
      onChange={handleChange}
      options={categories}
    />
  );
}