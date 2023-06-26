import { createSignal, onMount } from 'solid-js';
import Icon from '../../assets/icons/Icons';
import useDragWindow from '../../hooks/useDragWindow';

export const status = {};

const Window = props => {
  const [closed, setClosed] = createSignal(!props.open);

  status[props.title] = { closed, setClosed };

  let ref, body;

  useDragWindow(() => ref.children[0], () => ref);
  onMount(() => props.onMount(body));

  const handleClose = () => setClosed(true);

  return (
    <div
      class="fixed z-10 top-[200px] left-[100px] shadow-xl bg-white border-t border-blue-600"
      classList={ { hidden: closed() } }
      ref={ ref }
    >
      <div class="flex w-full border-b border-blue-600 px-4 py-2 bg-gray-100 font-bold cursor-grab">
        <p class="grow">{ props.title }</p>
        <span class="transition duration-200 hover:text-red-400 cursor-pointer" onClick={ handleClose }>
          <Icon>x-circle</Icon>
        </span>
      </div>
      <div class="min-h-[30vh] min-w-[30vw] max-h-[60vh] max-w-[60vw] px-4 py-2" ref={ body }>
        { props.children }
      </div>
    </div>
  );
};

export default Window;
