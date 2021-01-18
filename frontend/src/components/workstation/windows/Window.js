import { useState, useEffect, useRef, createRef } from 'react';
import { connect } from 'react-redux';
import { focusWindow } from '../../../actions';

const Window = ({ anchor, buttons, children, title, windows, focusWindow, onClose, width }) => {
  if (!buttons) {
    buttons = [];
  }
  if (!onClose) {
    onClose = () => null;
  }

  const win = createRef();
  const dialog = createRef();
  const initial = useRef({ x: null, y: null });

  const [state, setState] = useState({ x: null, y: null, offsetX: null, offsetY: null, click: false, zIndex: -1000 });

  useEffect(() => {
    setState({
      ...state,
      x: dialog.current.offsetLeft,
      initial: {
        x: dialog.current.offsetLeft,
        y: dialog.current.offsetTop
      }
    });

    initial.current = {
      x: dialog.current.offsetLeft,
      y: dialog.current.offsetTop
    };

    win.current.style.height = `${ dialog.current.getBoundingClientRect().height }px`;
    win.current.style.width = `${ dialog.current.getBoundingClientRect().width }px`;

    focusWindow(`#${ anchor }`);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (win.current.classList.contains('show')) {
      setState({ ...state, zIndex: 100 + windows.length - windows.indexOf(`#${ anchor }`), x: initial.current.x, y: initial.current.y });
    } else {
      onClose();
      setState({ ...state, zIndex: -1000 });
    }
  }, [windows]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseDown = e => {
    focusWindow(`#${ anchor }`);
    setState({ ...state, offsetX: e.clientX - state.x, offsetY: e.clientY - state.y, click: true });
  };
  const handleDrag = e => {
    if (state.click) {
      setState({ ...state, x: e.clientX - state.offsetX, y: e.clientY - state.offsetY });
    }
  };
  const handleMouseUp = () => setState({ ...state, click: false });
  const resetPosition = () => setState({...state, x: initial.current.x, y: null});

  return (
    <div className="modal window" id={ anchor } tabIndex="-1" role="dialog" style={ { top: state.y, left: state.x, zIndex: state.zIndex } } ref={ win } data-overlay-dismissal-disabled="true" data-esc-dismissal-disabled="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content" ref={ dialog } style={ { width: width ? width: null } }>
          <h5 className="modal-title window-title" onMouseDown={ handleMouseDown } onMouseMove={ handleDrag } onMouseUp={ handleMouseUp }>
            <button className="btn btn-square rounded-circle custom-modal-dismiss red" onClick={ resetPosition } data-dismiss="modal">&#160;</button>
            &nbsp;&nbsp;
            {
              buttons.map(({ close, color, onClick, disabled }, i) =>
                <span key={ `btn-${ anchor }-${ i }` }>
                  <button className={ `btn btn-square rounded-circle custom-modal-dismiss ${ color }` } onClick={ () => { onClick(); if (close) resetPosition(); } } data-dismiss={ close ? 'modal' : null } disabled={ disabled }>&#160;</button>
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

const mapStateToProps = state => ({
  windows: state.windows
});

const mapDispatchToProps = dispatch => ({
  focusWindow: payload => dispatch(focusWindow(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);
