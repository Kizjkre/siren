import { get, type Writable, writable } from 'svelte/store';
import type { Track, TrackRegion, TrackRegionStore, TrackRegionStoreStructure } from '$lib/util/definitions/tracks';
import defaultdict from '$lib/util/defaultdict';
import type { RegionSource } from '$lib/util/definitions/region';
import region from '$lib/stores/region';
import data from '$lib/stores/data';
import synths from '$lib/stores/synths';

type TrackInit = () => Track;

const store: (dict: DefaultDict<TrackRegionStoreStructure>) => TrackRegionStore =
  (dict: DefaultDict<TrackRegionStoreStructure>): TrackRegionStore => {
    const { subscribe, update }: Writable<DefaultDict<TrackRegionStoreStructure>> = writable(dict);

    return {
      add: (parameter: string, config: RegionSource): any => {
        update((store: DefaultDict<TrackRegionStoreStructure>): DefaultDict<TrackRegionStoreStructure> => {
          store[parameter][new Date().getTime()] = region(config);
          return store;
        });
        get(data)[config.source.id].references.update(
          (ref: number): number => ref + 1
        );
      },
      remove: (parameter: string, id: number): any =>
        update((store: DefaultDict<TrackRegionStoreStructure>): DefaultDict<TrackRegionStoreStructure> => {
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
    timbral: store(defaultdict(Object as unknown as TrackRegionStoreStructure)),
    time: store(defaultdict(Object as unknown as TrackRegionStoreStructure))
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
