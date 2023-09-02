import { Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateSkill, useDeleteSkill, useSkills, useUpdateSkill } from "../../../hooks/react-query/useSkills";

const SkillsPage = () => {
  const { data } = useSkills();
  const { mutate } = useCreateSkill();
  const { mutate: deleteSkill } = useDeleteSkill();
  const { mutate: updateSkill } = useUpdateSkill();

  const form = useForm();
  const onSubmit = (data) => mutate(data.name);
  const handleSubmit = (e, id) => {
    const name = e.target["name"].value;
    updateSkill({ name, id });
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Skill name"
          {...form.register("name", { required: true })}
        />
        <button type="submit">Add skill</button>
      </form>

      <Grid className="mt-4" container rowSpacing={2} columnSpacing={2}>
        {data?.map(
          (badgeData) =>
            badgeData && (
              <Grid item key={badgeData._id} lg={3} md={6} xs={12}>
                <Card>
                  <CardContent>
                    <Stack
                      alignItems={"center"}
                      flexDirection={"row"}
                      columnGap={1}
                    >
                      <Typography variant="h5">Skill :</Typography>
                      <Typography variant="h5" noWrap color={"primary.dark"}>
                        {badgeData.name}
                      </Typography>
                    </Stack>

                    <form onSubmit={(e) => handleSubmit(e, badgeData._id)}>
                      <input type="text" placeholder="Update" name="name" />
                      <button type="submit">Update</button>
                    </form>

                    <button onClick={() => deleteSkill(badgeData.name)}>
                      Delete
                    </button>
                  </CardContent>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </div>
  );
};

export default SkillsPage;
