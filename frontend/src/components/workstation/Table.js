const Table = ({ file }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          {
            file.columns.map(column => <th key={ column }>{ column }</th>)
          }
        </tr>
      </thead>
    </table>
  );
};

export default Table;