import { createSignal } from 'solid-js';
import Icon from '../../assets/icons/Icons';

const SidebarItem = props => {
  const [show, setShow] = createSignal(false);

  const handleClick = () => setShow(!show());
  const handleRemove = e => {
    e.stopPropagation();
    props.onRemove();
  };
  const handleDragStart = item => e => props?.onDropdownDragStart(e, item);

  return [
    <button
      class={ `flex box-border border-l ${ !show() ? 'border-l-gray-100 rounded-r-md hover:bg-gray-100 hover:border-l-blue-600 hover:text-blue-600' : 'bg-gray-100 border-l-blue-600 text-blue-600' } transition-all duration-200 pl-2 w-full py-2` }
      onClick={ props.onClick ? () => props.onClick() : !props.dropdown ? null : handleClick }
      draggable={ props.draggable }
      onDragStart={ !props.onDragStart ? () => null : props.onDragStart }
    >
      <span class="pr-2">
        <Icon>{ props.icon }</Icon>
      </span>
      <p class="grow text-left">{ props.children }</p>
      <span class="mr-2 transition duration-200 hover:text-red-400" onClick={ handleRemove }>
        <Icon>x-circle</Icon>
      </span>
    </button>,
    !props.dropdown ? null : (
      <div class={ `${ show() ? '' : 'hidden' } w-full bg-gray-100 box-border border-l border-l-blue-600 text-blue-600 pl-8 pr-4 py-2 flex flex-col` }>
        {
          props.dropdown.map((item, i) => (
            <div class="flex gap-4">
              {
                i === 0 ? (
                  <div class="flex flex-col w-1/5">
                    <div class="box-border border-l border-l-blue-600 border-b border-b-blue-600 h-1/2" />
                  </div>
                ) : (
                  <div class="flex flex-col -translate-y-1/2 w-1/5">
                    <div class="box-border border-l border-l-blue-600 border-b border-b-blue-600 h-full" />
                  </div>
                )
              }
              <button class="cursor-grab rounded px-2 py-1 border border-gray-100 hover:border-blue-600 box-border" onDragStart={ handleDragStart(item) } draggable="true">
                &nbsp;{ item }
              </button>
            </div>
          ))
        }
      </div>
    )
  ];
};

export default SidebarItem;
