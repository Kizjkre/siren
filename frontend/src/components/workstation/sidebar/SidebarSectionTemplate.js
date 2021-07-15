const SidebarSectionTemplate = ({ title, icon, empty, children }) => (
  <>
    <p className="menu-label">
      <span className="icon-text">
        <span className="icon">
          <i className={ icon } />
        </span>
        <span>{ title }</span>
      </span>
    </p>
    <ul className="menu-list">
      {
        !empty ? children : (
          <li>
            <a className="is-active"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
              <span className="icon-text">
                <span className="icon">
                  <i className="fa fa-folder-open" />
                </span>
                <span>No { title.toLowerCase() }</span>
              </span>
            </a>
          </li>
        )
      }
    </ul>
  </>
);

export default SidebarSectionTemplate;
