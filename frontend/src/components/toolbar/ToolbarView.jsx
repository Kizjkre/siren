import { state, toggleSidebar } from '../../state/state';
import ToolbarDropdownItem from './ToolbarDropdownItem';
import ToolbarItem from './ToolbarItem';

const ToolbarView = () => {

  return (
    <ToolbarItem name="View">
      <ToolbarDropdownItem
        icon={ `layout-sidebar-left-${ state.sidebar ? 'collapse' : 'expand' }` }
        onClick={ () => toggleSidebar() }
      >
        { state.sidebar ? 'Close' : 'Open' } Sidebar
      </ToolbarDropdownItem>
    </ToolbarItem>
  );
};

export default ToolbarView;
