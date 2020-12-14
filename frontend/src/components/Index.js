import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="page-wrapper with-navbar">
      <nav className="navbar">
        <span className="navbar-brand anchor">
          Ocean Memory Sonification
        </span>
        <ul className="navbar-nav d-none d-md-flex">
          <li className="nav-item">
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
