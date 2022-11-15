import Icon from '../../assets/icons/Icons';

const SidebarSection = props => {
  return (
    <div class="flex flex-col mb-16">
      <div class="flex items-center text-sm pb-2 mb-2">
        <span class="mr-2">
          <Icon>{ props.icon }</Icon>
        </span>
        <p class="text-gray-500">{ props.name.toUpperCase() }</p>
      </div>
      { props.children }
    </div>
  );
};

export default SidebarSection;
