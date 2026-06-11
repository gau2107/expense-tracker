import ExpenseTable from "components/ExpenseTable";
import SearchBar from "components/common/SearchBar";
import BaseLayout from "components/layouts/BaseLayout";
import Heading from "components/shared/Heading";
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useEffect, useState } from "react";
import MonthFilter from "components/MonthFilter";
import dayjs from "dayjs";
import CategoryFilter from "components/CategoryFilter";
import CrDrBtn from "components/shared/CrDrBtn";
import PaymentModeFilter from "components/PaymentModeFilter";
import Button from "components/shared/Button";
import Link from "next/link";
import { isEqual } from "radash";
import useDebounce from "customHooks/useDebounce";

export default function Expenses({ serverData, queryObj }) {

  const curMonth = dayjs().format('YYYY-MM');
  const router = useRouter();
  const [filters, setFilters] = useState({ month: curMonth });
  const [searchValue, setSearchValue] = useState(filters.query || '');

  const debounce = useDebounce();

  useEffect(() => {
    if (!isEqual(filters, queryObj)) {
      router.replace(`/expense?${queryString.stringify(filters, { arrayFormat: 'bracket' })}`);
    }

  }, [filters]);

  const handleDeleteApiCallback = () => router.replace(router.asPath);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    const debouncedSearch = debounce((searchTerm) => {
      setFilters(prev => ({ ...prev, query: searchTerm }));
    }, 500);
    debouncedSearch(value);
  };

  const handleCategoryChange  = (arr) => {
    const debouncedCat = debounce((arr) => {
      setFilters(prev => ({ ...prev, category_id: arr?.map(v => v.value) }));
    }, 1000);
    debouncedCat(arr);
  }

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
        <SearchBar onChange={handleSearchChange} value={searchValue} />
        <MonthFilter onChange={(value) => setFilters({ ...filters, month: value })} value={filters.month} />
        <CategoryFilter onChange={handleCategoryChange}/>
        <PaymentModeFilter onChange={(value) => setFilters({ ...filters, 'payment_mode_id': value?.map(v => v.value) })} />
      </div>

      <ExpenseTable {...serverData} handleDeleteApiCallback={() => handleDeleteApiCallback()} />
    </BaseLayout>
  );
}

export const getServerSideProps = (async (context) => {
  const { query } = context;
  const curMonth = dayjs().format('YYYY-MM');
  let filters = { ...query, month: query.month || curMonth }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense?${queryString.stringify(filters, { arrayFormat: 'bracket' })}`);
  const data = await res.json();
  return { props: { serverData: data, queryObj: filters } }
});