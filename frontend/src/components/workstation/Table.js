const Table = ({ file, column }) => (
  <table className="table align-self-center">
    <tbody>
      <tr>
        { file.map((row, i) => <td key={ `${ row[column] }-${ i }` }>{ row[column] }</td>) }
      </tr>
    </tbody>
  </table>
);

export default Table;