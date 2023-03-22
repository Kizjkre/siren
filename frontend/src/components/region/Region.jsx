import { createEffect } from 'solid-js';
import { TYPE } from '../../constants/constants';
import { useState } from '../../context/Context';
import useDragRegion from '../../hooks/useDragRegion';
import nominal from '../../util/data/nominal';
import quantitative from '../../util/data/quantitative';

import { extent } from 'd3';

const Region = props => {
  const [state, { updateRegionStart, updateRegionMapping, /* TODO: temp */ updateRegionData }] = useState();

  let ref;

  const handleDragOver = e => {
    if (!e.dataTransfer.types.includes('siren/mapping')) return;

    e.preventDefault();
    e.target.classList.add('bg-blue-100');
    e.target.classList.remove('bg-gray-100');
  };

  const handleDrop = e => {
    if (!e.dataTransfer.types.includes('siren/mapping')) return;

    e.preventDefault();
    const mapping = e.dataTransfer.getData('siren/mapping');
    e.target.classList.add('bg-gray-100');
    e.target.classList.remove('bg-blue-100');
    updateRegionMapping(props.index, props.parameter, props.i, mapping);

    updateRegionData(props.index, props.parameter, props.i, state.tracks[props.index].regions[props.parameter][props.i].data.map(x => 440 * (2 ** (1 / 12)) ** (x % 20)));
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
  return (
    <div
      ref={ ref }
      class="flex bg-gray-100 rounded h-[100px] justify-center items-center absolute top-0 left-0 box-border border"
      style={ { left: `${ state.tracks[props.index].regions[props.parameter][props.i].start * state.timelineWidth }px` } }
      onDragOver={ handleDragOver }
      onDrop={ handleDrop }
      onDragLeave={ handleDragLeave }
    >
      <svg id={ `region-${ props.index }-${ props.parameter }-${ props.i }` } height="100" />
    </div>
  );
};

export default Region;
