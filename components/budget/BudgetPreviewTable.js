import DeleteSvg from "components/shared/svg/Delete";
import EditSvg from "components/shared/svg/Edit";
import Data from "/resources/data.json";
export default function BudgetPreviewTable({}) {
  const data = Data.data;
  return (
    <table className="min-w-full table-fixed">
      <thead className="bg-white border-b">
        <tr>
          <th
            scope="col"
            className="text-md font-medium text-gray-900 pr-6 py-4 text-left"
          >
            #
          </th>
          <th
            scope="col"
            className="text-md font-medium text-gray-900 pr-6 py-4 text-left"
          >
            Cr / Dr
          </th>
          <th
            scope="col"
            className="text-md font-medium text-gray-900 pr-6 py-4 text-left"
          >
            Date
          </th>
          <th
            scope="col"
            className="text-md font-medium text-gray-900 pr-6 py-4 text-left"
          >
            Category
          </th>
          <th
            scope="col"
            className="text-md font-medium text-gray-900 pr-6 py-4 text-left"
          >
            Note
          </th>
          <th
            scope="col"
            className="text-md font-medium text-gray-900 pr-6 py-4 text-left"
          >
            Amount
          </th>
          <th
            scope="col"
            className="text-md font-medium text-gray-900 pr-6 py-4 text-left"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((rowData, key) => (
          <tr
            className={` border-b ${
              rowData.dr_cr === "cr"
                ? "bg-green-50 border-green-100"
                : "bg-red-50 border-red-100"
            }`}
            key={key}
          >
            <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
              {key + 1}
            </td>
            <td className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
              {rowData.dr_cr}
            </td>
            <td className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
              {rowData.date}
            </td>
            <td className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
              {rowData.category}
            </td>
            <td className="text-sm text-gray-900 font-light px-2 py-2">
              {rowData.note}
            </td>
            <td className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
              {rowData.amount}
            </td>
            <td className="text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
              <EditSvg />
              <DeleteSvg />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
