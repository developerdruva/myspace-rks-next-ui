import {
  commonDateFormat,
  dateFormatMonthYear,
  getDateDurationbtPeriod,
} from "../../common/CommonFunction";

export const workedCompColumns = [
  //   {
  //     title: "Sl. No",
  //     key: "sl_no",
  //     render: (_, __, index) => index + 1,
  //     sorter: (a, b) => a.sl_no - b.sl_no,
  //   },
  {
    title: "Company ",
    dataIndex: "company_name",
    key: "company_name",
    sorter: (a, b) => a.company_name.localeCompare(b.company_name),
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    sorter: (a, b) => a.designation.localeCompare(b.designation),
  },
  {
    title: "From Date",
    dataIndex: "from_date",
    key: "from_date",
    render: (date) => dateFormatMonthYear(date),
    sorter: (a, b) => new Date(a.from_date) - new Date(b.from_date),
  },
  {
    title: "To Date",
    dataIndex: "to_date",
    key: "to_date",
    render: (date) => dateFormatMonthYear(date),
    sorter: (a, b) => new Date(a.to_date) - new Date(b.to_date),
  },
  {
    title: "Duration",
    key: "duration",
    render: (_, row) => {
      const { years, months } = getDateDurationbtPeriod(
        row.from_date,
        row.to_date
      );
      return `${years || 0}.${months || 0} years`;
    },
    sorter: (a, b) => {
      const aDuration = getDateDurationbtPeriod(a.from_date, a.to_date);
      const bDuration = getDateDurationbtPeriod(b.from_date, b.to_date);
      return (
        aDuration.years * 12 +
        aDuration.months -
        (bDuration.years * 12 + bDuration.months)
      );
    },
  },
  {
    title: "No. of Projects",
    dataIndex: "numberof_projects",
    key: "numberof_projects",
    sorter: (a, b) => a.numberof_projects - b.numberof_projects,
  },
  {
    title: "Seq. No",
    dataIndex: "comp_seq",
    key: "comp_seq",
    sorter: (a, b) => a.comp_seq - b.comp_seq,
  },
  //   {
  //     title: "Company Code",
  //     dataIndex: "company_code",
  //     key: "company_code",
  //     sorter: (a, b) => a.company_code.localeCompare(b.company_code),
  //   },
];
