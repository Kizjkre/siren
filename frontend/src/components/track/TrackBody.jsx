import { For, onMount } from 'solid-js';
import { addRegion, state } from '../../state/state';
import Region from '../region/Region';

const TrackBody = props => {
  let ref;

  const handleDragOver = e => {
    if (!e.dataTransfer.types.includes('siren/region')) return;

    e.preventDefault();
    e.target.classList.add('border-blue-600', 'bg-gray-100');
  };

  const handleDrop = e => {
    if (!e.dataTransfer.types.includes('siren/region')) return;

    e.stopPropagation();
    e.preventDefault();
    e.target.classList.remove('border-blue-600', 'bg-gray-100');
    const data = JSON.parse(e.dataTransfer.getData('siren/region'));

    const attr = state.datasets[data.filename].map(vec => vec[data.attribute]);

    addRegion(
      props.index,
      props.track.view,
      attr,
      state.synths[state.tracks[props.index].synth].parameters.timbral[props.track.view],
      [data.filename, data.attribute]
    );
  };

  const handleDragLeave = e => {
    if (!e.dataTransfer.types.includes('siren/region')) return;

    e.preventDefault();
    e.target.classList.remove('border-blue-600', 'bg-gray-100');
  };

  onMount(() => ref.style.width = `${ 100 * state.seconds }px`);

  return (
    <div ref={ ref } class="relative box-border shrink-0 min-w-max h-[100px]" onDrop={ handleDrop } onDragOver={ handleDragOver } onDragLeave={ handleDragLeave }>
      <For each={ state.tracks[props.index].regions[props.track.view] }>
        {
          (_, i) => (
            <Region index={ props.index } parameter={ props.track.view } i={ i() } />
          )
        }
      </For>
    </div>
  );
};

export default TrackBody;
