import { onMount } from 'solid-js';

export default (hook, elem) => {
  onMount(() => {
    let x = 0;
    let y = 0;

    hook().addEventListener('mousedown', e1 => {
      x = e1.clientX;
      y = e1.clientY;

      document.body.style.cursor = 'grabbing';
      hook().classList.remove('cursor-grab');

      const handleMouseUp = () => {
        document.body.style.cursor = '';
        hook().classList.add('cursor-grab');

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      const handleMouseMove = e2 => {
        elem().style.top = `${ elem().offsetTop - y + e2.clientY }px`;
        elem().style.left = `${ elem().offsetLeft - x + e2.clientX }px`;

        x = e2.clientX;
        y = e2.clientY;
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });
  });
};
