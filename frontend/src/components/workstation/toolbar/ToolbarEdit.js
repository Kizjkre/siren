const ToolbarEdit = ({ selected, setSelected }) => {
  return (
    <div className={ `navbar-item has-dropdown ${ selected ? 'is-active' : '' }` }>
      <span className="navbar-link is-arrowless" onClick={ () => setSelected(!selected) }>Edit</span>
      <div className="navbar-dropdown">
        <a className="navbar-item"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-trash"/>
            </span>
            <span>Delete Track</span>
          </div>
        </a>
        <a className="navbar-item"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <div className="icon-text">
            <span className="icon">
              <i className="fa fa-trash"/>
            </span>
            <span>Remove File</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ToolbarEdit;
