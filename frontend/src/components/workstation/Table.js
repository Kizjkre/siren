import { connect } from 'react-redux';

const Table = ({ file, column }) => {
  return (
    <table className="table table-hover align-self-center">
      <tbody>
        <tr>
          { file.map((row, i) => <td key={ `${ row[column] }-${ i }` }>{ row[column] }</td>) }
        </tr>
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  columns: state.columns
});

export default connect(mapStateToProps)(Table);