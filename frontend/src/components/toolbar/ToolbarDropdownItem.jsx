import Icon from '../../assets/icons/Icons';

const ToolbarDropdownItem = props => (
  <button
    class="flex px-4 py-2 box-border border-l border-l-transparent hover:bg-gray-100 hover:border-l-blue-600 hover:text-blue-600"
    onClick={ props.onClick }
  >
    {
      props.icon && (
        <span class="pr-2">
          <Icon>{ props.icon }</Icon>
        </span>
      )
    }
    { props.children }
  </button>
);

export default ToolbarDropdownItem;
