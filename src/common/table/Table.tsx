import "@src/common/table/Table.scss";

type ColumnDefinition<T> = {
  name: string;
  render?: (row: T, index: number, allRows: T[]) => React.ReactNode;
};

export function Table<T>(props: {
  data: T[] | undefined;
  columns: ColumnDefinition<T>[];
  style?: React.CSSProperties;
  cellStyle?: (
    columnIndex: number,
    row: T,
    rowIndex: number,
    allRows: T[]
  ) => React.CSSProperties | undefined;
  className?: string;
  cellClass?: (
    columnIndex: number,
    row: T,
    rowIndex: number,
    allRows: T[]
  ) => string;
}) {
  return (
    <table style={props.style} className={`table ${props.className ?? ""}`}>
      <thead>
        <tr className="header">
          {props.columns.map((c, idx) => (
            <th className="cell" key={idx}>
              {c.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="body">
        {props.data?.map((row, rowIdx, all) => (
          <tr className="row" key={rowIdx}>
            {props.columns.map((c, colIdx) => (
              <td
                style={props.cellStyle?.(colIdx, row, rowIdx, all)}
                className="cell"
                key={colIdx}
              >
                {c.render?.(row, rowIdx, all)}
              </td>
            ))}
          </tr>
        )) ?? (
          <tr>
            <td className="cell" colSpan={props.columns.length}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
