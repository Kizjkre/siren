// @ts-ignore
import { browser } from '$app/environment';

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
  if (browser) {
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

export const convert: Converter = async (blob: Blob): Promise<Blob> => {
  if (!f) await ffmpeg;

  const type: string = blob.type.split(';')[0];

  await f.createDir('convert');
  await f.writeFile(`convert/input.${ mapping[type] }`, await readBlob(blob));
  await f.exec(['-i', `convert/input.${ mapping[type] }`, 'convert/output.wav']);

  const output: Uint8Array = await f.readFile('convert/output.wav');

  return new Blob([output], { type: 'audio/wav' });
};

export const merge: Merger = async (blobs: Blob[]): Promise<Blob> => {
  if (!f) await ffmpeg;

  await f.createDir('merge');

  await Promise.all(blobs.map(async (blob: Blob, i: number): Promise<any> =>
    f.writeFile(`merge/input-${ i }.${ mapping[blob.type.split(';')[0]] }`, await readBlob(blob))
  ));
  const args: string[] = blobs
    .map((blob: Blob, i: number): string[] => ['-i', `merge/input-${ i }.${ mapping[blob.type.split(';')[0]] }`])
    .flat();

  // REF: https://superuser.com/a/645238
  await f.exec([...args, '-filter_complex', `amix=inputs=${ blobs.length }`, 'merge/output.wav']);

  const output: Uint8Array = await f.readFile('merge/output.wav');

  return new Blob([output], { type: 'audio/wav' });
};
