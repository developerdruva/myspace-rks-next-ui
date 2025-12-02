"use client";
import { useEffect, useState } from "react";
import { Button, Grid, TextField, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import apiServices from "@/utils/service-calls/apiServices";
import {
  getPortfolioDetails,
  showAlertNotice,
} from "../../common/CommonFunction";
import dayjs from "dayjs";

const WorkedCompaniesEntry = ({
  setShowAddModal,
  compEditRecord,
  isCompEdit,
  setIsCompEdit,
}) => {
  const personDetails =
    useSelector((state) => state?.portfolioState?.personDetails[0]) || null;

  const [isOriginalDates, setIsOriginalDates] = useState(false);

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
    o_from: "",
    o_to: "",
  });

  useEffect(() => {
    if (isCompEdit && compEditRecord && !initialValues.from_date) {
      setInitialValues({
        ...compEditRecord,
        from_date: compEditRecord?.from_date
          ? dayjs(compEditRecord.from_date).format("YYYY-MM-DD")
          : "",
        to_date: compEditRecord?.to_date
          ? dayjs(compEditRecord.to_date).format("YYYY-MM-DD")
          : "",
        o_from: compEditRecord?.o_from
          ? dayjs(compEditRecord.o_from).format("YYYY-MM-DD")
          : "",
        o_to: compEditRecord?.o_to
          ? dayjs(compEditRecord.o_to).format("YYYY-MM-DD")
          : "",
      });
    }
  }, [isCompEdit, compEditRecord]);

  const submitForm = (values) => {
    values.email_id = personDetails?.email_id; // always auto-fill

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
      onSubmit={(values) => submitForm(values)}
    >
      {({ values, handleChange, handleSubmit, setFieldValue, resetForm }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3} sx={{ p: 2 }}>
            {/* Left Column */}
            <Grid item size={{ xs: 2, sm: 2, md: 3, lg: 6, xl: 6 }}>
              <TextField
                fullWidth
                name="company_name"
                label="Company Name"
                value={values.company_name}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                name="designation"
                label="Designation"
                value={values.designation}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                name="from_date"
                label="From Date"
                type="date"
                value={values.from_date}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("o_from", e.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />

              <TextField
                fullWidth
                name="to_date"
                label="To Date"
                type="date"
                value={values.to_date}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("o_to", e.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />

              <TextField
                fullWidth
                name="numberof_projects"
                type="number"
                label="No of Projects Worked"
                value={values.numberof_projects}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            {/* Right Column */}
            <Grid item size={{ xs: 2, sm: 2, md: 3, lg: 6, xl: 6 }}>
              <TextField
                fullWidth
                name="color_code"
                label="Color for This Work"
                value={values.color_code}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                name="comp_seq"
                label="Sequence No"
                value={values.comp_seq}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                name="company_code"
                label="Code for Company"
                value={values.company_code}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                name="o_from"
                label="Original From"
                type="date"
                value={values.o_from}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />

              <TextField
                fullWidth
                name="o_to"
                label="Original To"
                type="date"
                value={values.o_to}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Grid>
            {/* Buttons Bottom Center */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    resetForm();
                    setShowAddModal(false);
                  }}
                >
                  Close
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
