import {
  Avatar,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useAdminUsers } from "../../../hooks/react-query/useUsers";
import { getUserLevelData } from "../../../utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const EvaluationPage = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  // let users = useSelector((state) => state.User.users);
  const { data } = useAdminUsers();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // useEffect(() => {
  //   dispatch(getAllUsers()).catch(() => console.log("Error loading posts"));
  // }, [dispatch]);

  // Sort users based on their score in descending order
  // data?.sort((a, b) => b.score - a.score);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Replace the sample data with your actual user data
  // data = data.map((user) => ({
  //   picturePath: user.picturePath,
  //   firstName: user.firstname,
  //   lastName: user.lastname,
  //   level: getUserLevelData(user.score).level,
  //   challengesCompleted: user.submissions.length,
  //   challengesWon: user.challengesWon,
  //   score: user.score,
  // }));

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>USER</TableCell>
            <TableCell>LEVEL</TableCell>
            <TableCell>COMPLETED CHALLENGES</TableCell>
            <TableCell>CHALLENGES WON</TableCell>
            <TableCell>SCORE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Grid
                    container
                    spacing={1}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Grid item lg={2}>
                      <Avatar
                        alt={`${user.firstname} ${user.lastname}`}
                        src={user.picturePath}
                        className={classes.avatar}
                      />
                    </Grid>
                    <Grid item lg={10}>
                      <Stack flexDirection={"row"} columnGap={1}>
                        <Typography variant="body1">
                          {user.firstname}
                        </Typography>
                        <Typography variant="body1">{user.lastname}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{getUserLevelData(user.score).level}</TableCell>
                <TableCell>{user.challengesDone}</TableCell>
                <TableCell>{user.challengesWon}</TableCell>
                <TableCell>{user.score}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default EvaluationPage;
