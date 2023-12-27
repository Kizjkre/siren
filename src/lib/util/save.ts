import { get } from 'svelte/store';
import data from '$lib/stores/data';
import duration from '$lib/stores/duration';
import mappings from '$lib/stores/mappings';
import rate from '$lib/stores/rate';
import sidebar from '$lib/stores/sidebar';
import synths from '$lib/stores/synths';
import tracks from '$lib/stores/tracks';
import width from '$lib/stores/width';
import type { Data, DataStore } from '$lib/util/definitions/client/data';
import type { Mapping, MappingStore } from '$lib/util/definitions/client/mappings';
import type { Synth, SynthStore } from '$lib/util/definitions/client/synths';
import type { Track, TrackRegionStore, TrackStore } from '$lib/util/definitions/client/tracks';
import type { Region } from '$lib/util/definitions/client/region';
import download from '$lib/util/download';
import type {
  State,
  StateData,
  StateMap, StateRegion,
  StateSynths,
  StateTrack,
  StateTracks
} from '$lib/util/definitions/client/save';

const save: () => any = (): any => {
  // NOTE: Change to zip once sound files are implemented
  const state: State = {
    data: (() => {
      const d: DataStore = get(data);
      const serializable: StateData = {};

      Object.entries(d).forEach(([key, value]: [string, Data]): any =>
        serializable[key] = {
          name: value.name,
          columns: value.data.columns,
          data: value.data,
          references: get(value.references)
        }
      );

      return serializable;
    })(),
    duration: get(duration),
    mappings:  (() => {
      const m: MappingStore = get(mappings);
      const serializable: StateMap = {};

      Object.entries(m).forEach(([key, value]: [string, Mapping]): any =>
        serializable[key] = {
          map: get(value.map),
          name: get(value.name)
        }
      );

      return serializable;
    })(),
    rate: get(rate),
    sidebar: get(sidebar),
    synths: (() => {
      const s: SynthStore = get(synths);
      const serializable: StateSynths = {};

      Object.entries(s).forEach(([key, value]: [string, Synth]): any =>
        serializable[key] = {
          name: value.name,
          code: value.code,
          parameters: structuredClone(value.parameters),
          references: get(value.references)
        }
      );

      return serializable;
    })(),
    tracks: (() => {
      const t: TrackStore = get(tracks);

      const serializable: StateTracks = {};

      Object.entries(t).forEach(([key, value]: [string, Track]): any => {
        serializable[key] = {} as unknown as StateTrack;

        serializable[key].gain = get(value.gain);
        serializable[key].name = get(value.name);
        serializable[key].regions = {
          time: {},
          timbral: {}
        };

        Object.entries(get(value.regions.time)).forEach(([key2, value2]: [string, TrackRegionStore]): any => {
          serializable[key].regions.time[key2] = {};
          Object.entries(value2).forEach(([key3, value3]: [string, Region]): any => {
            serializable[key].regions.time[key2][key3] = {} as unknown as StateRegion;
            serializable[key].regions.time[key2][key3].data = get(value3.data);
            serializable[key].regions.time[key2][key3].offset = get(value3.offset);
            serializable[key].regions.time[key2][key3].source = structuredClone(value3.source);
            serializable[key].regions.time[key2][key3].type = get(value3.type);
          });
        });

        Object.entries(get(value.regions.timbral)).forEach(([key2, value2]: [string, TrackRegionStore]): any => {
          serializable[key].regions.timbral[key2] = {};
          Object.entries(value2).forEach(([key3, value3]: [string, Region]): any => {
            serializable[key].regions.timbral[key2][key3] = {} as unknown as StateRegion;
            serializable[key].regions.timbral[key2][key3].data = get(value3.data);
            serializable[key].regions.timbral[key2][key3].offset = get(value3.offset);
            serializable[key].regions.timbral[key2][key3].source = structuredClone(value3.source);
            serializable[key].regions.timbral[key2][key3].type = get(value3.type);
          });
        });

        serializable[+key].synth = get(value.synth);
        serializable[+key].view = get(value.view);
      });

      return serializable;
    })(),
    width: get(width)
  };

  console.log(state);

  download('siren-session.json', new Blob([JSON.stringify(state)]));
};

export default save;
