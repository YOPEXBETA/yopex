import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useChallengeById } from "../../../../../../hooks/react-query/useChallenges";
import ParticipantRow from "./ParticipantRow";

const ParticipantsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { id: challengeId } = useParams();
  const { data: challenge } = useChallengeById(challengeId);
  console.log("challenge", challenge);
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (challenge)
    return (
      <div>
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>RANK</TableCell>
                <TableCell>USERNAME</TableCell>
                <TableCell>REGISTRATION DATE</TableCell>
                <TableCell align="right">SUBMISSION DATE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {challenge.users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <ParticipantRow key={user._id} index={index} user={user} />
                  );
                })}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={challenge.users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    );
};

export default ParticipantsTable;
