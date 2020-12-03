import React from 'react';

const handleDrag = ref => () => {
  // TODO: Make window draggable
};

const AddToTrack = ({ anchor }) => {
  const window = React.createRef();
  return (
    <div className="modal window" id={ anchor } tabIndex="-1" role="dialog" data-overlay-dismissal-disabled data-overlay-dismissal-disabled>
      <div className="modal-dialog" role="document" ref={ window }>
        <div className="modal-content" onClick={ handleDrag(window) }>
          <h5 className="modal-title">
            <a href="#!" className="btn btn-square rounded-circle custom-modal-close">&#160;</a>
            &emsp;Add Track
          </h5>
          <p>
            This is the modal content. Almost any type of content can be presented to the user here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddToTrack;