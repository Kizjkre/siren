import { connect } from 'react-redux';
import Track from './Track';

const Main = ({ files, columns }) => {
  let tracks = [];
  columns.forEach(({ file, name }) => {
    for (const f of files) {
      if (f.name === file) {
        tracks.push({ file: f, column: name });
        break;
      }
    }
  });
  return (
    <div className="content-wrapper">
      <div className={ `container-fluid ${ tracks.length ? '' : 'h-full' }` }>
        {
          tracks.length ?
            tracks.map(({ file, column }, i) =>
              <Track key={ `${ column }-row-${ i }` } i={ i } column={ column } file={ file } />
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
  columns: state.tracks
});

export default connect(mapStateToProps)(Main);
