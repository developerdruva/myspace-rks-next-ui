"use client";

import { Formik, Form } from "formik";
import { Box, Button, Grid, MenuItem, Stack, TextField } from "@mui/material";
import { getFieldsByCategory } from "@/common/CommonFunction";

const DynamicForm = ({ category }: { category: any }) => {
  const fields = getFieldsByCategory(category);

  const getGridProps = (field: any) => {
    if (field.type === "textarea") {
      return { xs: 12 };
    }

    return { xs: 12, sm: 6 };
  };

  const commonFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1.5,
      backgroundColor: "background.paper",
    },
  };

  const initialValues = fields.reduce((acc: any, field: any) => {
    acc[field.name] = "";
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              {fields.map((field: any) => (
                <Grid key={field.name} size={getGridProps(field)}>
                  {field.type === "text" ||
                  field.type === "number" ||
                  field.type === "date" ? (
                    <TextField
                      fullWidth
                      size="small"
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      sx={commonFieldSx}
                      InputLabelProps={
                        field.type === "date" ? { shrink: true } : {}
                      }
                    />
                  ) : field.type === "select" ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      sx={commonFieldSx}
                    >
                      {field.options?.map((opt: string) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : field.type === "textarea" ? (
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      name={field.name}
                      label={field.label}
                      value={values[field.name]}
                      onChange={handleChange}
                      sx={commonFieldSx}
                    />
                  ) : null}
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button type="submit" variant="contained" sx={{ minWidth: 140 }}>
                Submit
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
