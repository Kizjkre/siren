// @ts-ignore
import { browser, dev } from '$app/environment';
import type { FSNode } from '@ffmpeg/ffmpeg/dist/esm/types';

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    ffmpeg?: boolean
  }
}

const mapping: { [key: string]: string } = {
  'audio/wav': 'wav',
  'audio/mpeg': 'mp3',
  'audio/mp3': 'mp3',
  'audio/mp4': 'mp4',
  'audio/ogg': 'ogg',
  'audio/x-aiff': 'aiff',
  'audio/webm': 'webm'
};

// REF: https://github.com/ffmpegwasm/ffmpeg.wasm/blob/97ef9aaaa2c686f59a175fada56cc33e770e8c14/packages/util/src/index.ts#L8
/**
 * Reads a Blob and returns its contents as a Uint8Array.
 * @param blob - The Blob to read.
 * @returns A Promise that resolves with the Blob's contents as a Uint8Array.
 */
const readBlob: BlobReader = (blob: Blob): Promise<Uint8Array> =>
  new Promise((resolve: Function): any => {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (): any => {
      const { result }: { result: string | ArrayBuffer | null } = fileReader;

      // Check if the result is an ArrayBuffer
      if (result instanceof ArrayBuffer) {
        resolve(new Uint8Array(result));
      } else {
        // If the result is not an ArrayBuffer, resolve with an empty Uint8Array
        resolve(new Uint8Array());
      }
    };

    // Read the Blob as an ArrayBuffer
    fileReader.readAsArrayBuffer(blob);
  });


let f: any;

const ffmpeg: Promise<void> = new Promise(async (resolve: Function): Promise<any> => {
  if (browser && (!dev || (dev && !window.ffmpeg))) {
    if (!window.ffmpeg) window.ffmpeg = true;

    const url: URL = new URL(location.href);

    const { FFmpeg }: { FFmpeg: any } = await import('@ffmpeg/ffmpeg');

    f = new FFmpeg();
    await f.load({
      coreURL: `${ url.protocol }//${ url.host }/ffmpeg/ffmpeg-core.js`,
      wasmURL: `${ url.protocol }//${ url.host }/ffmpeg/ffmpeg-core.wasm`,
      workerURL: `${ url.protocol }//${ url.host }/ffmpeg/worker.js`
    });

    resolve();
  }
});

/**
 * Initializes the directory with the given name.
 * If the directory does not exist, it will be created.
 * If the directory already exists, all files in the directory will be deleted.
 *
 * @param dir - The name of the directory to initialize.
 * @returns A Promise that resolves when the initialization is complete.
 */
const init: Init = async (dir: string): Promise<any> => {
  if (!f) await ffmpeg;

  // Check if the directory already exists
  const hasDir: boolean = (await f.listDir('.')).find(({ name, isDir }: FSNode): boolean => name === dir && isDir);

  if (!hasDir) {
    // Create the directory if it does not exist
    await f.createDir(dir);
  } else {
    // Delete all files in the directory if it exists
    await Promise.all(
      (await f.listDir(dir))
        .map(async ({ name, isDir }: FSNode): Promise<boolean> =>
          !isDir && f.deleteFile(`${ dir }/${ name }`)
        )
    );
  }
};

export const merge: Merger = async (blobs: Blob[]): Promise<Blob | void> => {
  await init('merge');

  blobs = blobs.filter((blob: Blob): boolean => blob.size > 0);

  if (blobs.length === 0) return;

  await Promise.all(
      blobs.map(async (blob: Blob, i: number): Promise<any> =>
        f.writeFile(`merge/input-${ i }.${ mapping[blob.type.split(';')[0]] }`, await readBlob(blob))
      )
  );
  const args: string[] = blobs
    .map((blob: Blob, i: number): string[] => ['-i', `merge/input-${ i }.${ mapping[blob.type.split(';')[0]] }`])
    .flat();

  if (args.length === 0) return;

  // REF: https://superuser.com/a/645238
  await f.exec([
    ...args,
    '-filter_complex',
    `amix=inputs=${ blobs.length }`,
    'merge/output.wav'
  ]);

  const output: Uint8Array = await f.readFile('merge/output.wav');

  return new Blob([output], { type: 'audio/wav' });
};
