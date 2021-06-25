import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import IndexHeader from '../index/IndexHeader';
import IndexFeatures from '../index/IndexFeatures';
import IndexUseCases from '../index/IndexUseCases';
import IndexTutorial from '../index/IndexTutorial';

const Index = () => {
  const components = [IndexHeader, IndexFeatures, IndexUseCases, IndexTutorial];

  return (
    <>
      <Navbar>
        <div className="navbar-start">
          <Link to="/workstation" className="navbar-item">
            Workstation
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
