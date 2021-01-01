import { connect } from 'react-redux';
import Track from './Track';

const Main = ({ files, tracks }) => {
  let t = [];
  tracks.forEach(({ file, name }) => {
    for (const f of files) {
      if (f.name === file) {
        t.push({ file: f, column: name });
        break;
      }
    }
  });

  return (
    <div className="content-wrapper">
      <div className={ `container-fluid ${ tracks.length ? '' : 'h-full' }` }>
        {
          t.length ?
            t.map(({ file, column }, i) =>
              <Track key={ `${ column }-row-${ i }` } i={ i } column={ column } name={ file.name } />
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
  tracks: state.tracks
});

export default connect(mapStateToProps)(Main);
