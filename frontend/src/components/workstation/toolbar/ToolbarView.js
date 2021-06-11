import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const ToolbarView = ({ selected, setSelected }, ref) => {
  return (
    <div className={ `navbar-item has-dropdown ${ selected ? 'is-active' : '' }` } ref={ ref }>
      <span className="navbar-link is-arrowless" onClick={ () => setSelected(!selected) }>View</span>
      <div className="navbar-dropdown">
        <div className="navbar-item">
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-moon"/>
            </span>
            <span>Toggle Mode</span>
          </div>
        </div>
        <div className="navbar-item">
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-toggle-on"/>
            </span>
            <span>File Browser</span>
          </div>
        </div>
        <Link className="navbar-item" to="/editor">
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-code"/>
            </span>
            <span>Code Editor</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default forwardRef(ToolbarView);
