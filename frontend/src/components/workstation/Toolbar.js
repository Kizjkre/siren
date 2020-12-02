import { Link } from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">Workstation</a>
      <ul className="navbar-nav">
        <li className="nav-item dropdown with-arrow">
          <a className="nav-link" data-toggle="dropdown" id="nav-dropdown-file" href="#">
            File
            <i className="fa fa-angle-down ml-5" aria-hidden="true"/>
          </a>
          <div className="dropdown-menu" aria-labelledby="nav-dropdown-file">
            <a href="#" className="dropdown-item">
              <i className="fa fa-folder-open"/>
              &emsp;Open
            </a>
            <a href="#" className="dropdown-item">
              <i className="fa fa-file-export"/>
              &emsp;Export
            </a>
          </div>
        </li>
        <li className="nav-item dropdown with-arrow">
          <a className="nav-link" data-toggle="dropdown" id="nav-dropdown-file" href="#">
            Edit
            <i className="fa fa-angle-down ml-5" aria-hidden="true"/>
          </a>
          <div className="dropdown-menu" aria-labelledby="nav-dropdown-file">
            <a href="#" className="dropdown-item">
              <i className="fa fa-folder-open"/>
              &emsp;Open
            </a>
          </div>
        </li>
        <li className="nav-item dropdown with-arrow">
          <a className="nav-link" data-toggle="dropdown" id="nav-dropdown-file" href="#">
            View
            <i className="fa fa-angle-down ml-5" aria-hidden="true"/>
          </a>
          <div className="dropdown-menu" aria-labelledby="nav-dropdown-file">
            <a href="#" className="dropdown-item">
              <i className="fa fa-folder-open"/>
              &emsp;Open
            </a>
          </div>
        </li>
      </ul>
      <div className="navbar-content ml-auto">
        <Link to="/" className="btn btn-danger">
          <i className="fa fa-sign-out-alt" />
          &emsp;Exit Workstation
        </Link>
      </div>
    </nav>
  );
};

export default Toolbar;