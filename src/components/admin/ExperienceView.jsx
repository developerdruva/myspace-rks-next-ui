"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  TextField,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { MdAddTask, MdDelete, MdEdit } from "react-icons/md";
import { BsViewList } from "react-icons/bs";
import { useSelector } from "react-redux";
import WorkedCompaniesEntry from "../in-taking/WorkedCompaniesEntry";
import ProjectsView from "./ProjectsView";
import apiServices from "@/utils/service-calls/apiServices";
import { getPortfolioDetails, showAlertNotice } from "@/common/CommonFunction";

// --------------------------------------------------
// COLUMN BUILDER
// --------------------------------------------------
const mapColumnsToMUI = (
  columns,
  handleViewProjects,
  handleEdit,
  handleDelete
) => {
  return [
    ...columns,
    {
      field: "project",
      headerName: "Projects",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="View Projects">
          <IconButton
            onClick={() => handleViewProjects(params.row)}
            color="primary"
          >
            <BsViewList />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)} color="primary">
              <MdEdit />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row)} color="error">
              <MdDelete />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
};

const ExperienceView = () => {
  const portfolioDetails = useSelector((state) => state.portfolioState);
  const workedCompanies = portfolioDetails?.workedCompanies || [];
  const workedProjects = portfolioDetails?.workedProjects || [];

  const [showAddModal, setShowAddModal] = useState(false);
  const [isCompEdit, setIsCompEdit] = useState(false);
  const [compEditRecord, setCompEditRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyProjects, setCompanyProjects] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  // -----------------------------------------------
  // DELETE DIALOG STATES
  // -----------------------------------------------
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // -----------------------------------------------
  // VIEW PROJECTS
  // -----------------------------------------------
  const handleViewProjects = (company) => {
    const projects = workedProjects.filter(
      (proj) => proj.company_code === company.company_code
    );
    setCompanyProjects(projects);
    setSelectedCompany(company);
    setDrawerOpen(true);
  };

  // -----------------------------------------------
  // EDIT RECORD
  // -----------------------------------------------
  const handleEdit = (row) => {
    setIsCompEdit(true);
    setCompEditRecord(row);
    setShowAddModal(true);
  };

  // -----------------------------------------------
  // DELETE FLOW — OPEN CONFIRMATION
  // -----------------------------------------------
  const handleDelete = (row) => {
    setSelectedRecord(row);
    setOpenDeleteDialog(true);
  };

  // -----------------------------------------------
  // DELETE CONFIRM
  // -----------------------------------------------
  const confirmDelete = () => {
    const id = selectedRecord?.sl_no;

    apiServices.deleteCompRecord(id).then((res) => {
      if (res?.data?.status === "success") {
        showAlertNotice(res?.data?.message, "success").then(() => {
          getPortfolioDetails();
        });
      } else {
        showAlertNotice(res?.data?.message, "error");
      }
    });

    setOpenDeleteDialog(false);
    setSelectedRecord(null);
  };

  // -----------------------------------------------
  // SEARCH FILTER
  // -----------------------------------------------
  const filteredData = workedCompanies.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // -----------------------------------------------
  // TABLE COLUMNS
  // -----------------------------------------------
  const columns = mapColumnsToMUI(
    [
      { field: "company_name", headerName: "Company Name", width: 200 },
      { field: "designation", headerName: "Designation", width: 160 },
      { field: "location", headerName: "Location", width: 140 },
      { field: "duration", headerName: "Duration", width: 120 },
    ],
    handleViewProjects,
    handleEdit,
    handleDelete
  );

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          pt: 3,
          pb: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Worked Companies and Projects
        </Typography>

        <Tooltip title="Add Company">
          <Button
            variant="contained"
            size="small"
            startIcon={<MdAddTask />}
            onClick={() => {
              setShowAddModal(true);
              setCompEditRecord(null);
              setIsCompEdit(false);
            }}
          >
            Add
          </Button>
        </Tooltip>
      </Box>

      {/* SEARCH */}
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search Companies, Designations, etc."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      {/* TABLE */}
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          overflow: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f0f2f5" }}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.field}
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                    minWidth: col.width,
                  }}
                >
                  {col.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.sl_no} style={{ borderBottom: "1px solid #f0f0f0" }}>
                {columns.map((col) => (
                  <td
                    key={col.field}
                    style={{ padding: "10px", verticalAlign: "top" }}
                  >
                    {col.renderCell
                      ? col.renderCell({ row })
                      : row[col.field] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* PROJECT DRAWER */}
      <ProjectsView
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        projects={companyProjects}
        company={selectedCompany}
      />

      {/* ADD / EDIT MODAL */}
      <Dialog
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setIsCompEdit(false);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isCompEdit
            ? "Edit Worked Company or Project"
            : "Add Worked Company or Project"}
        </DialogTitle>

        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={(e, newVal) => setTabValue(newVal)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Worked Companies" />
              <Tab label="Worked Projects" disabled />
            </Tabs>
          </Box>

          <Box sx={{ mt: 2 }}>
            {tabValue === 0 && (
              <WorkedCompaniesEntry
                setShowAddModal={setShowAddModal}
                compEditRecord={compEditRecord}
                isCompEdit={isCompEdit}
                setIsCompEdit={setIsCompEdit}
              />
            )}

            {tabValue === 1 && (
              <Typography>Projects form coming soon...</Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      {/* -------------------------------------------------- */}
      {/* DELETE CONFIRMATION DIALOG */}
      {/* -------------------------------------------------- */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Worked Company?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            This action cannot be undone.
            <br />
            {selectedRecord && (
              <strong>
                <br />
                Company: {selectedRecord.company_name}
              </strong>
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>

          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExperienceView;
