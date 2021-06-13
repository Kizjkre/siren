import { connect } from 'react-redux';
import Track from './Track';

const Main = ({ files, tracks }) => {
  let t = [];
  tracks.forEach(({ file, name, id }) => {
    for (const f of files) {
      if (f.name === file) {
        t.push({ file: f, column: name, id });
        break;
      }
    }
  });

  return t.length ?
    t.map(({ file, column, id }, i) =>
      <Track key={ `${ column }-row-${ i }` } i={ i } id={ id } column={ column } name={ file.name } />
    ) : (
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body is-align-content-center is-justify-content-center">
          <div className="content">
            <div className="is-flex is-justify-content-center is-align-content-center is-flex-direction-column">
              <span className="icon is-large is-flex is-align-self-center">
                <i className="fa fa-music placeholder" />
              </span>
              <div className="is-flex is-align-self-center">
                <p className="subtitle is-block">
                  &emsp;<br />
                  Nothing to see here..., open a <kbd>.csv</kbd> file to get started!
                  <br />&emsp;
                  <br />&emsp;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

const mapStateToProps = state => ({
  files: state.files,
  tracks: state.tracks
});

export default connect(mapStateToProps)(Main);
