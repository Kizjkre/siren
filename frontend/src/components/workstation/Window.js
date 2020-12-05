import { createRef } from 'react';

const handleDrag = ref => e => {
  // TODO: Make window draggable
};

const Window = ({ anchor, buttons, children, title }) => {
  const window = createRef();
  return (
    <div className="modal window" id={ anchor } tabIndex="-1" role="dialog" data-overlay-dismissal-disabled="true" data-esc-dismissal-disabled="true">
      <div className="modal-dialog" role="document" ref={ window }>
        <div className="modal-content" onClick={ handleDrag(window) }>
          <h5 className="modal-title">
            <a href="#!" className="btn btn-square rounded-circle custom-modal-dismiss red">&#160;</a>
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