import {
  colorToRGBA,
  dateFormatMonthYear,
  getDateDurationbtPeriod,
} from "../CommonFunction";
import styles from "./manualtable.module.css";

const ManualTable = ({ columns, rows }) => {
  let duplicates = rows.map((item) => item.company_code);
  let uniques = [...new Set(duplicates)];
  let rowChecks = uniques.map((item) => ({
    [item]: duplicates.filter((it) => it === item).length,
  }));
  let rowsChecked = [];

  return (
    rowChecks && (
      <table className={styles.table}>
        <thead>
          <tr>
            {columns?.map((col, index) =>
              col.isSub ? null : (
                <th
                  key={col.label + index}
                  colSpan={col.colSpan}
                  rowSpan={col.rowSpan}
                  style={col.styles}
                  width={col.width}
                  align={col.align}
                  className={styles.headerCell}
                >
                  {col.label}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {rows?.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {!rowsChecked.includes(row.company_code) && (
                  <td
                    rowSpan={
                      rowChecks.find((item) => item[row.company_code])[
                        row.company_code
                      ]
                    }
                    className={styles.firstColumn}
                    style={{
                      backgroundColor: colorToRGBA(row.color_code, 0.4),
                    }}
                  >
                    {row.company_code}
                    {rowsChecked.push(row.company_code) && null}
                  </td>
                )}

                {columns?.map((col, colIndex) => {
                  if (col.rowSpan && rowIndex > 0) return null;
                  if (colIndex === 0) return null;
                  return (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className={styles.rowCell}
                    >
                      {getFilteredField(col, row)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  );
};

export default ManualTable;

const getRowSpanRecord = (
  row,
  checkedRows,
  setCheckedRows,
  rowChecks,
  rowIndex
) => {
  console.log(" checked rows  rowIndex", checkedRows, rowIndex);

  //   setCheckedRows((prev) => [...prev, row.company_code]);
  //   let temp = rowChecks.find((item) => item[row.company_code])[row.company_code];
  //   console.log(" temp in func ", temp);
  //   return temp;
};

const getFilteredField = (col, row) => {
  if (col.isDate) {
    return dateFormatMonthYear(row[col.id] ?? "-");
  } else if (col.isTenure) {
    return getSwitchCase(col, row);
  } else {
    return row[col.id] ?? "-";
  }
};

const getSwitchCase = (col, row) => {
  switch (col.id) {
    case "o_years":
      return (
        <div style={{ textAlign: "right", fontWeight: "bold" }}>
          {getDateDurationbtPeriod(row.o_from, row.o_to)?.years}
        </div>
      );

    case "o_months":
      return (
        <div style={{ textAlign: "right", fontWeight: "bold" }}>
          {getDateDurationbtPeriod(row.o_from, row.o_to)?.months}
        </div>
      );

    case "years":
      return (
        <div style={{ textAlign: "right", fontWeight: "bold" }}>
          {getDateDurationbtPeriod(row.from_date, row.to_date)?.years}
        </div>
      );

    case "months":
      return (
        <div style={{ textAlign: "right", fontWeight: "bold" }}>
          {getDateDurationbtPeriod(row.from_date, row.to_date)?.months}
        </div>
      );
  }
};
