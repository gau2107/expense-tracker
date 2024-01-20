import ExpenseTable from "components/ExpenseTable";
import SearchBar from "components/forms/SearchBar";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import { useRouter } from 'next/router';
import { isEmpty } from "radash";
import queryString from 'query-string';
import { useEffect, useState } from "react";

export default function Expenses({ serverData }) {
  const router = useRouter();
  const [filters, setFilters] = useState({});
  const [data, setData] = useState(serverData);

  useEffect(() => {
    if (isEmpty(filters)) return;
    getData();
  }, [filters]);

  const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense?${queryString.stringify(filters)}`)
    const data = await res.json();
    setData({ ...data });
  }

  const handleDeleteApiCallback = () => router.replace(router.asPath);

  return (
    <BaseLayout>
      <Heading heading={"Expense"} />
      <SearchBar onChange={(value) => setFilters({ ...filters, query: value })} value={filters.query} />
      <ExpenseTable {...data} handleDeleteApiCallback={() => handleDeleteApiCallback()} />
    </BaseLayout>
  );
}

export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense`)
  const data = await res.json();
  return { props: { serverData: data } }
});