import { useState } from 'react';

let first = true;

const Window = ({ anchor, buttons, children, title }) => {
  const [state, setState] = useState({ x: 0, y: 0, offsetX: 0, offsetY: 0, click: false });

  const handleMouseDown = e => {
    if (first) {
      setState({ ...state, offsetX: e.screenX, offsetY: e.screenY, click: true });
      first = false;
    } else {
      setState({ ...state, click: true });
    }
  };
  const handleDrag = e => {
    if (state.click) {
      setState({ ...state, x: e.screenX - state.offsetX, y: e.screenY - state.offsetY });
    }
  };
  const handleMouseUp = () => setState({ ...state, click: false });
  const resetPosition = () => setTimeout(() => setState({...state, x: 0, y: 0}), 500);

  return (
    <div className="modal window" id={ anchor } tabIndex="-1" role="dialog" data-overlay-dismissal-disabled="true" data-esc-dismissal-disabled="true">
      <div className="modal-dialog" role="document" style={ { top: state.y, left: state.x } }>
        <div className="modal-content" onMouseDown={ handleMouseDown } onMouseMove={ handleDrag } onMouseUp={ handleMouseUp }>
          <h5 className="modal-title">
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