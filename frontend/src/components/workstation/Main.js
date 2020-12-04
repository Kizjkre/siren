import { TRACK_CONTROLS_WIDTH, TRACK_WIDTH } from '../../constants/workstation-styles';
import { connect } from 'react-redux';
import Table from './Table';

const Main = ({ files, columns }) => {
  let tracks = [];
  columns.forEach(column => {
    for (const file of files) {
      if (file.csv.columns.includes(column)) {
        tracks.push({ file: file.csv, column });
        break;
      }
    }
  });
  return (
    <div className="content-wrapper">
      <div className="container-fluid h-full">
        {
          tracks.length ?
            tracks.map(({ file, column }, i) =>
              <div key={ `${ column }-row` } className="row row-eq-spacing">
                <div className={ `col-${ TRACK_CONTROLS_WIDTH }` }>
                  <div className="card track">
                    <h2 className="card-title">Track { i + 1 } - { column }</h2>
                  </div>
                </div>
                <div className={ `col-${ TRACK_WIDTH }` }>
                  <div className="card track overflow-scroll">
                    <Table file={ file } column={ column } />
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center h-full">
                <div className="text-center">
                  <i className="fa fa-music icon-lg" />
                  <p className="font-size-20">Nothing to see here..., open a <kbd>.csv</kbd> file to get started!</p>
                </div>
              </div>
            )
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  files: state.files,
  columns: state.columns
});

export default connect(mapStateToProps)(Main);