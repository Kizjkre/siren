import { SCALES } from '../constants/workstation';
import * as Tone from 'tone';

const osc = [];
const gain = [];

export const play = async (tracks, globalSettings) => {
  const bpm = globalSettings.bpm < 0 ? 60 : globalSettings.bpm;
  const key = globalSettings.key === 'none' ? 'chromatic' : globalSettings.key;

  Tone.Transport.bpm.value = bpm;

  const master = new Tone.Gain(1 / tracks.length).toDestination();

  tracks.forEach(d => {
    if (d.settings.channel.length === 0) {
      const max = Math.max(...d.data);
      const min = Math.min(...d.data);
      const num = SCALES[key].length * 2;
      const normalize = x => Math.round(num / (max - min) * (x - min));

      gain.push(new Tone.Gain(d.settings.mute ? 0 : d.settings.volume / 100));

      // TODO: More oscillator types
      osc.push(new Tone.OmniOscillator(0, 'sine').connect(master));

      osc[osc.length - 1].debug = true;

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

      osc[osc.length - 1].start(0);
      osc[osc.length - 1].stop(osc[osc.length - 1].toSeconds(melody[melody.length - 1][0]));
    }
  });

  globalSettings.channels.forEach(c => {
    console.log(c);
  });

  Tone.Transport.start();
};

export const pause = () => Tone.Transport.pause();

export const stop = () => {
  Tone.Transport.stop();
  osc.forEach(o => o.stop());
  osc.splice(0);
};
