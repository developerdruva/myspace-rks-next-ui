"use client";
import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Grid,
  // TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useSelector } from "react-redux";

// Dummy Companies List (Replace with your API or Redux data)
const companies = [
  { name: "Bristlecone India", code: "BCONE" },
  { name: "Taxilla IT Solutions", code: "TAXILLA" },
  { name: "GSS InfoTech Pvt Ltd", code: "GSS" },
  { name: "TryLogic Soft Solutions", code: "INTERN" },
];

const ProjectEntryForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  company,
  projects,
}) => {
  const personDetails =
    useSelector((state) => state?.portfolioState?.personDetails[0]) || {};

  const initialValues = initialData || {
    company_name: company?.company_name || "",
    project_name: "",
    client_name: "",
    project_code: "",
    project_shortname: "",
    project_desc: "",
    role_name: "",
    industry_type: "",
    responsibilities: "",
    from_date: "",
    to_date: "",
    tech_stack: "",
    display_no: projects?.length + 1 || 1,
    project_type: "",
    company_code: "",
    email_id: personDetails?.email_id || "",
    o_from: "",
    o_to: "",
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Company is required"),
    project_name: Yup.string().required("Project Name is required"),
    client_name: Yup.string().required("Client Name is required"),
    project_code: Yup.string().required("Project Code is required"),
    project_desc: Yup.string().required("Project Description is required"),
    role_name: Yup.string().required("Role Name is required"),
    industry_type: Yup.string().required("Industry Type is required"),
    responsibilities: Yup.string().required("Responsibilities are required"),
    from_date: Yup.date().required("From Date is required"),
    to_date: Yup.date()
      .required("To Date is required")
      .min(Yup.ref("from_date"), "To Date cannot be before From Date"),
    tech_stack: Yup.string().required("Tech Stack is required"),
    display_no: Yup.number()
      .typeError("Display No must be a number")
      .required("Display No is required"),
    project_type: Yup.string().required("Project Type is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const selectedCompany = companies.find(
          (c) => c.name === values.company_name
        );
        if (selectedCompany) {
          values.company_code = selectedCompany.code;
        }
        onSubmit(values);
        resetForm();
      }}
    >
      {({
        handleSubmit,
        errors,
        touched,
        handleChange,
        values,
        setFieldValue,
      }) => (
        <div>
          <Form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* LEFT SIDE */}
              <Grid item size={{ xs: 2, sm: 2, md: 3, lg: 6, xl: 6 }}>
                {/* Company Name (disabled dropdown) */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Company Name</InputLabel>
                  <Select
                    name="company_name"
                    label="Company Name"
                    value={values.company_name}
                    onChange={(e) => {
                      handleChange(e);
                      const selected = companies.find(
                        (c) => c.name === e.target.value
                      );
                      setFieldValue("company_code", selected?.code || "");
                    }}
                    disabled
                  >
                    <MenuItem value="">Select Company</MenuItem>
                    {companies.map((company, idx) => (
                      <MenuItem key={idx} value={company.name}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.company_name && errors.company_name && (
                    <span style={{ color: "red" }}>{errors.company_name}</span>
                  )}
                </FormControl>

                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Project Name"
                  name="project_name"
                  error={touched.project_name && Boolean(errors.project_name)}
                  helperText={touched.project_name && errors.project_name}
                />

                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Client Name"
                  name="client_name"
                  error={touched.client_name && Boolean(errors.client_name)}
                  helperText={touched.client_name && errors.client_name}
                />

                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Project Code"
                  name="project_code"
                  error={touched.project_code && Boolean(errors.project_code)}
                  helperText={touched.project_code && errors.project_code}
                />

                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Project Short Name"
                  name="project_shortname"
                />

                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Role Name"
                  name="role_name"
                  error={touched.role_name && Boolean(errors.role_name)}
                  helperText={touched.role_name && errors.role_name}
                />
                <Field
                  as={TextField}
                  type="date"
                  fullWidth
                  margin="normal"
                  label="From Date"
                  name="from_date"
                  InputLabelProps={{ shrink: true }}
                  error={touched.from_date && Boolean(errors.from_date)}
                  helperText={touched.from_date && errors.from_date}
                />

                <Field
                  as={TextField}
                  type="date"
                  fullWidth
                  margin="normal"
                  label="To Date"
                  name="to_date"
                  InputLabelProps={{ shrink: true }}
                  error={touched.to_date && Boolean(errors.to_date)}
                  helperText={touched.to_date && errors.to_date}
                />
              </Grid>

              {/* RIGHT SIDE */}
              <Grid item size={{ xs: 2, sm: 2, md: 3, lg: 6, xl: 6 }}>
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Industry Type"
                  name="industry_type"
                  error={touched.industry_type && Boolean(errors.industry_type)}
                  helperText={touched.industry_type && errors.industry_type}
                />

                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Tech Stack"
                  name="tech_stack"
                  error={touched.tech_stack && Boolean(errors.tech_stack)}
                  helperText={touched.tech_stack && errors.tech_stack}
                />

                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Display No"
                  name="display_no"
                  error={touched.display_no && Boolean(errors.display_no)}
                  helperText={touched.display_no && errors.display_no}
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel>Project Type</InputLabel>
                  <Select
                    name="project_type"
                    label="Project Type"
                    value={values.project_type}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="ui">UI</MenuItem>
                    <MenuItem value="fullstack">Fullstack</MenuItem>
                    <MenuItem value="testing">Testing</MenuItem>
                    <MenuItem value="NA">NA</MenuItem>
                  </Select>
                  {touched.project_type && errors.project_type && (
                    <span style={{ color: "red" }}>{errors.project_type}</span>
                  )}
                  <Field
                    as={TextField}
                    type="date"
                    fullWidth
                    margin="normal"
                    label="Original From"
                    name="o_from"
                    InputLabelProps={{ shrink: true }}
                  />

                  <Field
                    as={TextField}
                    type="date"
                    fullWidth
                    margin="normal"
                    label="Original To"
                    name="o_to"
                    InputLabelProps={{ shrink: true }}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Responsibilities"
                    name="responsibilities"
                    multiline
                    rows={3}
                    error={
                      touched.responsibilities &&
                      Boolean(errors.responsibilities)
                    }
                    helperText={
                      touched.responsibilities && errors.responsibilities
                    }
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Project Description"
                    name="project_desc"
                    multiline
                    rows={3}
                    error={touched.project_desc && Boolean(errors.project_desc)}
                    helperText={touched.project_desc && errors.project_desc}
                  />
                </FormControl>

                {/* hidden */}
                <Field type="hidden" name="email_id" />
              </Grid>
            </Grid>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default ProjectEntryForm;
