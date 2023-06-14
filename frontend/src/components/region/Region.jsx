import { extent } from 'd3';
import { createEffect, createSignal } from 'solid-js';
import { TYPE } from '../../constants/constants';
import useDragRegion from '../../hooks/useDragRegion';
import { port, state, updateRegionMapping, updateRegionStart } from '../../state/state';
import nominal from '../../util/data/nominal';
import quantitative from '../../util/data/quantitative';
import mappingSandbox from '../../util/sandbox/mappingSandboxAction';
import MappingSandbox from '../util/sandbox/MappingSandbox';

const Region = props => {
  let ref;

  const [map, setMap] = createSignal(null);

  const handleDragOver = e => {
    if (!e.dataTransfer.types.includes('siren/mapping')) return;

    e.preventDefault();
    e.target.classList.add('bg-blue-100');
    e.target.classList.remove('bg-gray-100');
  };

  const handleDrop = async e => {
    if (!e.dataTransfer.types.includes('siren/mapping')) return;

    e.preventDefault();
    const mapping = e.dataTransfer.getData('siren/mapping');
    e.target.classList.add('bg-gray-100');
    e.target.classList.remove('bg-blue-100');

    setMap(mapping);
    await mappingSandbox();
    const region = state.tracks[props.index].regions[props.parameter][props.i];

    port.mappings[map()].onmessage = e => {
      if (!e.data.data) return;
      updateRegionMapping(props.index, props.parameter, props.i, map(), e.data.data);
      port.mappings[map()].onmessage = null;
      setMap(null);
    };

    port.mappings[map()].postMessage({ action: 'run', data: state.datasets[region.accessor[0]].map(row => row[region.accessor[1]]) });
  };

  const handleDragLeave = e => {
    if (!e.dataTransfer.types.includes('siren/mapping')) return;

    e.preventDefault();
    e.target.classList.add('bg-gray-100');
    e.target.classList.remove('bg-blue-100');
  };

  createEffect(() => {
    const { data, length } = state.tracks[props.index].regions[props.parameter][props.i];
    const domain = length.reduce((a, v) => a + v);

    ref.style.width = `${ 100 * length }px`;
    ref.children[0].setAttribute('width', 100 * domain);

    switch (state.synths[state.tracks[props.index].synth].parameters.timbral[props.parameter]) {
      case TYPE.NOMINAL:
      case TYPE.ORDINAL:
        nominal(data, domain, `#region-${ props.index }-${ props.parameter }-${ props.i }`, props.range);
        break;
      case TYPE.QUANTITATIVE:
        // TODO: fix
        quantitative(data, domain, `#region-${ props.index }-${ props.parameter }-${ props.i }`, extent([...props.range, ...data]));
        break;
    }
  });

  useDragRegion(() => ref, 3100, 200, x =>
    updateRegionStart(props.index, props.parameter, props.i, x / 100)
  );

  // noinspection JSValidateTypes
  return [
    <div
      ref={ ref }
      class="flex bg-gray-100 rounded h-[100px] justify-center items-center absolute top-0 left-0 box-border border"
      style={ { left: `${ state.tracks[props.index].regions[props.parameter][props.i].start * state.timelineWidth }px` } }
      onDragOver={ handleDragOver }
      onDrop={ handleDrop }
      onDragLeave={ handleDragLeave }
    >
      <svg id={ `region-${ props.index }-${ props.parameter }-${ props.i }` } height="100" />
    </div>,
    <>
      {
        !map() ? null : (
          <MappingSandbox name={ map() } uuid={ state.mappings[map()].uuid }>
            { state.mappings[map()].code }
          </MappingSandbox>
        )
      }
    </>
  ];
};

export default Region;
