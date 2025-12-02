"use client";
import { getTableCellStyles } from "@/common/CommonFunction";
import ManualTable from "@/common/tables/ManualTable";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { MdAddTask } from "react-icons/md";
import { useSelector } from "react-redux";

const ExperienceCalc = () => {
  const portfolioDetails = useSelector((state) => state.portfolioState);
  const workedProjects = portfolioDetails?.workedProjects || [];
  const workedCompanies = portfolioDetails?.workedCompanies || [];

  const [searchText, setSearchText] = useState("");

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 3,
          pb: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Worked Companies and Projects
        </Typography>

        <Tooltip title="Add Project">
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
          placeholder="Search by project, role, client, tech stack…"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      <ManualTable columns={columns} rows={rows} />
    </Box>
  );
};

export default ExperienceCalc;

const rows = [
  {
    company_name: "Taxilla IT Solutions",
    project_name: "client1",
    client_name: "abcd10",
    from_date: "2021-02-01",
    to_date: "2021-07-10",
    display_no: 8,
    project_type: "ui",
    original_start: "",
    original_end: "",
    duration: "",
    original_duration: "",
  },
];

const columns = [
  {
    label: "Company",
    id: "company_name",
    colSpan: 2,
    styles: { backgroundColor: "CadetBlue", color: "#fff" },
    align: "center",
  },

  // PROJECT SIDE
  {
    label: "Project Name",
    id: "project_name",
    colSpan: 1,
    styles: { backgroundColor: "slategrey", color: "#fff" },
    align: "center",
  },
  {
    label: "Client Name",
    id: "client_name",
    colSpan: 1,
    styles: { backgroundColor: "slategrey", color: "#fff" },
    align: "center",
  },
  {
    label: "Project Type",
    id: "project_type",
    colSpan: 1,
    styles: { backgroundColor: "slategrey", color: "#fff" },
    align: "center",
  },
  // ORIGINAL
  {
    label: "Original Start",
    id: "original_start",
    colSpan: 1,
    styles: { backgroundColor: "CadetBlue", color: "#fff" },
    align: "center",
  },
  {
    label: "Original End",
    id: "original_end",
    colSpan: 1,
    styles: { backgroundColor: "CadetBlue", color: "#fff" },
    align: "center",
  },
  {
    label: "Original Duration",
    id: "duration",
    colSpan: 1,
    styles: { backgroundColor: "CadetBlue", color: "#fff" },
    align: "center",
  },

  // DURATION SIDE
  {
    label: "Start",
    id: "from_date",
    colSpan: 1,
    styles: { backgroundColor: "SteelBlue", color: "#fff" },
    align: "center",
  },
  {
    label: "End",
    id: "to_date",
    colSpan: 1,
    styles: { backgroundColor: "SteelBlue", color: "#fff" },
    align: "center",
  },
  {
    label: "Duration",
    id: "duration",
    colSpan: 1,
    styles: { backgroundColor: "SteelBlue", color: "#fff" },
    align: "center",
  },
];
