import { autoType, csvParse } from 'd3';
import { useState } from '../../context/Context';
import ToolbarDivider from './ToolbarDivider';
import ToolbarDropdownItem from './ToolbarDropdownItem';
import ToolbarItem from './ToolbarItem';

const ToolbarFile = () => {
  const [, { addDataset }] = useState();

  const a = document.createElement('input');
  a.type = 'file';

  a.addEventListener('change', async e => {
    if (e.target.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      addDataset(e.target.files[0].name, await csvParse(await (await fetch(url)).text(), autoType));
    }
  });

  const handleUpload = () => a.click();

  return (
    <ToolbarItem name="File">
      <ToolbarDropdownItem icon="folder-open">Open</ToolbarDropdownItem>
      <ToolbarDropdownItem icon="device-floppy">Save</ToolbarDropdownItem>
      <ToolbarDivider />
      <ToolbarDropdownItem icon="arrow-up-tray" onClick={ handleUpload }>Upload CSV</ToolbarDropdownItem>
    </ToolbarItem>
  );
};

export default ToolbarFile;
