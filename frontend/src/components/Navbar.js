import { useState } from 'react';

const Navbar = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <span className="navbar-item">SIREN</span>
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={ () => setOpen(!open) }>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div className={ `navbar-menu ${ open ? 'is-active' : '' }` }>
          <div className="navbar-start">
            { children }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
