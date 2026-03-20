"use client";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const DataTableMUIX = ({ rows, columns, height = 480, pageSize = 5 }) => {
  return (
    <Paper
      elevation={3}
      sx={{ height, width: "100%", borderRadius: 2, overflow: "hidden", p: 1 }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize } },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        autoHeight={false}
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#fafafa",
          },
        }}
      />
    </Paper>
  );
};

export default DataTableMUIX;
