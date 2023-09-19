import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  // Avatar,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  useAcceptApplier,
  useAcceptedAppliers,
  useAppliers,
  // useSortAppliers,
} from "../../../../../../hooks/react-query/useJobs";

const Appliers = ({ toggleOpen, job, open }) => {
  // const [appliers, setAppliers] = useState([]);
  // const [acceptedAppliers, setAcceptedAppliers] = useState([]);
  // const [sort, setSort] = useState(false);

  const { data: appliers } = useAppliers(job);
  const { data: acceptedAppliers } = useAcceptedAppliers(job);
  const { mutate } = useAcceptApplier(job);
  // const { mutate: sortAppliers } = useSortAppliers(job);

  // useEffect(() => {
  //   const fetchAppliers = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://199.247.3.38:8000/job/jobs/${job._id}/appliers`
  //       );
  //       setAppliers(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchAppliers();
  // }, [jobId]);

  // useEffect(() => {
  //   // Load accepted appliers from local storage or from a server API
  //   const loadAcceptedAppliers = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://199.247.3.38:8000/job/jobs/${jobId}/accepted-appliers`
  //       );
  //       setAcceptedAppliers(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   loadAcceptedAppliers();
  // }, [jobId]);

  // const acceptApplier = async (userId) => {
  //   try {
  //     const response = await axios.put(
  //       `http://199.247.3.38:8000/job/jobs/${jobId}/appliers/${userId}/accept`
  //     );
  //     console.log(response.data.message);
  //     setAcceptedAppliers([...acceptedAppliers, userId]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const isApplierAccepted = (userId) => {
  //   return acceptedAppliers.includes(userId);
  // };

  // const handleClick = () => {
  //   setSort(true);
  //   // sortAppliers();
  // };

  return (
    <Dialog open={open} onClose={toggleOpen} fullWidth="lg">
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6}>
          <DialogTitle variant="h4">Applicants</DialogTitle>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <Grid item style={{ paddingRight: 20 }}>
            {/* <Button onClick={handleClick}>AI SORT</Button> */}
          </Grid>
        </Grid>
      </Grid>{" "}
      <DialogContent>
        <TableContainer component={Paper}>
          <Table aria-label="Participants table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appliers?.length > 0 ? (
                appliers.map((applier) => (
                  <TableRow key={applier._id}>
                    <Link
                      to={`/profile/${applier._id}`}
                      key={applier._id}
                      onClick={toggleOpen}
                    >
                      <TableCell component="th" scope="row">
                        {applier.firstname} {applier.lastname}
                      </TableCell>
                    </Link>
                    <TableCell>{applier.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => mutate(applier._id)}
                        disabled={acceptedAppliers?.includes(applier._id)}
                      >
                        {acceptedAppliers?.includes(applier._id)
                          ? "Accepted"
                          : "Accept"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No appliers yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleOpen}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Appliers;
