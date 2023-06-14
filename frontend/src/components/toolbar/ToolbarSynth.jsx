import { addSynth } from '../../state/state';
import synthSandbox from '../../util/sandbox/synthSandboxAction';
import ToolbarDropdownItem from './ToolbarDropdownItem';
import ToolbarItem from './ToolbarItem';

const ToolbarSynth = () => {
  const sandboxMessage = synthSandbox();

  const a = document.createElement('input');
  a.type = 'file';

  a.addEventListener('change', async e => {
    if (e.target.files.length) {
      sandboxMessage();
      const url = URL.createObjectURL(e.target.files[0]);
      addSynth(e.target.files[0].name, await (await fetch(url)).text());
    }
  });

  const handleUpload = () => a.click();

  return (
    <ToolbarItem name="Synth">
      <ToolbarDropdownItem icon="arrow-up-tray" onClick={ handleUpload }>Upload Synth</ToolbarDropdownItem>
    </ToolbarItem>
  );
};

export default ToolbarSynth;
