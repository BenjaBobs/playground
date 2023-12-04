type ColumnDefinition<T> = {
  name: string;
  render?: (row: T) => React.ReactNode;
};

export function Table<T>(props: {
  data: T[] | undefined;
  columns: ColumnDefinition<T>[];
}) {
  return (
    <table>
      <thead>
        {props.columns.map((c, idx) => (
          <th key={idx}>{c.name}</th>
        ))}
      </thead>
      <tbody>
        {props.data?.map((row, idx) => (
          <tr key={idx}>
            {props.columns.map((c, idx) => (
              <td key={idx}>{c.render?.(row)}</td>
            ))}
          </tr>
        )) ?? (
          <tr>
            <td colSpan={props.columns.length}>No data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
