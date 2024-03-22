import MonthFilter from "components/MonthFilter";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import dayjs from "dayjs";
import { useState } from "react";

export default function Statistics() {

  const curMonth = dayjs().format('YYYY-MM');
  const [filters, setFilters] = useState({ month: curMonth });

  return(
    <BaseLayout>
      <div className="grid grid-cols-2">
        <Heading heading={"Statistics"} />
        <div className="flex justify-end items-center">
        <MonthFilter onChange={(value) => setFilters({ ...filters, month: value })} value={filters.month} />
        </div>
      </div>
    </BaseLayout>
  )
}