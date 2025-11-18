"use client";
import { useEffect, useState } from "react";
import { Button, Grid, TextField, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import apiServices from "@/utils/service-calls/apiServices";
import { getPortfolioDetails, showAlertNotice } from "../../common/CommonFunction";

const WorkedCompaniesEntry = ({
  setShowAddModal,
  compEditRecord,
  isCompEdit,
  setIsCompEdit,
}) => {
  const personDetails =
    useSelector((state) => state?.portfolioState?.personDetails[0]) || null;

  const [initialValues, setInitialValues] = useState({
    company_name: "",
    designation: "",
    from_date: "",
    to_date: "",
    email_id: personDetails?.email_id,
    numberof_projects: "",
    color_code: "",
    comp_seq: "",
    company_code: "",
  });

  useEffect(() => {
    if (isCompEdit && compEditRecord) {
      setInitialValues(compEditRecord);
    }
  }, [isCompEdit, compEditRecord]);

  const submitForm = (values, resetForm) => {
    const apiCall = isCompEdit
      ? apiServices.updateWorkedCompanies(values)
      : apiServices.saveWorkedCompanies(values);

    apiCall.then((res) => {
      if (res?.data?.status === "success") {
        showAlertNotice(res?.data?.message, "success").then(() => {
          setShowAddModal(false);
          getPortfolioDetails();
          setIsCompEdit(false);
        });
      } else {
        showAlertNotice(res?.data?.message, "error");
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={Yup.object({})}
      onSubmit={(values, { resetForm }) => {
        submitForm(values, resetForm);
      }}
    >
      {({ values, handleChange, handleSubmit, resetForm }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3} sx={{ p: 2 }}>
            {/* Left Section */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="company_name"
                label="Company Name"
                value={values.company_name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                name="designation"
                label="Designation"
                value={values.designation}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                name="from_date"
                label="From Date"
                type="date"
                value={values.from_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                name="to_date"
                label="To Date"
                type="date"
                value={values.to_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                name="numberof_projects"
                label="No of Projects Worked"
                value={values.numberof_projects}
                onChange={handleChange}
                type="number"
                variant="outlined"
                margin="normal"
              />
            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="color_code"
                label="Color for This Work"
                value={values.color_code}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                name="comp_seq"
                label="Sequence No for Company"
                value={values.comp_seq}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                name="company_code"
                label="Code for Company"
                value={values.company_code}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <Box display="flex" justifyContent="center" gap={2} mt={4}>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    resetForm();
                    setInitialValues({});
                  }}
                >
                  Reset
                </Button>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default WorkedCompaniesEntry;
