import { SCALES } from '../../../constants/workstation';
import * as Tone from 'tone';

let synth;

export const play = async (tracks, globalSettings) => {
  synth = new Tone.Synth().toDestination();

  const bpm = globalSettings.bpm < 0 ? 60 : globalSettings.bpm;
  const key = globalSettings.key === 'none' ? 'chromatic' : globalSettings.key;

  Tone.Transport.bpm.value = bpm;

  tracks.forEach(d => {
    if (d.settings.channel.length === 0) {
      synth.volume.value = d.settings.mute ? 0 : 53 / 50 * (d.settings.volume / tracks.length - 100) + 6;
      console.log(d.settings.mute ? 0 : 53 / 50 * (d.settings.volume / tracks.length - 100) + 6, synth.volume);

      const max = Math.max(...d.data);
      const min = Math.min(...d.data);
      const num = SCALES[key].length * 2;
      const normalize = x => Math.round(num / (max - min) * (x - min));

      const melody = [];

      if (d.settings.continuous) {
        // d.data.forEach((datum, i) => {
        //   const index = normalize(datum);
        //
        // });
      } else {
        d.data.forEach((datum, i) => {
          const index = normalize(datum);
          melody.push([`0:${ i }`, `${ SCALES[key][index % SCALES[key].length] }${ 4 + Math.floor(index / SCALES[key].length) }`]);
        });
      }

      const part = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note, '4n', time);
      }, melody);

      part.start(0);

      Tone.Transport.start();

    }
  });

  globalSettings.channels.forEach(c => {
    console.log(c);
  });
};

export const pause = () => Tone.Transport.pause();

export const stop = () => Tone.Transport.stop();
