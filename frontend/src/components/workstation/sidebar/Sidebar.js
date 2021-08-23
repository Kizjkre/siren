import SidebarDatasets from './SidebarDatasets';
import SidebarSynths from './SidebarSynths';
import SidebarProfiles from './SidebarProfiles';

const Sidebar = () => (
  <aside className="menu">
    <SidebarDatasets />
    <SidebarSynths />
    <SidebarProfiles />
  </aside>
);

export default Sidebar;
