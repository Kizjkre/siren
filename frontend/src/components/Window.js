import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { blurWindow, createWindow, focusWindow } from '../actions';
import useDragElement from '../hooks/useDragElement';

const Z_INDEX = 40;

const Window = ({ buttons, children, title, windows, focusWindow, id, createWindow, blurWindow }) => {
  if (!buttons) {
    buttons = [];
  }

  const win = useRef();
  const hook = useRef();

  const zIndex = windows.find(window => window.id === id)?.zIndex || 0;

  useEffect(() => {
    createWindow(id);

    win.current.classList.add('is-active');

    const rect = win.current.children[0].getBoundingClientRect();

    win.current.style.height = `${ rect.height }px`;
    win.current.style.width = `${ rect.width }px`;

    win.current.style.left = `${ (window.innerWidth - rect.width) / 2 }px`;
    win.current.style.top = `${ (window.innerHeight - rect.height) / 2 }px`;

    win.current.classList.remove('is-active');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (zIndex > 0) {
      win.current.style.zIndex = zIndex + Z_INDEX;
    }
  }, [windows]); // eslint-disable-line react-hooks/exhaustive-deps

  useDragElement(hook, win);

  return (
    <div
      className={ `modal ${ zIndex > 0 ? 'is-active' : '' }` }
      id={ id }
      ref={ win }
      onMouseDown={ () => focusWindow(id) }
    >
      <div className="modal-card window">
        <header className="modal-card-head window-hook" ref={ hook }>
          <p className="modal-card-title is-unselectable pr-6">{ title }</p>
          <button className="delete" aria-label="close" onClick={ () => blurWindow(id) } />
        </header>
        <section className="modal-card-body">
          { children }
        </section>
        <footer className="modal-card-foot">
          {
            buttons.map(({ close, color, onClick, disabled, text }, i) =>
              <button
                key={ `btn-${ id }-${ i }` }
                className={ `button ${ color }` }
                onClick={ () => {
                  onClick();
                  if (close) {
                    blurWindow(id);
                  }
                } }
                disabled={ disabled }
              >
                { text }
              </button>
            )
          }
        </footer>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  windows: state.windows
});

const mapDispatchToProps = dispatch => ({
  createWindow: id => dispatch(createWindow(id)),
  focusWindow: id => dispatch(focusWindow(id)),
  blurWindow: id => dispatch(blurWindow(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);
