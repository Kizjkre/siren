import { autoType, csvParse } from 'd3';
import pako from 'pako';
import { addDataset, state, updateState } from '../../state/state';
import ToolbarDivider from './ToolbarDivider';
import ToolbarDropdownItem from './ToolbarDropdownItem';
import ToolbarItem from './ToolbarItem';

const ToolbarFile = () => {
  const open = document.createElement('input');
  open.type = 'file';

  const download = document.createElement('a');

  const upload = document.createElement('input');
  upload.type = 'file';

  open.addEventListener('change', async e => {
    if (e.target.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      console.log(JSON.parse(pako.inflate(await (await fetch(url)).arrayBuffer(), { to: 'string' })));
      updateState(JSON.parse(pako.inflate(await (await fetch(url)).arrayBuffer(), { to: 'string' })));
      URL.revokeObjectURL(url);
    }
  });

  upload.addEventListener('change', async e => {
    if (e.target.files.length) {
      const url = URL.createObjectURL(e.target.files[0]);
      addDataset(e.target.files[0].name, await csvParse(await (await fetch(url)).text(), autoType));
      URL.revokeObjectURL(url);
    }
  });

  const handleOpen = () => open.click();
  const handleSave = async () => {
    download.download = 'workstation.siren';
    download.href = URL.createObjectURL(new Blob([pako.deflate(JSON.stringify(state))]));
    download.click();
    URL.revokeObjectURL(download.href);
  };
  const handleUpload = () => upload.click();

  return (
    <ToolbarItem name="File">
      <ToolbarDropdownItem icon="folder-open" onClick={ handleOpen }>Open</ToolbarDropdownItem>
      <ToolbarDropdownItem icon="device-floppy" onClick={ handleSave }>Save</ToolbarDropdownItem>
      <ToolbarDropdownItem icon="arrow-down-tray">Export <kbd>.wav</kbd></ToolbarDropdownItem>
      <ToolbarDivider />
      <ToolbarDropdownItem icon="arrow-up-tray" onClick={ handleUpload }>Upload CSV</ToolbarDropdownItem>
    </ToolbarItem>
  );
};

export default ToolbarFile;
