import { Link } from 'react-router-dom';
import IndexFeatures from '../components/index/IndexFeatures';
import IndexHeader from '../components/index/IndexHeader';
import IndexUseCases from '../components/index/IndexUseCases';
import Navbar from '../components/Navbar';

const Index = () => {
  const components = [IndexHeader, IndexFeatures, IndexUseCases];

  return (
    <>
      <Navbar>
        <div className="navbar-start">
          <Link to="/workstation" className="navbar-item">
            Workstation
          </Link>
          <Link to="/presentation" className="navbar-item">
            Presentation
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item is-unhoverable">
            <a
              href="https://github.com/Kizjkre/siren/issues/new"
              target="_blank"
              rel="noreferrer"
              className="button is-danger"
            >
              <span className="icon">
                <i className="fa fa-bug" />
              </span>
              <span>Report Bug</span>
            </a>
          </div>
        </div>
      </Navbar>
      <div className="about pb-6">
        { components.map((Component, i) => <Component key={ i } offset={ i % 2 } />) }
      </div>
    </>
  );
};

export default Index;
