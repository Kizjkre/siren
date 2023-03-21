import { INITIAL_REGION, INITIAL_SYNTH, INITIAL_TRACK } from './state';

export default setState => ({
  addDataset: (filename, data) => setState('datasets', filename, () => data),
  addMapping: (name, code) => setState('mappings', name, () => code),
  addRegion: (i, parameter, data, accessor) => setState('tracks', i, 'regions', s => ({ ...s, [parameter]: [...(s[parameter] || []), INITIAL_REGION(data, accessor)] })),
  addSynth: (name, code) => setState('synths', name, () => INITIAL_SYNTH(code)),
  addTrack: () => setState('tracks', s => [...s, structuredClone(INITIAL_TRACK)]),

  removeDataset: filename => setState('datasets', filename, () => undefined),
  removeMapping: name => setState('mappings', name, () => undefined),
  removeTrack: i => setState('tracks', s => [...s.slice(0, i), ...s.slice(i + 1)]),
  removeSynth: name => setState('synths', name, () => undefined),

  toggleSidebar: () => setState('sidebar', s => !s),

  // updateRegionLength: (index, parameter, i, length) => setState('tracks', index, 'regions', parameter, i, 'length', () => length),
  updateRegionStart: (index, parameter, i, start) => setState('tracks', index, 'regions', parameter, i, 'start', () => start),
  updateSynthParameters: (name, parameters) => setState('synths', name, 'parameters', () => parameters),
  updateSynthPort: (name, port) => setState('synths', name, 'port', () => port),
  updateTrackName: (i, name) => setState('tracks', i, 'name', () => name),
  updateTrackSynth: (i, synth) => setState('tracks', i, 'synth', () => synth),
  updateTrackView: (i, view) => setState('tracks', i, 'view', () => view)
});
