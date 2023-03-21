export const INITIAL_STATE = Object.freeze({
  datasets: {},
  mappings: {},
  seconds: 32,
  sidebar: true,
  synths: {},
  timelineWidth: 100,
  tracks: []
});

export const INITIAL_TRACK = Object.freeze({
  name: 'New Track',
  regions: {},
  synth: 'Default',
  view: 'Frequency'
});

export const INITIAL_REGION = (data, accessor) => ({
  accessor,
  data,
  length: Array(data.length).fill().map(() => 0.25),
  mapping: 'Default',
  start: 0
});


export const INITIAL_SYNTH = code => ({
  code,
  parameters: {},
  port: null,
  uuid: crypto.randomUUID?.() || Math.random() // TODO: fix hack
});
