import { onMount } from 'solid-js';
import { state } from '../state/state';

// TODO: Make better
export default (ref, max, width, cb) => {
  const displacement = (pos, interval) => Math.abs(Math.abs(pos % interval - interval / 2) - interval / 2);
  const round = (x, interval) => Math.round(x / interval) * interval;

  onMount(() => {
    let diff = null;
    let pos = 0;
    let x = 0;

    ref().addEventListener('mousedown', e1 => {
      x = e1.clientX;
      diff = x - ref().getBoundingClientRect().x;

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        cb(pos);
      };

      const handleMouseMove = e2 => {
        pos = Math.max(0, Math.min(ref().offsetLeft + x - ref().getBoundingClientRect().x - diff, max - width));

        let frets =
          displacement(pos, state.timelineWidth) > 10 ?
            displacement(pos, state.timelineWidth / 4) > 5 ?
              pos
              : round(pos, state.timelineWidth / 4)
            : round(pos, state.timelineWidth);

        ref().style.left = `${ frets }px`;
        x = e2.clientX;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });
  });
};
