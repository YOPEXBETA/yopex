import PaidIcon from "@mui/icons-material/Paid";
import {
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

const ContestsFilters = ({ setMinAmount, setMaxAmount }) => {
  const { register, watch } = useForm();

  // const searchQuery = watch("searchQuery");
  const minAmount = watch("minAmount");
  const maxAmount = watch("maxAmount");

  // useEffect(() => {
  //   setSearchQuery(searchQuery);
  // }, [searchQuery, setSearchQuery]);

  useEffect(() => {
    setMinAmount(minAmount);
  }, [minAmount, setMinAmount]);

  useEffect(() => {
    setMaxAmount(maxAmount);
  }, [maxAmount, setMaxAmount]);

  return (
    <Card elevation={0} variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          {/* <Stack spacing={1}>
            <Typography variant="body1" fontWeight={"bold"}>
              Search contests
            </Typography>
            <div>
              <TextField
                label="Search Contest"
                variant="outlined"
                fullWidth
                {...register("searchQuery")}
              />
            </div>
          </Stack> */}

          <form noValidate autoComplete="off">
            <Stack spacing={2}>
              <Typography variant="body1" fontWeight={"bold"}>
                Contest Prize
              </Typography>

              <TextField
                id="min-amount"
                label="Min Amount"
                type="number"
                {...register("minAmount")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaidIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="max-amount"
                label="Max Amount"
                type="number"
                {...register("maxAmount")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaidIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </form>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ContestsFilters;
