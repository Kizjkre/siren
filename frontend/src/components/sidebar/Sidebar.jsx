import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';

const Sidebar = () => {
  return (
    <div class="flex flex-col pt-8 basis-1/6 pl-12 pr-4">
      <SidebarSection name="Data" icon="device-floppy">
        <SidebarItem icon="device-floppy">asdf</SidebarItem>
        <SidebarItem icon="device-floppy">asdf</SidebarItem>
        <SidebarItem icon="device-floppy">asdf</SidebarItem>
      </SidebarSection>
      <SidebarSection name="Synths" icon="device-floppy">
        <SidebarItem icon="device-floppy">Default</SidebarItem>
      </SidebarSection>
      <SidebarSection name="Profiles" icon="device-floppy">
        <SidebarItem icon="device-floppy">Default</SidebarItem>
      </SidebarSection>
    </div>
  );
};

export default Sidebar;
