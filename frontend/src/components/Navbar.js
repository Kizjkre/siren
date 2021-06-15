import { useState } from 'react';

// TODO: Doesn't work on mobile
const Navbar = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <span className="navbar-item">SIREN</span>
        <span role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={ () => setOpen(!open) }>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </span>
      </div>
      <div className={ `navbar-menu ${ open ? 'is-active' : '' }` }>
        <div className="navbar-start">
          { children }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
