import { get, writable } from 'svelte/store';
// @ts-ignore
import action from '$lib/util/sandbox/play?raw';
import synths from '$lib/stores/synths';
import timeline from '$lib/util/timeline';
import sandbox from '$lib/stores/sandbox';
import status from '$lib/stores/status';
import { Status, type StatusChange } from '$lib/util/definitions/status.d';
import { io } from 'socket.io-client';
import recordStore from '$lib/stores/record';
import tracks from '$lib/stores/tracks';
import trackSelect from '$lib/stores/trackSelect';
import type { RecordMetadata, Track } from '$lib/util/definitions/tracks';
import data from '$lib/stores/data';
import type { DSVParsedArray } from 'd3-dsv';
import type { DSVRowAny } from '$lib/util/definitions/region';

let sandboxId: number = 0;

export const end: StatusChange = (): any => {
  get(recordStore)?.disconnect();

  sandbox.send(`record-${ sandboxId }`, { action: 'stop' });
  sandbox.remove(`record-${ sandboxId }`);

  status.set(Status.stop);
};

/**
 * Pauses the execution of the program.
 *
 * @return {any} - The return value is not specified.
 */
export const pause: StatusChange = (): any => {
  sandbox.send('play', { action: 'pause' });

  status.set(Status.pause);
};

/**
 * Executes the play function.
 *
 * @return {any} The result of the execution.
 */
export const play: StatusChange = (): any => {
  if (get(status) === Status.pause) {
    sandbox.send('play', { action: 'resume' });
  } else {
    const t: Timeline[] = timeline();

    sandbox.add('play', {
      action,
      data: writable<{}>({ action: 'play', payload: { timeline: t } }),
      scripts: Object.fromEntries(t.map((timeline: Timeline, i: number): [string, string] => [`userscript-${ i }`, get(synths)[timeline.synth].code]))
    });
  }

  status.set(Status.play);
};

export const record: StatusChange = async (): Promise<any> => {
  const jwt: string = localStorage.getItem('access') ?? await (async (): Promise<string> => {
    const token: `${ string }-${ string }-${ string }-${ string }-${ string }` = crypto.randomUUID();
    localStorage.setItem('access', token);
    return token;
  })();

  const track: Track = get(tracks)[get(trackSelect)];
  const { id, timeId, columnTimbral, columnTime, customData }: RecordMetadata = track.regions.timbral.record(get(track.view));

  const d: DSVParsedArray<any> = get(data)[customData].data;

  let first: boolean = true;

  let start: DOMHighResTimeStamp = performance.now();

  recordStore.set(
    io(`${ window.location.protocol === 'https:' ? 'wss' : 'ws' }://${ window.location.hostname }:3001`)
  );

  get(recordStore).emit('access', jwt);
  get(recordStore).on(`/${ jwt }`, (message: [{ type: string; value: any; }]): any => {
    message = message[0].value;
    d.push({ [columnTimbral]: message, [columnTime]: (performance.now() - start) / 1000 });

    start = performance.now();

    get(get(tracks)[get(trackSelect)].regions.timbral)[get(track.view)][id].data.set(
      d
        .map((row: DSVRowAny): any => row[columnTimbral])
        .filter((row: any): boolean => row !== null)
    );

    get(get(tracks)[get(trackSelect)].regions.time)[get(track.view)][timeId].data.set(
      d
        .map((row: DSVRowAny): any => row[columnTime])
        .filter((row: any): boolean => row !== null)
    );

    // TODO: jank
    if (first) {
      first = false;
    } else {
      sandbox.send(`record-${ sandboxId }`, { action: 'stop' });
      sandbox.remove(`record-${ sandboxId }`);
    }
    sandboxId++;
    sandbox.add(`record-${ sandboxId }`, {
      action,
      data: writable<{}>({ action: 'play', payload: { timeline: [{ 0: { [get(track.view)]: message }, synth: get(track.synth) }] } }),
      scripts: {
        [`userscript-0`]: get(synths)[get(track.synth)].code
      }
    });

    data.update(customData, d);
  });

  status.set(Status.record);
};

/**
 * Stops the execution of the program.
 *
 * @return {any} This function does not return anything.
 */
export const stop: StatusChange = async (): Promise<any> => {
  sandbox.send('play', { action: 'stop' });
  await sandbox.read('play', 'close', true);

  status.set(Status.stop);
};
