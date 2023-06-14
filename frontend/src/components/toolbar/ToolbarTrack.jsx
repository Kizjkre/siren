import { addTrack } from '../../state/state';
import ToolbarDropdownItem from './ToolbarDropdownItem';
import ToolbarItem from './ToolbarItem';

const ToolbarTrack = () => {
  return (
    <ToolbarItem name="Tracks">
      <ToolbarDropdownItem
        icon="plus-circle"
        onClick={ () => addTrack() }
      >
        Add Track
      </ToolbarDropdownItem>
    </ToolbarItem>
  );
};

export default ToolbarTrack;
