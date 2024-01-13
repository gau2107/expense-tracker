import Constants from "/resources/constants.js";
import dayjs from "dayjs";
import Image from 'next/image';

export default function ExpenseTable({ list, total_amount: totalAmount, total_debit_amount: totalDebitAmount }) {
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
              {list.map((data, key) => (
                <tr key={key}>
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
                      {data.category.name}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className={`text-lg text-left text-${data.type === 'dr' ? 'red' : 'green'}-500 font-medium`}>{Constants[data.type]}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{data.description}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className={`text-right text-${data.type === 'dr' ? 'red' : 'green'}-500 font-medium`}>{data.amount}</div>
                  </td>
                  <td className="p-2">
                    <div className={`justify-center flex`}>
                      <Image className="mr-2 cursor-pointer" src="/assets/edit.svg" alt="Edit" width={24} height={24} />
                      <Image className="ml-2 cursor-pointer" src="/assets/trash.svg" alt="Delete" width={24} height={24} />
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} className="p-2 uppercase text-500 font-medium text-right">
                  <span className="pr-10">Total debit amount:</span>
                  <span className="text-red-500">
                    {totalDebitAmount}</span>
                </td>
              </tr> <tr>
                <td colSpan={6} className="p-2 uppercase text-500 font-medium text-right">
                  <span className="pr-10">Total amount:</span>
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
