import Image from "next/image";
import constants, { budgetThs } from "resources/constants";
import Swal from "sweetalert2";
export default function BudgetPreviewTable({ data, handleEdit, callbackFn }) {

  function handleDeleteClick(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
      callbackFn();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    });
  }

  return (
    <section className="antialiased text-gray-600 h-fit px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200 m-8">
          <header className="px-5 py-4 border-b ">
            <h2 className="font-semibold text-gray-800">{`Budget Preview`}</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    {budgetThs.map((th) => (
                      <th key={th} className="p-2 whitespace-nowrap">
                        <div
                          className={`font-semibold text-${th === "Amount"
                            ? "right"
                            : th === "Actions"
                              ? "center"
                              : "left"
                            }`}
                        >
                          {th}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {data.map((rowData, key) => (
                    <tr key={key}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">
                            {key + 1}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div
                          className={`text-lg text-left text-${rowData.type === "dr" ? "red" : "green"
                            }-500 font-medium`}
                        >
                          {constants[rowData.type]}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{rowData.date}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{rowData.frequency}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{rowData.category.name}</div>
                      </td>

                      <td className="p-2 max-w-xs">
                        <div className="text-left">{rowData.description || '-'}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {rowData.type === "dr" ? (
                          <div
                            className={`text-right text-red-500 font-medium`}
                          >
                            {rowData.amount}
                          </div>
                        ) : (
                          <div
                            className={`text-right text-green-500 font-medium`}
                          >
                            {rowData.amount}
                          </div>
                        )}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="justify-center flex">
                          <Image className="mr-2 cursor-pointer" src="/assets/edit.svg" alt="Edit" width={24} height={24}
                            onClick={() => handleEdit(rowData)} />
                          <Image className="ml-2 cursor-pointer" src="/assets/trash.svg" alt="Delete" width={24} height={24}
                            onClick={() => handleDeleteClick(rowData.id)} />
                        </div>
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
