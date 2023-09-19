import React from 'react'
import { useGetPayments } from '../../../hooks/react-query/useUsers';
import { useSelector } from 'react-redux';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';

const PaymentsPage = () => {
    const {user} = useSelector((state) => state.auth);
    const {data:payments} = useGetPayments();


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
    <Stack>
      <Typography variant="h5" gutterBottom>
        Billing Informations
      </Typography>
      <Divider />
      <br />
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Current Balance
            </Typography>
            <Typography variant="h4" gutterBottom>
              {user?.balance} Points
            </Typography>
          </Stack>
          <br />
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-black">
                <tr className="bg-white h-11">
                  <th className="py-2 px-4 text-left">Payment Id</th>
                  <th className="py-2 px-4 text-left">User</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">State</th>
                  <th className="py-2 px-4 text-right">Payment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments?.map((payment, index) => {
                  return (
                    <tr key={payment._id} className="hover:bg-gray-50 bg-white">
                      <td className=" py-4 px-4 font-bold text-md">
                        {payment?.payment_id}{" "}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                            <div className="flex items-center gap-1">
                                <span className="text-sm">{payment?.user?.firstname}</span>
                                <span className="text-sm">{payment?.user?.lastname}</span>
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
                        {" "}
                        {payment?.state}
                      </td>
                      <td className="text-sm text-right py-4 px-4">
                        <div>{formatDate(payment?.createdAt)}</div>
                      </td>
                    </tr>
                  )})}
              </tbody>
            </table>
          </div>
            
          </CardContent>
      </Card>
    </Stack>
  )
}

export default PaymentsPage;