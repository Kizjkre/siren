import ArrowUpTrayIcon from './ArrowUpTrayIcon';
import DeviceFloppyIcon from './DeviceFloppyIcon';
import DocumentChartBarIcon from './DocumentChartBarIcon';
import FolderOpenIcon from './FolderOpenIcon';
import LayoutSidebarLeftCollapseIcon from './LayoutSidebarLeftCollapseIcon';
import LayoutSidebarLeftExpandIcon from './LayoutSidebarLeftExpandIcon';
import MathXPlusYIcon from './MathXPlusY';
import WaveSineIcon from './WaveSineIcon';

const Icon = props => {
  switch (props.children) {
    case 'folder-open':
      return <FolderOpenIcon />;
    case 'arrow-up-tray':
      return <ArrowUpTrayIcon />;
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
    default:
      return null;
  }
};

export default Icon;
