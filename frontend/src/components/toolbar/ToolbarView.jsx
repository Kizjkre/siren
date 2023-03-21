import { useState } from '../../context/Context';
import ToolbarDropdownItem from './ToolbarDropdownItem';
import ToolbarItem from './ToolbarItem';

const ToolbarView = () => {
  const [state, { toggleSidebar }] = useState();

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
