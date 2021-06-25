import Navbar from '../Navbar';
import { Link } from 'react-router-dom';

const Presentation = () => {
  return (
    <>
      <Navbar>
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
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
      <iframe
        className="presentation"
        title="presentation"
        src="https://docs.google.com/presentation/d/e/2PACX-1vS9C0omz8jLBQXPreW2nSxONloNqF71Ltuj8yvamGTRlPFUo0BSwwB1zQF2iEon6tmCi603SbRR2Ef3/embed?start=false&loop=true&delayms=60000"
        frameBorder="0"
      />
    </>
  );
};

export default Presentation;
