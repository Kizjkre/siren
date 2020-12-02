import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="page-wrapper with-navbar">
      <nav className="navbar">
        <div className="navbar-content">
          <button className="btn btn-action" type="button">
            <i className="fa fa-bars" aria-hidden="true" />
            <span className="sr-only">Toggle sidebar</span>
          </button>
        </div>
        <a href="#" className="navbar-brand">
          Ocean Memory Sonification
        </a>
        <ul
          className="navbar-nav d-none d-md-flex">
          <li className="nav-item active">
            <Link to="/workstation" className="nav-link">Workstation</Link>
          </li>
        </ul>
      </nav>
      <div className="content-wrapper">
        Homepage
      </div>
    </div>
  );
};

export default Index;