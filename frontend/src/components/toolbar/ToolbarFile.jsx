import ToolbarDivider from './ToolbarDivider';
import ToolbarDropdownItem from './ToolbarDropdownItem';
import ToolbarItem from './ToolbarItem';

const ToolbarFile = () => {
  return (
    <ToolbarItem name="File">
      <ToolbarDropdownItem icon="folder-open">Open</ToolbarDropdownItem>
      <ToolbarDropdownItem icon="device-floppy">Save</ToolbarDropdownItem>
      <ToolbarDivider />
      <ToolbarDropdownItem icon="arrow-up-tray">Upload CSV</ToolbarDropdownItem>
    </ToolbarItem>
  );
};

export default ToolbarFile;
