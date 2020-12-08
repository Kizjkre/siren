import Window from './Window';
import { connect } from 'react-redux';

const Sonification = ({ anchor, trackno, tracks }) => {
  return (
    <Window anchor={ anchor } title={ `${ tracks[trackno].name }: Sonification Settings` }>
      <h5 className="font-weight-bold">Pitch</h5>
      <div className="row">
        <div className="col-3 d-flex">
          <div className="custom-switch align-self-center">
            <input type="checkbox" id={ `sonification-${ trackno }-pitch` } />
            <label htmlFor={ `sonification-${ trackno }-pitch` }> </label>
          </div>
        </div>
        <div className="col-9">
          <select className="form-control" defaultValue="0">
            <option value="0">Higher values map to higher pitches</option>
            <option value="1">Lower values map to higher pitches</option>
            <option value="2">Higher moving averages map to higher pitches</option>
            <option value="3">Lower moving averages map to higher pitches</option>
            <option value="4">Longer cell value lengths map to higher pitches</option>
            <option value="5">Shorter cell value lengths map to higher pitches</option>
          </select>
        </div>
      </div>
      <br />
      <hr />
      <h5 className="font-weight-bold">Rhythm</h5>
      <div className="row">
        <div className="col-3 d-flex">
          <div className="custom-switch align-self-center">
            <input type="checkbox" id={ `sonification-${ trackno }-rhythm` } />
            <label htmlFor={ `sonification-${ trackno }-rhythm` }> </label>
          </div>
        </div>
        <div className="col-9">
          <input type="number" className="form-control" placeholder="Segmentation Size" />
        </div>
      </div>
    </Window>
  );
};

const mapStateToProps = state => ({
  tracks: state.tracks
});

export default connect(mapStateToProps)(Sonification);