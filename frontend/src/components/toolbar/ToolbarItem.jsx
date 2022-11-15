import { createSignal, onMount } from 'solid-js';
import useClickOutside from '../../hooks/useClickOutside';

const ToolbarItem = props => {
  const [hidden, setHidden] = createSignal(true);

  let dropdown;
  onMount(() => useClickOutside(dropdown, () => setHidden(true)));

  return (
    <span ref={ dropdown }>
      <button
        class={ `box-border p-4 border-b border-b-transparent ${ hidden() ? 'hover:text-blue-600 hover:border-b-blue-600 hover:bg-gray-100' : 'text-blue-600 border-b-blue-600 bg-gray-100' }` }
        onClick={ () => {
          setHidden(!hidden());
          useClickOutside(dropdown, () => setHidden(true));
        } }
      >
        { props.name }
      </button>
      <div class={ `absolute flex flex-col border border-gray-100 rounded-b-sm bg-white py-2 shadow-lg ${ hidden() ? 'hidden' : '' }` }>
        { props.children }
      </div>
    </span>
  );
};

export default ToolbarItem;
