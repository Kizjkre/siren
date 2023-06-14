import { state } from '../../state/state';

const Timeline = () => {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

  return (
    <div style={ { width: `${ state.seconds * state.timelineWidth + 1 }px` } }>
      {/* NOTE: Need extra SVG classes for the <line> classes to take effect */}
      <svg class="stroke-gray-300 stroke-gray-800 stroke-black" viewBox={ `-1 0 ${ state.seconds * state.timelineWidth } ${ rem }` }>
        <g class="stroke-none" transform="translate(5, 0)">
          {
            Array(state.seconds).fill().map((_, i) => (
              <text dominant-baseline="hanging" x={ state.timelineWidth * i } y="0" fill="black">{ i }</text>
            ))
          }
        </g>
        <g transform={ `translate(0, ${ rem })` }>
          {
            Array(state.seconds * 4).fill().map((_, i) => (
              <line x1={ i * 25 } y1={ 0 } x2={ i * 25 } y2={ i % 4 ? -5 : -10 } class={ `stroke-gray-${ i % 4 ? 300 : 800 }` } />
            ))
          }
        </g>
      </svg>
    </div>
  );
};

export default Timeline;
