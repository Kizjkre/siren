import { type Writable, writable } from 'svelte/store';
import type { Track, TrackRegion, TrackRegionStore } from '$lib/util/definitions/tracks';
import defaultdict from '$lib/util/defaultdict';
import type { Region } from '$lib/util/definitions/region';
import region from '$lib/stores/region';

const store: (dict: DefaultDict<{ [id: number]: Region }>) => TrackRegionStore =
  (dict: DefaultDict<{ [id: number]: Region }>): TrackRegionStore => {
    const { subscribe, update }: Writable<DefaultDict<{ [id: number]: Region }>> = writable(dict);

    return {
      add: (parameter: string, config: { source: { id: number, column: string } }) =>
        update((store: DefaultDict<{ [id: number]: Region }>): DefaultDict<{ [id: number]: Region }> => {
          store[parameter][new Date().getTime()] = region(config);
          return store;
        }),
      subscribe
    }
  };

const track: () => Track = (): Track => {
  const name: Writable<string> = writable('New Track');
  const regions: TrackRegion = {
    timbral: store(defaultdict({})),
    time: store(defaultdict({}))
  };

  return {
    name,
    regions
  };
};

export default track;
