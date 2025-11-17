"use client";
import { Formik, Form, Field } from "formik";
import { Container, Button } from "@mui/material";
import axios from "axios";

const ProfileForm = () => {
  const initialValues = {
    first_name: "",
    last_name: "",
    roleof_person: "",
    mobile_no: "",
    email_id: "",
    created_ip: "127.0.0.1",
    created_at: new Date().toISOString(),
    welcome_text: "",
    person_designation: "",
    profile_pic: "",
    resume: "",
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:4000/api/person/add", values);
      alert("Saved Successfully");
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }
  };

  return (
    <Container>
      <h2 className="my-3">Insert Profile</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            name="first_name"
            className="form-control mb-2"
            placeholder="First Name"
          />
          <Field
            name="last_name"
            className="form-control mb-2"
            placeholder="Last Name"
          />
          <Field
            name="roleof_person"
            className="form-control mb-2"
            placeholder="Role"
          />
          <Field
            name="mobile_no"
            className="form-control mb-2"
            placeholder="Mobile No"
          />
          <Field
            name="email_id"
            className="form-control mb-2"
            placeholder="Email"
          />
          <Field
            name="person_designation"
            className="form-control mb-2"
            placeholder="Designation"
          />
          <Field
            name="profile_pic"
            className="form-control mb-2"
            placeholder="Profile Pic URL"
          />
          <Field
            name="resume"
            className="form-control mb-2"
            placeholder="Resume URL"
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default ProfileForm;
