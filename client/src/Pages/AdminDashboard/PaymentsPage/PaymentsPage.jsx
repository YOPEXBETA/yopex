import React from "react";
import { useGetPayments } from "../../../hooks/react-query/useUsers";
import { useSelector } from "react-redux";

const PaymentsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: payments } = useGetPayments();

  function formatDate(dateString) {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="h-screen">
      <div className="rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-zinc-900">
            <tr>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Payment Id
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Username
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Amount
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                State
              </th>
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Payment Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments?.map((payment, index) => {
              return (
                <tr key={payment?._id} className="hover:bg-gray-50 bg-white">
                  <td className=" py-4 px-4 font-bold text-md">
                    {payment?.payment_id}{" "}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">
                          {payment?.user?.firstname}
                        </span>
                        <span className="text-sm">
                          {payment?.user?.lastname}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{payment?.balanace}</span>
                        <span className="text-sm">TND</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-left py-4 px-4">
                    {payment?.state}
                  </td>
                  <td className="text-sm text-right py-4 px-4">
                    <div>{formatDate(payment?.createdAt)}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsPage;
