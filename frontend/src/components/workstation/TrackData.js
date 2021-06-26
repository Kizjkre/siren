import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import { isNumerical } from '../../helper/processing';

let height = -1;

const TrackData = ({ tracks, id }) => {
  const svg = useRef();
  const xAxis = useRef();
  const yAxis = useRef();

  const [state, setState] = useState({ graph: '' });

  const track = tracks[id].data;

  const data = track.map((d, i) => [i, d]);

  useEffect(() => {
    if (isNumerical(track)) {
      const width = getComputedStyle(svg.current).width;

      if (height < 0) {
        height = getComputedStyle(svg.current).height;
      }

      const x = d3.scaleLinear()
        .domain(d3.extent(data, datum => datum[0]))
        .range([30, parseFloat(width.slice(0, width.length - 2))]);
      const y = d3.scaleLinear()
        .domain(d3.extent(data, datum => datum[1]))
        .range([parseFloat(height.slice(0, height.length - 2)) - 20, 0]);

      if (data.every(datum => !isNaN(datum[1]))) {
        const line = d3.line()
          .x(data => x(data[0]))
          .y(data => y(data[1]));

        setState({ ...state, graph: line(data) });

        const axes = [
          d3.axisBottom()
            .scale(x)
            .ticks(0),
          d3.axisLeft()
            .scale(y)
        ];

        d3.select(xAxis.current).call(axes[0]);
        d3.select(yAxis.current).call(axes[1]);
      }

      xAxis.current.style.transform = `translateY(calc(${ height } - 20px))`;
      yAxis.current.style.transform = 'translateX(30px)';
    }
  }, [tracks]); // eslint-disable-line react-hooks/exhaustive-deps

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
    <svg className="track-graph" ref={ svg }>
      <g>
        <g className="x" ref={ xAxis } />
        <g className="y" ref={ yAxis } />
        <g className="line">
          <path d={ state.graph } fill="none" stroke='black' />
        </g>
      </g>
    </svg>
  );
};

const mapStateToProps = state => ({
  tracks: state.workstation.tracks
});

export default connect(mapStateToProps)(TrackData);
