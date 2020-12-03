import Toolbar from './workstation/Toolbar';
import Controls from './workstation/Controls';
import Main from './workstation/Main';

const Workstation = () => {
  return (
    <div className="page-wrapper with-navbar with-sidebar with-navbar-fixed-bottom">
      <div className="sticky-alerts"></div>
      <Toolbar />
      <Controls />
      <Main />
      <nav className="navbar navbar-fixed-bottom">
      </nav>
    </div>
  );
};

export default Workstation;