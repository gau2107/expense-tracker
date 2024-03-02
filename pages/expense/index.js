import ExpenseTable from "components/ExpenseTable";
import SearchBar from "components/common/SearchBar";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import { useRouter } from 'next/router';
import { isEmpty } from "radash";
import queryString from 'query-string';
import { useEffect, useState } from "react";
import MonthFilter from "components/MonthFilter";
import dayjs from "dayjs";
import CategoryFilter from "components/CategoryFilter";
import CrDrBtn from "components/shared/CrDrBtn";
import PaymentModeFilter from "components/PaymentModeFilter";
import Button from "components/shared/Button";
import Link from "next/link";

export default function Expenses({ serverData }) {

  const curMonth = dayjs().format('YYYY-MM');
  const router = useRouter();
  const [filters, setFilters] = useState({ month: curMonth });
  const [data, setData] = useState(serverData);

  useEffect(() => {
    if (isEmpty(filters)) return;
    getData();
  }, [filters]);

  const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense?${queryString.stringify(filters, { arrayFormat: 'bracket' })}`)
    const data = await res.json();
    setData({ ...data });
  }

  const handleDeleteApiCallback = () => router.replace(router.asPath);

  return (
    <BaseLayout>
      <div className="grid grid-cols-2">
        <Heading heading={"Expense"} />
        <div className="flex justify-end items-center">
          <Link href={"/expense/add"}>
            <Button label={"Add Expense"} color="black" />
          </Link>
        </div>
      </div>
      <div className="hidden lg:flex lg:items-baseline">
        <CrDrBtn handleClick={(val) => setFilters({ ...filters, type: val })} selectedItem={filters.type} />
        <SearchBar onChange={(value) => setFilters({ ...filters, query: value })} value={filters.query} />
        <MonthFilter onChange={(value) => setFilters({ ...filters, month: value })} value={filters.month} />
        <CategoryFilter onChange={(value) => setFilters({ ...filters, 'category_id': value?.map(v => v.value) })} />
        <PaymentModeFilter onChange={(value) => setFilters({ ...filters, 'payment_mode_id': value?.map(v => v.value) })} />
      </div>

      <ExpenseTable {...data} handleDeleteApiCallback={() => handleDeleteApiCallback()} />
    </BaseLayout>
  );
}

export const getServerSideProps = (async () => {
  const curMonth = dayjs().format('YYYY-MM');
  let filters = { month: curMonth }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense?${queryString.stringify(filters)}}`)
  const data = await res.json();
  return { props: { serverData: data } }
});