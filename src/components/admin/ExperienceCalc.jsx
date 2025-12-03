"use client";
import { getTableCellStyles } from "@/common/CommonFunction";
import ManualTable from "@/common/tables/ManualTable";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MdAddTask } from "react-icons/md";
import { useSelector } from "react-redux";

const ExperienceCalc = () => {
  const portfolioDetails = useSelector((state) => state.portfolioState);
  const rows = portfolioDetails?.workedProjects || [];
  const workedCompanies = portfolioDetails?.workedCompanies || [];

  const [searchText, setSearchText] = useState("");

  let filterRows = rows.map((item) => {
    let temp = workedCompanies.find(
      (it) => it?.company_code === item?.company_code
    );
    return { ...item, color_code: temp?.color_code };
  });

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

      <ManualTable columns={columns} rows={filterRows} />
    </Box>
  );
};

export default ExperienceCalc;

const columns = [
  {
    label: "Company",
    id: "company_name",
    colSpan: 1,
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
    label: "O_From",
    id: "o_from",
    colSpan: 1,
    styles: { backgroundColor: "CadetBlue", color: "#fff" },
    isDate: true,
    align: "center",
  },
  {
    label: "O_To",
    id: "o_to",
    colSpan: 1,
    styles: { backgroundColor: "CadetBlue", color: "#fff" },
    align: "center",
    isDate: true,
  },
  {
    label: "O_Duration",
    id: "o_years",
    colSpan: 2,
    styles: { backgroundColor: "CadetBlue", color: "#fff" },
    align: "center",
    isTenure: true,
    // isSub: true,
  },
  {
    label: "O_Duration",
    id: "o_months",
    colSpan: 1,
    styles: { backgroundColor: "CadetBlue", color: "#fff" },
    align: "center",
    isTenure: true,
    isSub: true,
  },

  // DURATION SIDE
  {
    label: "From",
    id: "from_date",
    colSpan: 1,
    styles: { backgroundColor: "SteelBlue", color: "#fff" },
    isDate: true,
    align: "center",
  },
  {
    label: "To",
    id: "to_date",
    colSpan: 1,
    styles: { backgroundColor: "SteelBlue", color: "#fff" },
    isDate: true,
    align: "center",
  },
  {
    label: "Duration",
    id: "years",
    colSpan: 2,
    styles: { backgroundColor: "SteelBlue", color: "#fff" },
    align: "center",
    isTenure: true,
  },
  {
    label: "Duration",
    id: "months",
    colSpan: 1,
    styles: { backgroundColor: "CadetBlue", color: "#fff" },
    align: "center",
    isSub: true,
    isTenure: true,
  },
];
