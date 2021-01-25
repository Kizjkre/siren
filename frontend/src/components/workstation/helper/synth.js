import { SCALES } from '../../../constants/workstation';
import * as Tone from 'tone';

const osc = [];
const gain = [];

export const play = async (tracks, globalSettings) => {
  const bpm = globalSettings.bpm < 0 ? 60 : globalSettings.bpm;
  const key = globalSettings.key === 'none' ? 'chromatic' : globalSettings.key;

  Tone.Transport.bpm.value = bpm;

  tracks.forEach((d, i) => {
    if (d.settings.channel.length === 0) {
      const max = Math.max(...d.data);
      const min = Math.min(...d.data);
      const num = SCALES[key].length * 2;
      const normalize = x => Math.round(num / (max - min) * (x - min));

      gain.push(new Tone.Gain(d.settings.mute ? 0 : d.settings.volume / tracks.length / 100).toDestination());

      // TODO: More oscillator types
      osc.push(new Tone.OmniOscillator(440 * (i + 1), 'sine').connect(gain[gain.length - 1]).toDestination());
      console.log(440 * (i + 1));

      // DEBUG
      osc[osc.length - 1].debug = true;

      const melody = [];

      // d.data.forEach((datum, i) => {
      //   const index = normalize(datum);
      //   melody.push([`0:${ i }`, `${ SCALES[key][index % SCALES[key].length] }${ 4 + Math.floor(index / SCALES[key].length) }`]);
      // });
      //
      // if (d.settings.continuous) {
      //   melody.forEach(([time, note]) => {
      //     osc[osc.length - 1].frequency.linearRampToValueAtTime(osc[osc.length - 1].toFrequency(note), osc[osc.length - 1].toSeconds(time));
      //   });
      // } else {
      //   const part = new Tone.Part((time, note) => {
      //     osc[osc.length - 1].frequency.setValueAtTime(osc[osc.length - 1].toFrequency(note), time);
      //   }, melody);
      //
      //   part.start(0);
      // }

      osc[osc.length - 1].start(0);
      // osc[osc.length - 1].stop(osc[osc.length - 1].toSeconds(melody[melody.length - 1][0]));
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
