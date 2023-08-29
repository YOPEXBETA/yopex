import { Button, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useChallengeById, useChooseWinner, useUserSubmission } from "../../../../../../hooks/react-query/useChallenges";

const ChooseWinner = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const myData = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  const { data } = useChallengeById(id);
  const { mutate:chooseWinner } = useChooseWinner();
  
  const handleSubmit = async () => {
    const companyId = data.company._id;
    const winnerId = selectedUser;
    
    chooseWinner({ idChallenge: id, idCompany: companyId, idUser: winnerId })
    
    window.location.reload();
  };

  return (
    <Stack spacing={5} sx={{ width: "50%", margin: "0 auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <InputLabel id="demo-simple-select-label">
            Select an Option
          </InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedUser}
            label="Select an Option"
            fullWidth
            onChange={(event) => setSelectedUser(event.target.value)}
          >
            {data?.users.map((user) => (
              <MenuItem value={user.user._id} key={user._id}>
                {`${user.user.firstname} ${user.user.lastname}`}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          ></Stack>
        </Grid>
        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="error"
            onClick={handleSubmit}
          >
            Verify !
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChooseWinner;
