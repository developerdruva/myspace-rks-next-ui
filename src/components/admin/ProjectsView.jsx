"use client";
import { useState } from "react";
import {
  Drawer,
  Typography,
  Chip,
  Divider,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { colorToRGBA, showApiStatusNotice } from "@/common/CommonFunction";
import ProjectEntryForm from "../in-taking/ProjectEntryForm";
import apiServices from "@/utils/service-calls/apiServices";

const ProjectsDrawer = ({
  visible,
  onClose,
  projects: propProjects,
  company,
}) => {
  const dispatch = useDispatch();
  const allProjects =
    useSelector((state) => state.portfolioState?.workedProjects) || [];
  const projects = propProjects?.length ? propProjects : allProjects;

  const [showAddModal, setShowAddModal] = useState(false);
  const [isCompEdit, setIsCompEdit] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEdit = (record) => {
    setSelectedProject(record);
    setIsCompEdit(true);
    setShowAddModal(true);
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setIsCompEdit(false);
    setShowAddModal(true);
  };

  const uniqueRoles = [...new Set(projects.map((p) => p.role_name))];

  const handleFormSubmit = async (values) => {
    try {
      const apiCall = isCompEdit
        ? apiServices.updateProject(selectedProject.sl_no, values)
        : apiServices.addProject(values);

      const apiRes = await apiCall;

      if (apiRes?.data?.status === "success") {
        showApiStatusNotice(apiRes?.data?.message, "success");
        setShowAddModal(false);

        const expRes = await apiServices.getExperienceDetails(values.email_id);
        if (expRes?.data?.status === "success") {
          dispatch({
            type: "PORTFOLIO_DETAILS",
            payload: { workedProjects: expRes?.data?.projects },
          });
        }
      } else {
        showApiStatusNotice(apiRes?.data?.message || "API Error", "error");
      }
    } catch (error) {
      showApiStatusNotice(
        error?.response?.data?.message || error.message,
        "error"
      );
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={visible}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 900,
            mt: "64px",
            height: "calc(100vh - 64px)",
            px: 3,
            py: 2,
          },
        }}
      >
        <Box>
          {company && (
            <Chip
              label={company.company_name}
              style={{
                backgroundColor: colorToRGBA(company?.color_code, 0.2),
                color: company.color_code,
                fontSize: "1.2rem",
                padding: "8px 12px",
                marginBottom: "1rem",
              }}
            />
          )}

          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Designation:</strong> {company?.designation || "N/A"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Projects Count:</strong> {projects.length}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Roles:</strong> {uniqueRoles.join(", ") || "N/A"}
            </Typography>
          </Paper>

          <Divider sx={{ my: 2 }}>
            <Typography variant="h6">Projects</Typography>
          </Divider>

          <Box textAlign="right" mb={2}>
            <Button variant="contained" onClick={handleAdd}>
              + Add Project
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Tech Stack</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((proj) => (
                  <TableRow key={proj.sl_no}>
                    <TableCell>{proj.project_name}</TableCell>
                    <TableCell>{proj.client_name}</TableCell>
                    <TableCell>{proj.role_name}</TableCell>
                    <TableCell>
                      {proj.from_date} to {proj.to_date}
                    </TableCell>
                    <TableCell>{proj.tech_stack}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleEdit(proj)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Drawer>

      <Dialog
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{isCompEdit ? "Edit Project" : "Add Project"}</DialogTitle>
        <DialogContent dividers>
          <ProjectEntryForm
            initialData={selectedProject}
            company={company}
            projects={projects}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsDrawer;
