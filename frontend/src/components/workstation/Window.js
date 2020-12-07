import { useState, useEffect, createRef } from 'react';

let first = true;
let initial;

const Window = ({ anchor, buttons, children, title }) => {
  const win = createRef();
  const dialog = createRef();

  const [state, setState] = useState({ x: null, y: null, offsetX: null, offsetY: null, click: false });

  useEffect(() => {
    setState({
      ...state,
      x: dialog.current.offsetLeft,
      y: dialog.current.offsetTop
    });
    win.current.style.height = `${ dialog.current.getBoundingClientRect().height }px`;
    win.current.style.width = `${ dialog.current.getBoundingClientRect().width }px`;
    initial = {
      x: dialog.current.offsetLeft,
      y: dialog.current.offsetTop
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseDown = e => {
    if (first) {
      setState({ ...state, offsetX: e.clientX - state.x, offsetY: e.clientY - state.y, click: true });
    } else {
      setState({ ...state, click: true });
    }
  };
  const handleDrag = e => {
    if (state.click) {
      setState({ ...state, x: e.clientX - state.offsetX, y: e.clientY - state.offsetY });
    }
  };
  const handleMouseUp = () => setState({ ...state, click: false });
  const resetPosition = () => setTimeout(() => setState({ ...state, ...initial }), 500);

  return (
    <div className="modal window" id={ anchor } tabIndex="-1" role="dialog" style={ { top: state.y, left: state.x } } ref={ win } data-overlay-dismissal-disabled="true" data-esc-dismissal-disabled="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content" ref={ dialog }>
          <h5 className="modal-title" onMouseDown={ handleMouseDown } onMouseMove={ handleDrag } onMouseUp={ handleMouseUp }>
            <a href="#!" className="btn btn-square rounded-circle custom-modal-dismiss red" onClick={ resetPosition }>&#160;</a>
            &nbsp;&nbsp;
            {
              buttons.map(({ href, color, onClick }, i) =>
                <span key={ `btn-${ href }-${ i }` }>
                  <a href={ href } className={ `btn btn-square rounded-circle custom-modal-dismiss ${ color }` } onClick={ onClick }>&#160;</a>
                  &nbsp;&nbsp;
                </span>
              )
            }
            <br />{ title }
          </h5>
          <div>{ children }</div>
        </div>
      </div>
    </div>
  );
};

export default Window;