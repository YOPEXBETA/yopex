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
  usePayment,
  useUserById,
} from "../../../../hooks/react-query/useUsers";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit } = useForm();
  const { user } = useSelector((state) => state.auth);
  const { data: userProfile } = useUserById(user._id);
  const { mutate, isLoading } = usePayment();

  const onSubmit = (data) => {
    mutate(data.amount);

  };

  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        Billing Informations
      </Typography>
      <Divider />
      <br />
      <Card variant="outlined">
        <CardContent>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography color={"warning.main"} variant="h3">
              Balance {userProfile?.balance || 0 + " $"}
            </Typography>
          </Stack>
        </CardContent>
        <CardContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack flexDirection={"row"} gap={2}>
            <TextField
              fullWidth
              placeholder="enter the amount of money in dinar"
              {...register("amount", { required: true })}
            />
            <Button
              disabled={isLoading}
              type="submit"
              
              sx={{ backgroundColor: "orange" }}
              startIcon={<AccountBalanceWalletIcon />}
            >
              Flouci
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
