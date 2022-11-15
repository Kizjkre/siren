import Icon from '../../assets/icons/Icons';

const SidebarItem = props => {
  return (
    <button class="flex box-border border-l border-l-gray-100 rounded-r-md hover:bg-gray-100 hover:border-l-blue-600 hover:text-blue-600 pl-2 w-full py-2">
      <span class="pr-2">
        <Icon>{ props.icon }</Icon>
      </span>
      <p>{ props.children }</p>
    </button>
  );
};

export default SidebarItem;
