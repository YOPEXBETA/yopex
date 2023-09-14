import { Button } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { usePayment } from '../../../hooks/react-query/useUsers';

const Store = () => {
    const { user } = useSelector((state) => state.auth);
    const { mutate, isLoading } = usePayment();



    if (user?.companies?.length === 0) {
        return (<h1>Unauthorized</h1>)}

    return (
        <div class="grid grid-cols-3 gap-[20px] m-16">
            <div class="max-w-sm p-6 grid grid-cols-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">50 Points</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">50 TND</p>
                </div>
                <Button
                    type="button"
                    sx={{ backgroundColor: "orange" }}
                    startIcon={<AccountBalanceWalletIcon />}
                    onClick={() =>{mutate(50)}}
                >
                    Flouci
                </Button>
            </div>

            <div class="max-w-sm p-6 grid grid-cols-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">100 Points</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">100 TND</p>
                </div>
                <Button
                    type="submit"
                    sx={{ backgroundColor: "orange" }}
                    startIcon={<AccountBalanceWalletIcon />}
                    onClick={() =>{mutate(100)}}
                >
                    Flouci
                </Button>
            </div>

            <div class="max-w-sm p-6 grid grid-cols-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">200 Points</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">200 TND</p>
                </div>
                <Button
                    type="submit"
                    sx={{ backgroundColor: "orange" }}
                    startIcon={<AccountBalanceWalletIcon />}
                    onClick={() =>{mutate(200)}}
                >
                    Flouci
                </Button>
            </div>

            <div class="max-w-sm p-6 grid grid-cols-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">350 Points</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">350 TND</p>
                </div>
                <Button
                    type="submit"
                    sx={{ backgroundColor: "orange" }}
                    startIcon={<AccountBalanceWalletIcon />}
                    onClick={() =>{mutate(350)}}
                >
                    Flouci
                </Button>
            </div>

            <div class="max-w-sm p-6 grid grid-cols-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">500 Points</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">500 TND</p>
                </div>
                <Button
                    type="submit"
                    sx={{ backgroundColor: "orange" }}
                    startIcon={<AccountBalanceWalletIcon />}
                    onClick={() =>{mutate(500)}}
                >
                    Flouci
                </Button>
            </div>

            <div class="max-w-sm p-6 grid grid-cols-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">1000 Points</h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">1000 TND</p>
                </div>
                <Button
                    type="submit"
                    sx={{ backgroundColor: "orange" }}
                    startIcon={<AccountBalanceWalletIcon />}
                    onClick={() =>{mutate(1000)}}
                >
                    Flouci
                </Button>
            </div>

            
            
        </div>
    )
}

export default Store;