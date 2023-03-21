import { onMount } from 'solid-js';

// TODO: Make better
export default (ref, max, width, cb) => {
  onMount(() => {
    let pos = 0;
    let x = 0;

    ref().addEventListener('mousedown', e1 => {
      x = e1.clientX;
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        cb(pos);
      };

      const handleMouseMove = e2 => {
        pos = Math.max(0, Math.min(ref().offsetLeft - x + e2.clientX, max - width));
        ref().style.left = `${ pos }px`;
        x = e2.clientX;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });
  });
};
