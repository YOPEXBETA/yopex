import React from "react";
// import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import { Grid, Stack } from "@mui/material";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useUserById } from "../../../../../../hooks/react-query/useUsers";
import MyJob from "./MyJob";

const MyJobs = () => {
  // const { user } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const { data: userProfile, isLoading } = useUserById(userId);
  // const [open, setOpen] = useState(false);

  // const toggleOpen = () => setOpen((prev) => !prev);

  // const { data, isLoading } = useUserJobs(user._id);
  // const sendRequest = async () => {
  //   const res = await axios
  //     .get(`https://yopex-api.tabaani.co/job/user/${id}`)
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };

  // useEffect(() => {
  //   sendRequest()
  //     .then((data) => setCompany(data.company))
  //     .finally(() => setIsLoading(false));
  // }, []);
  const noJobsMessageStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    fontSize: "2rem",
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Stack spacing={2}>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {userProfile?.jobs?.length > 0 ? (
            userProfile.jobs.map((job) => (
              <MyJob key={job._id} userProfile={userProfile} job={job} />
            ))
          ) : (
            <div style={noJobsMessageStyle}>
              <p>You haven't added any jobs yet.</p>
            </div>
          )}
        </Grid>
      </Stack>
    </div>
  );
};
export default MyJobs;
