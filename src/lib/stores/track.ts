import { get, type Writable, writable } from 'svelte/store';
import type { Track, TrackRegion, TrackRegionStoreInterface, TrackRegionStore } from '$lib/util/definitions/tracks';
import defaultdict from '$lib/util/defaultdict';
import type { RegionSource } from '$lib/util/definitions/region';
import region from '$lib/stores/region';
import data from '$lib/stores/data';
import synths from '$lib/stores/synths';

type TrackInit = () => Track;

const store: (dict: DefaultDict<TrackRegionStore>) => TrackRegionStoreInterface =
  (dict: DefaultDict<TrackRegionStore>): TrackRegionStoreInterface => {
    const { subscribe, update }: Writable<DefaultDict<TrackRegionStore>> = writable(dict);

    return {
      add: (parameter: string, config: RegionSource): any => {
        update((store: DefaultDict<TrackRegionStore>): DefaultDict<TrackRegionStore> => {
          store[parameter][new Date().getTime()] = region(config);
          return store;
        });
        get(data)[config.source.id].references.update(
          (ref: number): number => ref + 1
        );
      },
      remove: (parameter: string, id: number): any =>
        update((store: DefaultDict<TrackRegionStore>): DefaultDict<TrackRegionStore> => {
          get(data)[store[parameter][id].source.id].references.update(
            (ref: number): number => ref - 1
          );
          delete store[parameter][id];
          return store;
        }),
      subscribe
    }
  };

const track: TrackInit = (): Track => {
  const name: Writable<string> = writable('New Track');
  const regions: TrackRegion = {
    timbral: store(defaultdict(Object as unknown as TrackRegionStore)),
    time: store(defaultdict(Object as unknown as TrackRegionStore))
  };
  const synth: Writable<number> = writable(0);
  const view: Writable<string> = writable('Frequency');

  get(synths)[0].references.update((refs: number): number => refs + 1);

  return {
    name,
    regions,
    synth,
    view
  };
};

export default track;
