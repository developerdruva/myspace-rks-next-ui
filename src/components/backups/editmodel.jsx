"use client";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import apiServices from "@/utils/service-calls/apiServices";
import { showAlertNotice } from "@/common/CommonFunction";
import { BsEye } from "react-icons/bs";

const BasicDetails = ({ personDetails }) => {
  const router = useRouter();

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    mobile_no: "",
    roleof_person: "",
    person_designation: "",
    profile_pic: "",
    person_resume: "",
    welcome_text: "",
  });

  useEffect(() => {
    if (personDetails) {
      setInitialValues(personDetails);
    }
  }, []);

  const submitForm = (values, resetForm) => {
    let formData = new FormData();

    Object.keys(values)?.forEach((key) => {
      formData.append(key, values[key]);
    });

    apiServices.saveProfileDetails(formData).then((res) => {
      if (res?.data?.status === "success") {
        showAlertNotice(res?.data?.message, "success").then(() => {
          router.push("/");
          localStorage?.clear();
        });
      } else {
        showAlertNotice(res?.data?.message, "error");
      }
    });
  };

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Profile Details
          </Typography>

          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({})}
            onSubmit={(values, { resetForm }) => submitForm(values, resetForm)}
          >
            {({
              errors,
              handleChange,
              setFieldValue,
              touched,
              resetForm,
              handleSubmit,
              values,
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  {/* LEFT COLUMN */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="first_name"
                      label="First Name"
                      value={values.first_name}
                      onChange={handleChange}
                    />

                    <TextField
                      fullWidth
                      sx={{ mt: 2 }}
                      name="last_name"
                      label="Last Name"
                      value={values.last_name}
                      onChange={handleChange}
                    />

                    <TextField
                      fullWidth
                      sx={{ mt: 2 }}
                      name="email_id"
                      label="Email"
                      type="email"
                      value={values.email_id}
                      onChange={handleChange}
                    />

                    <TextField
                      fullWidth
                      sx={{ mt: 2 }}
                      name="mobile_no"
                      label="Mobile"
                      type="tel"
                      value={values.mobile_no}
                      onChange={handleChange}
                    />

                    <TextField
                      fullWidth
                      sx={{ mt: 2 }}
                      name="roleof_person"
                      label="Role"
                      value={values.roleof_person}
                      onChange={handleChange}
                    />

                    <TextField
                      fullWidth
                      sx={{ mt: 2 }}
                      name="person_designation"
                      label="Designation"
                      value={values.person_designation}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* RIGHT COLUMN */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="welcome_text"
                      label="Welcome Text"
                      value={values.welcome_text}
                      onChange={handleChange}
                      multiline
                      rows={3}
                    />

                    {/* Profile Pic */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2">
                        Upload Profile Picture{" "}
                        {values?.profile_pic && (
                          <a
                            href={values?.profile_pic}
                            target="_blank"
                            style={{ fontSize: "0.75rem" }}
                          >
                            &nbsp;View <BsEye size={12} />
                          </a>
                        )}
                      </Typography>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFieldValue("profile_pic", e.target.files[0])
                        }
                        style={{ marginTop: "8px" }}
                      />
                    </Box>

                    {/* Resume */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2">
                        Upload Resume{" "}
                        {values?.resume && (
                          <a
                            href={values?.resume}
                            target="_blank"
                            style={{ fontSize: "0.75rem" }}
                          >
                            &nbsp;View <BsEye size={12} />
                          </a>
                        )}
                      </Typography>

                      <input
                        type="file"
                        onChange={(e) =>
                          setFieldValue("resume", e.target.files[0])
                        }
                        style={{ marginTop: "8px" }}
                      />
                    </Box>

                    {/* Buttons */}
                    <Box
                      sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => resetForm()}
                      >
                        Reset
                      </Button>

                      <Button variant="contained" type="submit">
                        {personDetails ? "Update" : "Submit"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BasicDetails;
