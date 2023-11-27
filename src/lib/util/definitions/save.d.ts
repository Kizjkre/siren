interface StateData {
  [id: string]: {
    name: string,
    columns: (string | number | symbol)[]
    data: {
      [column: string]: any
    }[],
    references: number
  }
}

interface StateMap {
  [id: string]: {
    map: string,
    name: string
  }
}

interface StateSynths {
  [id: string]: {
    name: string;
    code: string;
    parameters: {
      timbral: {
        [key: string]: 'nominal' | 'ordinal' | 'quantitative'
      },
      time: string[]
    };
    references: number;
  };
}

interface StateRegion {
  data: any[],
  offset: number,
  source: { id: number, column: string }
}

interface StateRegions {
  [id: string]: StateRegion
}

interface StateTrack {
  gain: number,
  name: string,
  regions: {
    time: { [id: string]: StateRegions },
    timbral: { [id: string]: StateRegions }
  }
  synth: number,
  view: string
}

interface StateTracks {
  [id: string]: StateTrack
}

interface State {
  data: StateData,
  duration: number,
  mappings: StateMap,
  rate: number,
  sidebar: boolean,
  synths: StateSynths,
  tracks: StateTracks,
  width: number
}
