"use client";
import { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Button, Grid as GridCol, TextField } from "@mui/material";
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
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Select
                  name="company_name"
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
                  <option value="">Select Company</option>
                  {companies.map((company, idx) => (
                    <option key={idx} value={company.name}>
                      {company.name}
                    </option>
                  ))}
                </Form.Select>
                {touched.company_name && errors.company_name && (
                  <div className="text-danger">{errors.company_name}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Project Name</Form.Label>
                <Field name="project_name" className="form-control" />
                {touched.project_name && errors.project_name && (
                  <div className="text-danger">{errors.project_name}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Client Name</Form.Label>
                <Field name="client_name" className="form-control" />
                {touched.client_name && errors.client_name && (
                  <div className="text-danger">{errors.client_name}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Project Code</Form.Label>
                <Field name="project_code" className="form-control" />
                {touched.project_code && errors.project_code && (
                  <div className="text-danger">{errors.project_code}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Project Short Name</Form.Label>
                <Field name="project_shortname" className="form-control" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Project Description</Form.Label>
                <Field
                  name="project_desc"
                  as="textarea"
                  rows={3}
                  className="form-control"
                />
                {touched.project_desc && errors.project_desc && (
                  <div className="text-danger">{errors.project_desc}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role Name</Form.Label>
                <Field name="role_name" className="form-control" />
                {touched.role_name && errors.role_name && (
                  <div className="text-danger">{errors.role_name}</div>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Industry Type</Form.Label>
                <Field name="industry_type" className="form-control" />
                {touched.industry_type && errors.industry_type && (
                  <div className="text-danger">{errors.industry_type}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Responsibilities</Form.Label>
                <Field
                  name="responsibilities"
                  as="textarea"
                  rows={3}
                  className="form-control"
                />
                {touched.responsibilities && errors.responsibilities && (
                  <div className="text-danger">{errors.responsibilities}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>From Date</Form.Label>
                <Field type="date" name="from_date" className="form-control" />
                {touched.from_date && errors.from_date && (
                  <div className="text-danger">{errors.from_date}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>To Date</Form.Label>
                <Field type="date" name="to_date" className="form-control" />
                {touched.to_date && errors.to_date && (
                  <div className="text-danger">{errors.to_date}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tech Stack</Form.Label>
                <Field name="tech_stack" className="form-control" />
                {touched.tech_stack && errors.tech_stack && (
                  <div className="text-danger">{errors.tech_stack}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Display No</Form.Label>
                <Field
                  name="display_no"
                  className="form-control"
                  // value={projects?.length + 1}
                />
                {touched.display_no && errors.display_no && (
                  <div className="text-danger">{errors.display_no}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Project Type</Form.Label>
                <Field as="select" name="project_type" className="form-control">
                  <option value="">Select Type</option>
                  <option value="ui">UI</option>
                  <option value="fullstack">Fullstack</option>
                  <option value="testing">Testing</option>
                  <option value="NA">NA</option>
                </Field>
                {touched.project_type && errors.project_type && (
                  <div className="text-danger">{errors.project_type}</div>
                )}
              </Form.Group>

              {/* Hidden Email Field */}
              <Field type="hidden" name="email_id" />
            </Col>
          </Row>

          <div className="d-flex justify-content-center gap-3">
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectEntryForm;
