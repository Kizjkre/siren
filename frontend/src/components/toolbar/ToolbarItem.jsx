import { createSignal, onMount } from 'solid-js';
import useClickOutside from '../../hooks/useClickOutside';

const ToolbarItem = props => {
  const [hidden, setHidden] = createSignal(true);

  let dropdown;

  const { set, remove } = useClickOutside(() => dropdown, () => setHidden(true));

  const handleDropdown = () => {
    hidden() ? set() : remove();
    setHidden(!hidden());
  };

  const handleClick = () => {
    remove();
    setHidden(true);
  };

  return (
    <span ref={ dropdown }>
      <button
        class="box-border p-4 border-b border-b-transparent transition-all duration-200"
        classList={ {
          'hover:text-blue-600 hover:border-b-blue-600 hover:bg-gray-100': hidden(),
          'text-blue-600 border-b-blue-600 bg-gray-100': !hidden()
        } }
        onClick={ handleDropdown }
      >
        { props.name }
      </button>
      {
        props.children && (
          <div
            class="absolute flex flex-col border border-gray-100 rounded-b-sm bg-white py-2 shadow-lg z-50"
            classList={ { hidden: hidden() } }
            onClick={ handleClick }
          >
            { props.children }
          </div>
        )
      }
    </span>
  );
};

export default ToolbarItem;
