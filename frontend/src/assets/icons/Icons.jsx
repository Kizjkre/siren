import ArrowUpTrayIcon from './ArrowUpTrayIcon';
import DeviceFloppyIcon from './DeviceFloppyIcon';
import FolderOpenIcon from './FolderOpenIcon';

const Icon = props => {
  switch (props.children) {
    case 'folder-open':
      return <FolderOpenIcon />;
    case 'arrow-up-tray':
      return <ArrowUpTrayIcon />;
    case 'device-floppy':
      return <DeviceFloppyIcon />;
    default:
      return null;
  }
};

export default Icon;
