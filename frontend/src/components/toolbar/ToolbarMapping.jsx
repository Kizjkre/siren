import { addMapping } from '../../state/state';
import ToolbarDropdownItem from './ToolbarDropdownItem';
import ToolbarItem from './ToolbarItem';

const ToolbarMapping = () => {
  return (
    <ToolbarItem name="Mappings">
      <ToolbarDropdownItem
        icon="plus-circle"
        onClick={ () => addMapping(prompt('Mapping name', 'New Mapping'), 'export default x => x;') } // TODO: Fix
      >
        Add Mapping
      </ToolbarDropdownItem>
    </ToolbarItem>
  );
};

export default ToolbarMapping;
