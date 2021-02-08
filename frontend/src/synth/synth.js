import { SCALES } from '../constants/workstation';
import * as Tone from 'tone';
import * as d3 from 'd3';


// TODO: remove these globals.
let IS_INITIALIZED = false;
const MASTER_GAIN = new Tone.Gain(0).toDestination();


// Each track can contain an audio graph of osc => panner => gain. The last
// gain is connected to the master gain.
// TODO: use maps with a track name instead of arrays.
const Oscillators = [];
const Panners = [];
const Gains = [];


/**
 * Initializes the synth for the first time. Note that created synth components
 * will remain alive until the execution context is trashed.
 * 
 * @param {*} tracks 
 * @param {*} globalSettings 
 */
const initializeIfNeeded = async (tracks, globalSettings) => {
  if (IS_INITIALIZED)
    return;

  console.log('synth::initializeIfNeeded()');

  MASTER_GAIN.gain.value = 1.0 / tracks.length;

  // Create and store synth components in the array to keep them alive.
  // TODO: How Tone.js manages the life cycle of its objects is unsure. So this
  // might leak.
  tracks.forEach(track => {
    const osc = new Tone.Oscillator(440, 'sine');
    const panner = new Tone.Panner(0);
    const gain = new Tone.Gain(0);
    osc.connect(panner).connect(gain).connect(MASTER_GAIN);

    Oscillators.push(osc);
    Panners.push(panner);
    Gains.push(gain);
  });

  IS_INITIALIZED = true;
};


/**
 * Build/manipulates track data and schedule data playback.
 * 
 * @param {*} tracks 
 * @param {*} globalSettings 
 */
export const play = async (tracks, globalSettings) => {
  console.log('synth::play()');

  initializeIfNeeded(tracks, globalSettings);

  // TODO: this is NOT ready for the runtime change. Consider moving them
  // somewhere else, or make them truly dynamic.
  const bpm = globalSettings.bpm < 0 ? 120 : globalSettings.bpm;
  const key = globalSettings.key === 'none' ? 'chromatic' : globalSettings.key;
  Tone.Transport.bpm.value = bpm;

  tracks.forEach((track, trackId) => {
    const osc = Oscillators[trackId];
    const panner = Panners[trackId];
    const gain = Gains[trackId];
    const melody = [];

    // TODO: consider using |isMuted| and |isContinuous|.
    const {mute, volume, pan, continuous, channel} = track.settings;

    // NOTE: Multi-channels are not supported currently.
    if (channel.length > 0) {
      console.log('synth::play() Multi-channels are not supported currently.');
      return;
    }

    // TODO: Assert these values before use them. Otherwise it could throw.
    panner.pan.value = pan / 50;
    gain.gain.value = mute ? 0.0 : volume / 100;

    // It's better to use D3's mapping functions. See this example:
    // https://codesandbox.io/s/webson-framework-demo-cmwos?file=/src/line.js
    const data = track.data;
    let freqMapFunc = d3.scalePow().exponent(8)
                        .domain(d3.extent(data, datum => datum))
                        .range([440, 1680]);
    
    data.forEach((value, index) => {
      // TODO: Use SCALE instead.
      melody.push([index, freqMapFunc(value)]);
    });

    
    // Schedule the playback of the prepared melody.
    const now = Tone.now();
    melody.forEach(([time, frequency]) => {
      // TODO: Consider using musical time base. (.rampTo function and etc)
      continuous
        ? osc.frequency.linearRampToValueAtTime(frequency, now + time / 30)
        : osc.frequency.setValueAtTime(frequency, now + time / 30);
    });

    /*
    if (d.settings.channel.length === 0) {
      const max = Math.max(...d.data);
      const min = Math.min(...d.data);
      const num = SCALES[key].length * 2;
      const normalize = x => Math.round(num / (max - min) * (x - min));

      gain.push(new Tone.Gain(d.settings.mute ? 0 : d.settings.volume / 100));
      pan.push(new Tone.Panner(d.settings.pan / 50).connect(master));

      osc.push(new Tone.OmniOscillator(0, 'sine')
        .connect(pan[pan.length - 1])
        .connect(gain[gain.length - 1]));

      const melody = [];

      d.data.forEach((datum, i) => {
        const index = normalize(datum);
        melody.push([`0:${ i }`, `${ SCALES[key][index % SCALES[key].length] }${ 4 + Math.floor(index / SCALES[key].length) }`]);
      });

      if (d.settings.continuous) {
        melody.forEach(([time, note]) => {
          osc[osc.length - 1].frequency.linearRampToValueAtTime(note, time);
        });
      } else {
        melody.forEach(([time, note]) => {
          osc[osc.length - 1].frequency.setValueAtTime(note, time);
        });
      }

      osc[osc.length - 1].sync().start(0);
    } 
    */
  });

  // NOTE: sync() method is unreliable. Manually start all sources.
  Oscillators.forEach(osc => osc.start());
  Tone.Transport.start();
};

export const pause = () => {
  console.log('synth::pause()');

  Tone.Transport.pause();
};

export const stop = () => {
  console.log('synth::stop()');

  // NOTE: sync() method is unreliable. Manually stop all sources.
  Oscillators.forEach(osc => osc.stop());
  Tone.Transport.stop();
};


// For debugging purpose.
// Tone.Transport.scheduleRepeat((time) => {
//   console.log('Tone.Trasport (8n) = ' + time);
// }, '8n', '1m');
