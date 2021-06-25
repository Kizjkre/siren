import { useState } from 'react';
import Window from '../../Window';
import { connect } from 'react-redux';

const ViewWindow = ({ files }) => {
  const [file, setFile] = useState('');

  return (
    <Window id="window-view" title="View CSV">
      <div className="box">
        <div className="select is-fullwidth">
          <select value={ file } onChange={ e => setFile(e.target.value) }>
            <option value="" disabled>Select a file</option>
            { Object.keys(files).map(name => <option key={ name } value={ name }>{ name }</option>) }
          </select>
        </div>
      </div>
      <div className={ `box ${ file === '' ? 'is-hidden' : '' }` }>
        <div className="table-container">
          <table className="table is-hoverable">
            <thead>
              <tr>
                { Object.keys(files[file]?.[0] || {}).map((column, i) => <td key={ i }>{ column }</td>) }
              </tr>
            </thead>
            <tbody>
              {
                files[file]?.map((row, i) =>
                  <tr key={ `${ i }-row` }>
                    { Object.values(row).map((value, j) => <td key={ `${ j }-col` }>{ value + '' }</td>) }
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  files: state.workstation.files
});

export default connect(mapStateToProps)(ViewWindow);
