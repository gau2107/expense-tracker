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
import { useBoundStore } from "store/store";

export default function Expenses({ serverData, queryObj }) {

  const curMonth = dayjs().format('YYYY-MM');
  const router = useRouter();
  const categoryList = useBoundStore((state) => state.categories);
  const paymentModeList = useBoundStore((state) => state.paymentModes);

  const normalizeFilters = (value) => {
    const normalized = { ...(value || {}) };

    Object.keys(normalized).forEach((key) => {
      const item = normalized[key];
      if (
        item === undefined ||
        item === null ||
        item === '' ||
        (Array.isArray(item) && item.length === 0)
      ) {
        delete normalized[key];
      }
    });

    return normalized;
  };

  const [filters, setFilters] = useState(() => normalizeFilters({
    month: queryObj?.month || curMonth,
    ...queryObj,
  }));
  const [searchValue, setSearchValue] = useState(queryObj?.query || '');

  const debounce = useDebounce();

  useEffect(() => {
    if (!router.isReady) return;

    const normalizedFilters = normalizeFilters({
      ...router.query,
      month: router.query.month || curMonth,
    });

    if (!isEqual(filters, normalizedFilters)) {
      setFilters(normalizedFilters);
      setSearchValue(normalizedFilters.query || '');
    }

  }, [router.isReady, router.query, curMonth]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!isEqual(filters, queryObj)) {
      const query = queryString.stringify(filters, { arrayFormat: 'bracket' });
      router.replace(`/expense${query ? `?${query}` : ''}`);
    }
  }, [filters, queryObj, router]);

  const handleDeleteApiCallback = () => router.replace(router.asPath);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    const debouncedSearch = debounce((searchTerm) => {
      setFilters(prev => ({ ...prev, query: searchTerm }));
    }, 500);
    debouncedSearch(value);
  };

  const handleCategoryChange = (arr) => {
    const debouncedCat = debounce((value) => {
      setFilters(prev => ({ ...prev, category_id: value?.map(v => v.value) }));
    }, 1000);
    debouncedCat(arr);
  };

  const handlePaymentModeChange = (arr) => {
    const debouncedPayment = debounce((value) => {
      setFilters(prev => ({ ...prev, payment_mode_id: value?.map(v => v.value) }));
    }, 1000);
    debouncedPayment(arr);
  };

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
        <CategoryFilter onChange={handleCategoryChange} />
        <PaymentModeFilter onChange={handlePaymentModeChange} />
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