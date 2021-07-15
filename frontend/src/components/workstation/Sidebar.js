import SidebarDatasets from './sidebar/SidebarDatasets';
import SidebarSynths from './sidebar/SidebarSynths';
import SidebarProfiles from './sidebar/SidebarProfiles';

const Sidebar = () => (
  <aside className="menu">
    <SidebarDatasets />
    <SidebarSynths />
    <SidebarProfiles />
  </aside>
);

export default Sidebar;
