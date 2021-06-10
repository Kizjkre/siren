import { Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';

const Index = () => {
  return (
    <>
      <Redirect to="workstation" />
      <div>
        <Navbar>
          <div className="navbar-item">
            <Link to="/workstation" className="nav-link">Workstation</Link>
          </div>
        </Navbar>
      </div>
      <section className="section">
        <div className="container">
          Homepage
        </div>
      </section>
    </>
  );
};

export default Index;
