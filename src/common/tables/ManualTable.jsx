import styles from "./manualtable.module.css";

const ManualTable = ({ columns, rows }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns?.map((col, index) => (
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
          ))}
        </tr>
      </thead>

      <tbody>
        {rows?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns?.map((col, colIndex) => {
              // if rowSpan > 1 and not the first row → skip cell
              if (col.rowSpan && rowIndex > 0) return null;

              return (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  colSpan={col.colSpan}
                  rowSpan={col.rowSpan}
                  className={styles.rowCell}
                >
                  {row[col.id] ?? "-"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManualTable;
