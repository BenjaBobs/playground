import "@src/common/table/Table.scss";

type ColumnDefinition<T> = {
  name: React.ReactNode;
  width?: string | number;
  render?: (row: T, index: number, allRows: T[]) => React.ReactNode;
};

type CellStyleArgs<T> =
  | {
      isHeader: true;
      column: ColumnDefinition<T>;
      columnIdx: number;
    }
  | {
      isHeader: false;
      column: ColumnDefinition<T>;
      columnIdx: number;
      row: T;
      rowIdx: number;
    };

export function Table<T>(props: {
  data: T[] | undefined;
  rowKey: (row: T) => string;
  columns: ColumnDefinition<T>[];
  style?: React.CSSProperties;
  cellStyle?: (
    args: CellStyleArgs<T>
  ) => React.CSSProperties | boolean | undefined;
  className?: string;
}) {
  const totalWidth = props.columns.reduce(
    (acc, c) => acc + (typeof c.width === "number" ? c.width : 0),
    0
  );

  return (
    <table style={props.style} className={`table ${props.className ?? ""}`}>
      <thead>
        <tr className="header">
          {props.columns.map((column, columnIdx) => (
            <th
              style={{
                width: getWidth(column.width, totalWidth),
                ...(props.cellStyle?.({
                  column,
                  columnIdx,
                  isHeader: true,
                }) as React.CSSProperties | false | undefined),
              }}
              className="cell"
              key={columnIdx}
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="body">
        {props.data?.map((row, rowIdx, all) => (
          <tr className="row" key={rowIdx}>
            {props.columns.map((column, columnIdx) => (
              <td
                style={{
                  width: getWidth(column.width, totalWidth),
                  ...(props.cellStyle?.({
                    column,
                    columnIdx,
                    row,
                    rowIdx,
                    isHeader: false,
                  }) as React.CSSProperties | false | undefined),
                }}
                className="cell"
                key={props.rowKey(row) + columnIdx}
              >
                {column.render?.(row, rowIdx, all)}
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
