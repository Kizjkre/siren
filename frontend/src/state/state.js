import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { STATUS } from '../constants/constants';
import {
  INITIAL_MAP,
  INITIAL_PORT,
  INITIAL_REGION,
  INITIAL_STATE,
  INITIAL_SYNTH,
  INITIAL_TRACK
} from '../constants/state';

export const [state, setState] = createStore(INITIAL_STATE);
export const [status, setStatus] = createSignal(STATUS.STOPPED);
export const [port, setPort] = createStore(INITIAL_PORT);

export const addDataset = (filename, data) => setState('datasets', filename, () => data);
export const addMapping = (name, code) => setState('mappings', name, () => INITIAL_MAP(code));
export const addRegion = (i, parameter, data, accessor) => setState('tracks', i, 'regions', s => ({ ...s, [parameter]: [...(s[parameter] || []), INITIAL_REGION(data, accessor)] }));
export const addSynth = (name, code) => setState('synths', name, () => INITIAL_SYNTH(code));
export const addTrack = () => setState('tracks', s => [...s, structuredClone(INITIAL_TRACK)]);

export const removeDataset = filename => setState('datasets', filename, () => undefined);
export const removeMapping = name => setState('mappings', name, () => undefined);
export const removeTrack = i => setState('tracks', s => [...s.slice(0, i), ...s.slice(i + 1)]);
export const removeSynth = name => setState('synths', name, () => undefined);

export const toggleSidebar = () => setState('sidebar', s => !s);
export const updateMapping = (name, code) => setState('mappings', name, 'code', () => code);
// updateRegionLength: (index, parameter, i, length) => setState('tracks', index, 'regions', parameter, i, 'length', () => length),
export const updateRegionMapping = (index, parameter, i, mapping, data) => {
  setState('tracks', index, 'regions', parameter, i, 'mapping', () => mapping);
  setState('tracks', index, 'regions', parameter, i, 'data', () => data);
};
export const updateRegionStart = (index, parameter, i, start) => setState('tracks', index, 'regions', parameter, i, 'start', () => start);
export const updateSynthParameters = (name, parameters) => setState('synths', name, 'parameters', () => parameters);
export const updateTrackName = (i, name) => setState('tracks', i, 'name', () => name);
export const updateTrackSynth = (i, synth) => setState('tracks', i, 'synth', () => synth);
export const updateTrackView = (i, view) => setState('tracks', i, 'view', () => view);

export const updateMappingPort = (name, port) => setPort('mappings', name, () => port);
export const updateSynthPort = (name, port) => setPort('synths', name, () => port);
