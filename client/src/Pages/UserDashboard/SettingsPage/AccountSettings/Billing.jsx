import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  useGetPaymentByUser,
  usePayment,
  useUserById,
} from "../../../../hooks/react-query/useUsers";
import { useForm } from "react-hook-form";

export default function App() {
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
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Billing Informations
      </h2>
      <hr className="border dark:border-gray-200 mb-2" />
      <br />
      <div className="dark:bg-zinc-700 p-4 rounded-lg">
        <div>
          <div className="space-y-2">
            <h6 className="dark:text-gray-200 text-lg mb-2">Current Balance</h6>
            <h4 className="dark:text-gray-200 text-2xl mb-2">
              {userProfile?.balance} Points
            </h4>
          </div>

          <br />
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-black">
                <tr className="bg-white h-11 overflow-x-auto">
                  <th className="py-2 px-4 text-left">Payment Id</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">State</th>
                  <th className="py-2 px-4 text-right">Payment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payment?.map((payment, index) => {
                  return (
                    <tr key={payment._id} className="hover:bg-gray-50 bg-white">
                      <td className=" py-4 px-4 font-bold text-md">
                        {index + 1}{" "}
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
                        {" "}
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
      </div>
    </div>
  );
}
