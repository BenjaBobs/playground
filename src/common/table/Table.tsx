import "@src/common/table/Table.scss";

type ColumnDefinition<T> = {
  name: React.ReactNode;
  width?: string | number;
  render?: (row: T, index: number, allRows: T[]) => React.ReactNode;
};

export function Table<T>(props: {
  data: T[] | undefined;
  rowKey: (row: T) => string;
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
  const totalWidth = props.columns.reduce(
    (acc, c) => acc + (typeof c.width === "number" ? c.width : 0),
    0
  );

  return (
    <table style={props.style} className={`table ${props.className ?? ""}`}>
      <thead>
        <tr className="header">
          {props.columns.map((c, idx) => (
            <th
              style={{ width: getWidth(c.width, totalWidth) }}
              className="cell"
              key={idx}
            >
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
                style={{
                  width: getWidth(c.width, totalWidth),
                  ...props.cellStyle?.(colIdx, row, rowIdx, all),
                }}
                className="cell"
                key={props.rowKey(row) + colIdx}
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

function getWidth(width: string | number | undefined, totalWidth: number) {
  if (typeof width === "number") return `${(width / totalWidth) * 100}%`;
  return width;
}
