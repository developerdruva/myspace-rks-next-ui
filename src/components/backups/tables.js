const filteredData = useMemo(() => {
  return workedProjects.filter((p) =>
    `${p.project_name} ${p.client_name} ${p.role_name} ${p.tech_stack}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );
}, [searchText, workedProjects]);

// const columns = [
//   { field: "company_name", headerName: "Company", flex: 1 },

//   { field: "project_name", headerName: "Project Name", flex: 1 },
//   {
//     field: "duration",
//     headerName: "Duration",
//     flex: 1,
//     renderCell: (params) => {
//       const { years, months, days } = getDateDurationbtPeriod(
//         params?.row?.from_date,
//         params?.row?.to_date
//       );
//       return <div>{`${years} years, ${months} months, ${days} days`}</div>;
//     },
//   },
// ];

// MUI DataGrid needs id field for each row
// const rows = filteredData.map((r, index) => ({ id: index + 1, ...r }));
{
  /**
   * 
   *  {
      field: "action",
      headerName: "Action",
      flex: 0.4,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          startIcon={<MdEdit />}
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
   */
}
