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
const readBlob: BlobReader = (blob: Blob): Promise<Uint8Array> =>
  new Promise((resolve: Function): any => {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (): any => {
      const { result }: { result: string | ArrayBuffer | null } = fileReader;
      if (result instanceof ArrayBuffer) {
        resolve(new Uint8Array(result));
      } else {
        resolve(new Uint8Array());
      }
    };
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

export const merge: Merger = async (blobs: Blob[]): Promise<Blob | void> => {
  if (!f) await ffmpeg;

  const hasDir: boolean = (await f.listDir('.')).find(({ name, isDir }: FSNode): boolean => name === 'merge' && isDir);

  if (!hasDir) await f.createDir('merge');
  else
    await Promise.all(
      (await f.listDir('merge'))
        .map(async ({ name, isDir }: FSNode): Promise<boolean> =>
          !isDir && f.deleteFile(`merge/${ name }`)
        )
    );

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

  // await f.exec([
  //   '-i',
  //   'merge/intermediate.wav',
  //   '-filter:a',
  //   'atempo=0.5,atempo=0.5,atempo=0.5',
  //   '-vn',
  //   'merge/output.wav'
  // ]);

  const output: Uint8Array = await f.readFile('merge/output.wav');

  return new Blob([output], { type: 'audio/wav' });
};
