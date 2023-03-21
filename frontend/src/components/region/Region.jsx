import { createEffect } from 'solid-js';
import { TYPE } from '../../constants/constants';
import { useState } from '../../context/Context';
import useDragRegion from '../../hooks/useDragRegion';
import nominal from '../../util/data/nominal';
import quantitative from '../../util/data/quantitative';

const Region = props => {
  const [state, { updateRegionStart }] = useState();

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
    console.log(mapping);
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
        console.log(props.range);
        nominal(data, domain, `#region-${ props.index }-${ props.parameter }-${ props.i }`, props.range);
        break;
      case TYPE.QUANTITATIVE:
        quantitative(data, domain, `#region-${ props.index }-${ props.parameter }-${ props.i }`, props.range);
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
