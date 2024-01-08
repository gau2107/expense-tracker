import Constants from "/resources/constants.js";
import dayjs from "dayjs";

export default function ExpenseTable({ list }) {
  return (
    <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
