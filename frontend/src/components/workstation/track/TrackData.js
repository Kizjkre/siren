import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { isNumerical } from '../../../helper/processing';
import Tooltip from '../../Tooltip';
import graph from '../../../helper/graph';

const TrackData = ({ tracks, id, channels }) => {
  const [open, setOpen] = useState(null);

  const svg = useRef();

  const track = tracks[id].data;
  const feature = tracks[id].settings.channel.some(channel => Object.values(channels[channel].features).slice(1).findIndex(f => f.track === +id) !== -1);
  const envelope = tracks[id].settings.channel.some(channel => channels[channel].features.Envelope.track === +id);

  useEffect(() => {
    if (isNumerical(track)) {
      graph(
        svg.current,
        id,
        track,
        feature,
        envelope,
        (e, d) => setOpen({ x: e.pageX, y: e.pageY, d }),
        () => setOpen(null)
      );
    }
  }, [track, envelope, feature]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isNumerical(track)) {
    return (
      <div className="table-container h-100">
        <table className="table track-table">
          <tbody>
            <tr className="is-flex is-align-items-center h-100">
              { track.map((d, i) => <td key={ `table-${ i }` }>{ d }</td>) }
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <svg className="track-graph" ref={ svg } />
      <Tooltip open={ !!open } position={ open || { x: 0, y: 0 } }>{ open?.d }</Tooltip>
    </>
  );
};

const mapStateToProps = state => ({
  tracks: state.workstation.tracks,
  channels: state.workstation.channels
});

export default connect(mapStateToProps)(TrackData);
