"use client";
import {
  getDateDurationbtPeriod,
  getTableCellStyles,
  getTotalExperience,
} from "@/common/CommonFunction";
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
      (it) => it?.company_code === item?.company_code,
    );
    return { ...item, color_code: temp?.color_code };
  });

  return (
    <Box>
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
            Create New
          </Button>
        </Tooltip>
      </Box>

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
      <SummaryTable
        columns={columns}
        rows={filterRows}
        companies={workedCompanies}
      />
      <ManualTable columns={columns} rows={filterRows} />
    </Box>
  );
};

export default ExperienceCalc;

const SummaryTable = ({ columns, rows, companies }) => {
  const totalExperience = getTotalExperience(rows, "o_from", "o_to");
  const totalExperienceCalc = getTotalExperience(rows, "from_date", "to_date");
  return (
    <Box
      sx={{
        overflowX: "auto",
        justifyContent: "space-between",
        display: "flex",
      }}
    >
      <div>
        <Typography
          variant="caption"
          color="text.secondary"
          mb={1}
          display="block"
        >
          Total Companies: {companies?.length || 0} | Total Projects:{" "}
          {rows?.length || 0}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          mb={2}
          display="block"
        >
          * Durations are calculated based on project start and end dates.
        </Typography>
      </div>
      <div>
        <Typography
          variant="caption"
          color="text.secondary"
          mb={1}
          display="block"
        >
          Total Experience : {totalExperience.years} years{" "}
          {totalExperience.months} months
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          mb={2}
          display="block"
        >
          Total Calculated Experience: {totalExperienceCalc.years} years{" "}
          {totalExperienceCalc.months} months
        </Typography>
      </div>
    </Box>
  );
};

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
