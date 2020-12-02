import halfmoon from 'halfmoon';

const Workstation = () => {
  return (
    <div className="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom" data-sidebar-type="full-height overlayed-sm-and-down">
      <div className="sticky-alerts"></div>

      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="navbar-item dropdown with-arrow">
            <a className="nav-link" data-toggle="dropdown" id="nav-link-dropdown-toggle" href="#">
              Products
              <i className="fa fa-angle-down ml-5" aria-hidden="true" />
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="nav-link-dropdown-toggle">
              <a href="#" className="dropdown-item">API builder</a>
              <a href="#" className="dropdown-item">Functions</a>
              <a href="#" className="dropdown-item">
                Analytics
                <strong className="badge badge-success float-right">New</strong>
              </a>
              <div className="dropdown-divider"></div>
              <div className="dropdown-content">
                <a href="#" className="btn btn-block" role="button">
                  See all products
                  <i className="fa fa-angle-right ml-5" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div className="sidebar-overlay" onClick={ () => halfmoon.toggleSidebar() } />
      <div className="sidebar">
      </div>
      <div className="content-wrapper">
      </div>
      <nav className="navbar navbar-fixed-bottom">
      </nav>
    </div>
  );
};

export default Workstation;