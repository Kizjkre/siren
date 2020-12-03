import { TRACK_CONTROLS_WIDTH, TRACK_WIDTH } from '../../constants/workstation-styles';
import { connect } from 'react-redux';
import Table from './Table';

const Main = ({ files }) => {
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row row-eq-spacing">
          <div className={ `col-${ TRACK_CONTROLS_WIDTH }` }>
            <div className="card track">
              <select className="form-control" multiple>
                { files.length ? files[0].columns.map(column => <option value={ column }>{ column }</option>) : null }
              </select>
            </div>
          </div>
          <div className={ `col-${ TRACK_WIDTH }` }>
            <div className="card track overflow-scroll">
              { files.length ? <Table file={ files[0] } /> : null }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  files: state.files
});

export default connect(mapStateToProps)(Main);