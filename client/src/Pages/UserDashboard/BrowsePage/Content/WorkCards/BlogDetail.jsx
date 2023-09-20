import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://yopex-api.tabaani.co/job/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setJob(data.job);
      setInputs({
        title: data.job.title,
        description: data.job.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://yopex-api.tabaani.co/job/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(job);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate(`/profile/${job.company}`));
  };

  return (
    <Box
      border={3}
      borderRadius={10}
      padding={3}
      marginTop={3}
      display="flex"
      flexDirection={"column"}
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Typography
        fontWeight={"bold"}
        padding={3}
        color="grey"
        variant="h2"
        textAlign={"center"}
      >
        Update Your Job
      </Typography>
      <InputLabel sx={labelStyles}>Title</InputLabel>
      <TextField
        name="title"
        onChange={handleChange}
        value={inputs.title}
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="title"
        autoFocus
      />
      <InputLabel sx={labelStyles}>Description</InputLabel>
      <TextField
        name="description"
        onChange={handleChange}
        value={inputs.description}
        margin="normal"
        variant="outlined"
        required
        fullWidth
        id="description"
        multiline
        rows={4}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update Your Job
      </Button>
    </Box>
  );
};

export default BlogDetail;
