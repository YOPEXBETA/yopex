import { Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../../hooks/react-query/useCategories";
import { useForm } from "react-hook-form";

const Categories = () => {
  const { data } = useCategories();
  const { mutate } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: updateCategory } = useUpdateCategory();

  const form = useForm();
  const onSubmit = (data) => mutate(data.name);
  const handleSubmit = (e, id) => {
    const name = e.target["name"].value;
    updateCategory({ name, id });
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Category name"
          {...form.register("name", { required: true })}
        />
        <button type="submit">Add category</button>
      </form>

      <Grid container rowSpacing={2} columnSpacing={2}>
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
                      <Typography variant="h5">Category :</Typography>
                      <Typography variant="h5" noWrap color={"primary.dark"}>
                        {badgeData.name}
                      </Typography>
                    </Stack>

                    <form onSubmit={(e) => handleSubmit(e, badgeData._id)}>
                      <input type="text" placeholder="Update" name="name" />
                      <button type="submit">Update</button>
                    </form>

                    <button onClick={() => deleteCategory(badgeData._id)}>
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

export default Categories;
