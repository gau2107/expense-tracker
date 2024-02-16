import { useState } from "react";
import Select from "react-tailwindcss-select";
import { useBoundStore } from "store/store";

export default function PaymentModeFilter({ onChange }) {
  let temp = useBoundStore((state) => state.paymentModes)
  let paymentModes = [];
  temp.forEach((val) => paymentModes.push({ value: val.id, label: val.name }));


  const [selectedPaymentModes, setSelectedPaymentModes] = useState(null);
  const handleChange = value => {
    setSelectedPaymentModes(value);
    onChange(value);
  };

  return (
    <Select
      placeholder="Filter by payment modes"
      classNames={{
        menuButton: () => ` mx-2 flex text-gray-900 p-0.5 sm:text-sm bg-gray-50 border border-gray-300 rounded-full shadow-sm transition-all duration-300 focus:outline-none`
      }}
      isMultiple={true}
      value={selectedPaymentModes}
      onChange={handleChange}
      options={paymentModes}
    />
  );
}