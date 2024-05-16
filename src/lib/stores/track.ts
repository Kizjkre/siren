import { get, type Writable, writable } from 'svelte/store';
import type {
  RecordMetadata,
  Track,
  TrackInit,
  TrackRegion,
  TrackRegionStore,
  TrackRegionStoreInterface
} from '$lib/util/definitions/tracks';
import defaultdict from '$lib/util/defaultdict';
import type { RegionSource } from '$lib/util/definitions/region';
import region from '$lib/stores/region';
import data from '$lib/stores/data';
import synths from '$lib/stores/synths';
import type { DataStore } from '$lib/util/definitions/data';
import tracks from '$lib/stores/tracks';
import trackSelect from '$lib/stores/trackSelect';

const store: (dict: DefaultDict<TrackRegionStore>) => TrackRegionStoreInterface =
  (dict: DefaultDict<TrackRegionStore>): TrackRegionStoreInterface => {
    const { subscribe, update }: Writable<DefaultDict<TrackRegionStore>> = writable(dict);

    let customData: number = -1;

    data.subscribe((d: DataStore) => !(customData in d) && (customData = -1));

    return {
      add: (parameter: string, config: RegionSource): number => {
        const id: number = new Date().getTime();
        update((store: DefaultDict<TrackRegionStore>): DefaultDict<TrackRegionStore> => {
          store[parameter][id] = region(config);
          return store;
        });
        get(data)[config.source.id].references.update(
          (ref: number): number => ref + 1
        );

        return id;
      },
      record: (parameter: string): RecordMetadata => {
        customData === -1 && (customData = data.add('Recorded Dataset', ''));
        const columnTimbral: string = 'Timbral-' + new Date().getTime();
        const columnTime: string = 'Time-' + new Date().getTime();
        const d: any = get(data)[customData].data;
        !('columns' in d) && (d.columns = []);
        d.columns.push(columnTimbral, columnTime);
        data.update(customData, d);

        const id: number = new Date().getTime();

        const timeId: number = get(tracks)[get(trackSelect)].regions.time.add(parameter, {
          source: {
            id: customData,
            column: columnTime
          },
          link: id
        });

        update((store: DefaultDict<TrackRegionStore>): DefaultDict<TrackRegionStore> => {
          store[parameter][id] = region({
            source: {
              id: customData,
              column: columnTimbral
            },
            link: timeId
          });
          return store;
        });

        get(data)[customData].references.update(
          (ref: number): number => ref + 1
        );

        // let start: number | undefined;
        // const u = (time: number) => {
        //   start === undefined && (start = time);
        //
        //   d[0][columnTime] = (time - start) / 1000;
        //   data.update(customData, d);
        //
        //   get(get(tracks)[get(trackSelect)].regions.timbral)[parameter][id].data.set(
        //     d
        //       .map((row: DSVRowAny): any => row[columnTimbral])
        //       .filter((row: any): boolean => row !== null)
        //   );
        //
        //   get(get(tracks)[get(trackSelect)].regions.time)[parameter][timeId].data.set(
        //     d
        //       .map((row: DSVRowAny): any => row[columnTime])
        //       .filter((row: any): boolean => row !== null)
        //   );
        //
        //   get(status) === Status.record && requestAnimationFrame(u);
        // };
        //
        // requestAnimationFrame(u);

        return { id, timeId, columnTimbral, columnTime, customData };
      },
      remove: (parameter: string, id: number): any =>
        update((store: DefaultDict<TrackRegionStore>): DefaultDict<TrackRegionStore> => {
          get(data)[store[parameter][id].source.id].references.update((ref: number): number => ref - 1);
          delete store[parameter][id];
          return store;
        }),
      subscribe
    }
  };

const track: TrackInit = (): Track => {
  const gain: Writable<number> = writable<number>(1);
  const name: Writable<string> = writable<string>('New Track');
  const regions: TrackRegion = {
    timbral: store(defaultdict<TrackRegionStore>(Object as unknown as TrackRegionStore)),
    time: store(defaultdict<TrackRegionStore>(Object as unknown as TrackRegionStore))
  };
  const synth: Writable<number> = writable<number>(0);
  const view: Writable<string> = writable<string>('Frequency');

  get(synths)[0].references.update((refs: number): number => refs + 1);

  return {
    gain,
    name,
    regions,
    synth,
    view
  };
};

export default track;
