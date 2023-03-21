import { useState } from '../../context/Context';
import ToolbarDropdownItem from './ToolbarDropdownItem';
import ToolbarItem from './ToolbarItem';

const ToolbarTrack = () => {
  const [, { addTrack }] = useState();
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
