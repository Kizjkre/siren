import { useState, useEffect, createRef } from 'react';
import * as d3 from 'd3';

const TrackData = ({ file, column }) => {
  const ref = createRef();

  const [state, setState] = useState({ line: '' });

  useEffect(() => {
    const width = getComputedStyle(ref.current).width;
    const height = getComputedStyle(ref.current).height;
    const max = Math.max(...file.map(row => Math.abs(row[column])));
    const length = parseFloat(width.slice(0, width.length - 2)) / file.length;
    const points = file.map((row, i) => ([length * i, parseFloat(row[column]) * (parseFloat(height.slice(0, height.length - 2)) / max)]));
    setState({ ...state, line: (d3.line().context(null))(points) });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <svg className="track-graph" ref={ ref }>
        <path d={ state.line } stroke="black" fill="none" />
      </svg>
      {/*<table className="table align-self-center">*/}
      {/*  <tbody>*/}
      {/*  <tr>*/}
      {/*    { file.map((row, i) => <td key={ `${ row[column] }-${ i }` }>{ row[column] }</td>) }*/}
      {/*  </tr>*/}
      {/*  </tbody>*/}
      {/*</table>*/}
    </>
  );
};

export default TrackData;
