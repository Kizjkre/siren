import { forwardRef } from 'react';

const ToolbarEdit = ({ selected, setSelected }, ref) => {
  return (
    <div className={ `navbar-item has-dropdown ${ selected ? 'is-active' : '' }` } ref={ ref }>
      <span className="navbar-link is-arrowless" onClick={ () => setSelected(!selected) }>Edit</span>
      <div className="navbar-dropdown">
        <div className="navbar-item">
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-trash"/>
            </span>
            <span>Delete Track</span>
          </div>
        </div>
        <div className="navbar-item">
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-trash"/>
            </span>
            <span>Remove File</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ToolbarEdit);
