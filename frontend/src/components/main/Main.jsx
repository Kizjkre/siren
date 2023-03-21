import { For } from 'solid-js';
import { STATUS } from '../../constants/constants';
import { useState } from '../../context/Context';
import useStatus from '../../hooks/useStatus';
import TrackBody from '../track/TrackBody';
import TrackHeader from '../track/TrackHeader';
import Seeker from './Seeker';
import Timeline from './Timeline';

const Main = () => {
  const [state] = useState();
  const { status } = useStatus;

  // REF: https://stackoverflow.com/a/66689926
  return (
    <div class="flex flex-col basis-4/5 grow-[4] ml-2 min-w-0">
      <div class="relative h-full w-full overflow-scroll scroll" classList={ { 'pointer-events-none': status() !== STATUS.STOPPED } }>
        <Seeker />
        <div class="flex min-w-max border-b">
          <div class="shrink-0 sticky left-0 bg-white w-[199px]" />
          <div class="shrink-0 min-w-max">
            <Timeline />
          </div>
        </div>
        <For each={ state.tracks }>
          {
            (track, i) => (
              <div class="flex min-w-max border-b">
                <TrackHeader track={ track } index={ i() } />
                <TrackBody track={ track } index={ i() } />
              </div>
            )
          }
        </For>
      </div>
    </div>
  );
};

export default Main;
