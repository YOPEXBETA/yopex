import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const TasksDescription = () => {
  const { id: challengeId } = useParams();
  const { data: challenge } = useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8000/challenge/single/${challengeId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });

  if (challenge)
    return (
      <div>
        <Card elevation={0} variant="outlined">
          <CardHeader
            title={
              <Typography component="div" variant="h4">
                Instructions
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="body1">{challenge.description}</Typography>
            </Stack>
          </CardContent>
          <CardHeader
            title={
              <Typography component="div" variant="h4">
                Category
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="body1">{challenge.category}</Typography>
            </Stack>
          </CardContent>
          <Divider />
          <CardHeader
            title={
              <Typography component="div" variant="h4">
                Recommended Skills
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Stack direction="row" spacing={1}>
              {challenge.RecommendedSkills.map((skill, i) => (
                <Chip key={i} label={skill} />
              ))}
            </Stack>
          </CardContent>
        </Card>
      </div>
    );
};

export default TasksDescription;
