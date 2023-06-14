import ArrowDownTrayIcon from './ArrowDownTrayIcon';
import ArrowUpTrayIcon from './ArrowUpTrayIcon';
import DeviceFloppyIcon from './DeviceFloppyIcon';
import DocumentChartBarIcon from './DocumentChartBarIcon';
import FolderOpenIcon from './FolderOpenIcon';
import LayoutSidebarLeftCollapseIcon from './LayoutSidebarLeftCollapseIcon';
import LayoutSidebarLeftExpandIcon from './LayoutSidebarLeftExpandIcon';
import MathXPlusYIcon from './MathXPlusYIcon';
import PauseIcon from './PauseIcon';
import PlayIcon from './PlayIcon';
import PlusCircleIcon from './PlusCircleIcon';
import StopIcon from './StopIcon';
import WaveSineIcon from './WaveSineIcon';
import XCircleIcon from './XCircleIcon';

const Icon = props => {
  switch (props.children) {
    case 'folder-open':
      return <FolderOpenIcon />;
    case 'arrow-up-tray':
      return <ArrowUpTrayIcon />;
    case 'arrow-down-tray':
      return <ArrowDownTrayIcon />;
    case 'device-floppy':
      return <DeviceFloppyIcon />;
    case 'document-chart-bar':
      return <DocumentChartBarIcon />;
    case 'wave-sine':
      return <WaveSineIcon />;
    case 'math-x-plus-y':
      return <MathXPlusYIcon />;
    case 'layout-sidebar-left-collapse':
      return <LayoutSidebarLeftCollapseIcon />;
    case 'layout-sidebar-left-expand':
      return <LayoutSidebarLeftExpandIcon />;
    case 'plus-circle':
      return <PlusCircleIcon />;
    case 'x-circle':
      return <XCircleIcon />;
    case 'play':
      return <PlayIcon />;
    case 'pause':
      return <PauseIcon />;
    case 'stop':
      return <StopIcon />;
    default:
      return null;
  }
};

export default Icon;
