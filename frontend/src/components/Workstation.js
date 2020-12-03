import Toolbar from './workstation/Toolbar';
import FileBrowser from './workstation/FileBrowser';
import Main from './workstation/Main';

const Workstation = () => {
  return (
    <div className="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom">
      <div className="sticky-alerts"></div>
      <Toolbar />
      <FileBrowser />
      <Main />
      <nav className="navbar navbar-fixed-bottom">
      </nav>
    </div>
  );
};

export default Workstation;