import { For } from 'solid-js';
import Icon from '../../assets/icons/Icons';
import { useState } from '../../context/Context';

const TrackHeader = props => {
  const [state, { removeTrack, updateTrackName, updateTrackSynth, updateTrackView }] = useState();

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      updateTrackName(props.index, e.target.innerText);
      e.target.blur();
    }
  };
  const handleRemove = () => removeTrack(props.index);
  const handleDragOver = e => {
    if (!e.dataTransfer.types.includes('siren/synth')) return;

    e.preventDefault();
    e.target.classList.remove('border-transparent');
    e.target.classList.add('border-blue-600', 'bg-gray-100');
  };
  const handleDrop = e => {
    if (!e.dataTransfer.types.includes('siren/synth')) return;

    e.preventDefault();
    e.target.classList.remove('border-blue-600', 'bg-gray-100');
    e.target.classList.add('border-transparent');
    const name = e.dataTransfer.getData('siren/synth');
    updateTrackSynth(props.index, name);
    updateTrackView(props.index, Object.keys(state.synths[name].parameters.timbral)[0]);
  };
  const handleDragLeave = e => {
    if (!e.dataTransfer.types.includes('siren/synth')) return;

    e.preventDefault();
    e.target.classList.remove('border-blue-600', 'bg-gray-100');
    e.target.classList.add('border-transparent');
  };
  const handleChange = e => updateTrackView(props.index, e.target.value);

  // noinspection JSValidateTypes
  return (
    <div class="p-2 z-[1] shrink-0 sticky left-0 bg-white w-[200px] border-l border-r text-sm">
      <div class="flex">
        <p class="font-bold outline-0 text-base grow-[4]" contentEditable onKeyPress={ handleKeyPress }>{ props.track.name }</p>
        <span class="transition duration-200 hover:text-red-400 cursor-pointer" onClick={ handleRemove }>
          <Icon>x-circle</Icon>
        </span>
      </div>
      <div class="flex gap-2">
        <p class="py-2">Synth:</p>
        <div class="p-2 border-b border-transparent box-border" onDrop={ handleDrop } onDragOver={ handleDragOver } onDragLeave={ handleDragLeave }>
          { props.track.synth }
        </div>
      </div>
      <div class="flex gap-2">
        <p>
          <label for={ `view-select-${ props.index }` }>View:</label>
        </p>
        <select id={ `view-select-${ props.index }` } class="focus:outline-0" onChange={ handleChange } value={ props.track.view }>
          <For each={ Object.entries(state.synths[props.track.synth].parameters.timbral) }>
            {
              ([parameter, type]) => (
                <option value={ parameter }>{ parameter } ({ type === 'nominal' ? 'N' : type === 'ordinal' ? 'O' : 'Q' })</option>
              )
            }
          </For>
        </select>
      </div>
    </div>
  );
};

export default TrackHeader;
