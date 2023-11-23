import React from "react";
import { useSelector } from "react-redux";
import {
  useGetPaymentByUser,
  useUserById,
} from "../../../../../hooks/react-query/useUsers";
import { useForm } from "react-hook-form";

const Billing = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useUserById(user._id);
  const { data: payment } = useGetPaymentByUser(user._id);
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
    <div className="">
      <div>
        <h2 className="text-xl font-bold  dark:text-white uppercase">
          Billing Informations
        </h2>
        <p className="text-gray-400 mb-4">
          Check your account billing informations
        </p>
      </div>
      <hr className="border dark:border-gray-200 mb-2" />
      <div className="dark:bg-zinc-700 border p-4 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <h6 className="dark:text-gray-200 text-lg mb-2 uppercase">
            Current Balance
          </h6>
          <h4 className="dark:text-gray-200 text-2xl mb-2">
            {userProfile?.balance} Points
          </h4>
        </div>
      </div>

      <section className="container mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-zinc-500 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-500">
                  <thead className="bg-gray-50 dark:bg-zinc-900">
                    <tr>
                      <div className="flex items-center gap-x-3">
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Payment id
                        </th>
                      </div>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        State
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal  rtl:text-right text-gray-500 dark:text-gray-400 text-right"
                      >
                        Payment date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-zinc-500 dark:bg-zinc-800">
                    {payment?.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap ">
                          <div className="inline-flex items-center gap-x-3">
                            <span> {index + 1}</span>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <div className="flex items-center gap-x-3">
                            <span>{payment?.balanace}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-gray-300 whitespace-nowrap">
                          {payment?.state}
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-zinc-500 whitespace-nowrap text-right">
                          <div
                            className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-green-500 bg-green-100/60 dark:bg-gray-800`}
                          >
                            {formatDate(payment?.createdAt)}{" "}
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
    </div>
  );
};

export default Billing;
