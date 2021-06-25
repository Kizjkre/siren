import { useEffect } from 'react';

const useDragElement = (hook, elem) => {
  useEffect(() => {
    let x = 0;
    let y = 0;

    if (!hook || !elem) return;

    hook.current.addEventListener('mousedown', e1 => {
      x = e1.clientX;
      y = e1.clientY;

      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };

      document.onmousemove = e2 => {
        elem.current.style.top = `${ elem.current.offsetTop - y + e2.clientY }px`;
        elem.current.style.left = `${ elem.current.offsetLeft - x + e2.clientX }px`;

        x = e2.clientX;
        y = e2.clientY;
      };
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useDragElement;
