import { connect } from 'react-redux';

const Table = ({ file, columns }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          {
            file.columns.map(column => {
              if (columns.includes(column)) {
                return <th key={ column }>{ column }</th>;
              }
              return null;
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          file.map(row => <tr key={ Math.random() }>{ Object.values(row).map(value => <td key={ value }>{ value }</td>) }</tr>)
        }
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  columns: state.columns
});

export default connect(mapStateToProps)(Table);