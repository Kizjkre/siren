import halfmoon from 'halfmoon';
import Toolbar from './workstation/Toolbar';

const Workstation = () => {
  return (
    <div className="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom">
      <div className="sticky-alerts"></div>

      <Toolbar />

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