import Constants from "/resources/constants.js";
import dayjs from "dayjs";
import Image from 'next/image';
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function ExpenseTable({ list, total_amount: totalAmount, total_debit_amount: totalDebitAmount, handleDeleteApiCallback }) {

  const router = useRouter();
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/categories`);
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categoriesData = await res.json();
      console.log('Categories loaded:', categoriesData); // Debug log
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Try alternative endpoint
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/category`);
        if (res.ok) {
          const categoriesData = await res.json();
          console.log('Categories loaded from /category:', categoriesData); // Debug log
          setCategories(categoriesData);
        }
      } catch (altError) {
        console.error('Error fetching from alternative endpoint:', altError);
      }
    }
  }

  async function handleCategoryChange(expenseId, newCategoryId) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense/${expenseId}`, {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ category_id: newCategoryId })
      });

      if (response.ok) {
        setEditingCategoryId(null);
        handleDeleteApiCallback(); // Refresh the table data
      } else {
        throw new Error('Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update category.",
        icon: "error",
        confirmButtonColor: "black"
      });
    }
  }

  function handleDeleteClick(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F44336",
      cancelButtonColor: "black",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteApiCall(id);
      }
    });
  }

  function handleDeleteApiCall(id) {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/expense/${id}`, {
      method: 'delete', headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      handleDeleteApiCallback();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        confirmButtonColor: "black"
      });
    });
  }
  return (
    <section >
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Expense Report</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">#</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Date</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Category</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Payment Mode</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Cr/Dr</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Note</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-right">Amount</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {list?.length ? list.map((data, key) => (
                <tr key={key} className="hover:bg-stone-50">
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {key + 1}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{dayjs(data.date).format('ddd DD MMM YYYY')}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                      {editingCategoryId === data.id ? (
                        <select
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue={data.category.id}
                          onChange={(e) => handleCategoryChange(data.id, e.target.value)}
                          onBlur={() => setEditingCategoryId(null)}
                          autoFocus
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span 
                          className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setEditingCategoryId(data.id);
                          }}
                        >
                          {data.category.name}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                      {data.payment_mode?.name}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className={`text-lg text-left text-${data.type === 'dr' ? 'red' : 'green'}-500 font-medium`}>{Constants[data.type]}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{data.description || '-'}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className={`text-right text-${data.type === 'dr' ? 'red' : 'green'}-500 font-medium`}>{data.amount}</div>
                  </td>
                  <td className="p-2">
                    <div className={`justify-center flex`}>
                      <Image className="mr-2 cursor-pointer" src="/assets/edit.svg" alt="Edit" width={24} height={24}
                        onClick={() => router.push(`/expense/edit/${data.id}`)} />
                      <Image className="ml-2 cursor-pointer" src="/assets/trash.svg" alt="Delete" width={24} height={24}
                        onClick={() => handleDeleteClick(data.id)} />
                    </div>
                  </td>
                </tr>
              ))
            : <tr className="text-center">
              <td colSpan={8} className="p-12 text-3xl">No expense found 😄</td></tr>}
              <tr>
                <td colSpan={6} className="p-2 uppercase text-500 font-medium text-right">
                  <span className="pr-10">Total expenses:</span>
                  <span className="text-red-500">
                    {totalDebitAmount}</span>
                </td>
              </tr><tr>
                <td colSpan={6} className="p-2 uppercase text-500 font-medium text-right">
                  <span className="pr-10">Total savings:</span>
                  <span className="text-green-500">
                    {totalAmount}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
