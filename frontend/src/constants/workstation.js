export const TRACK_CONTROLS_WIDTH = 4;
export const TRACK_WIDTH = 12 - TRACK_CONTROLS_WIDTH;

export const PLAYING_STATUS = Object.freeze({
  STOPPED: 0,
  PLAYING: 1,
  PAUSED: 2
});

export const DEFAULT_ADSRD = Object.freeze([0.025, 0, 1, 0.025, 0.5]);

export const ENVELOPE = Object.freeze(['Attack', 'Decay', 'Sustain', 'Release', 'Duration']);
export const TIME_FEATURES = Object.freeze({
  Attack: 0,
  Decay: 1,
  Release: 3,
  Duration: 4
});
