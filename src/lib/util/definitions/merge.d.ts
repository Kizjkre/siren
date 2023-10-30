type AudioBufferToArrayConverter = (audioBuffer: AudioBuffer, targetArray: Uint8Array, offset: number, bitDepth: number) => any;
type AudioBufferToWavConverter = (audioBuffer: AudioBuffer, as32BitFloat: any) => Blob;
type BitWriter = (value: any, targetArray: Uint8Array, offset: number) => any;
type FloatToIntConverter = (f: number) => any;
type Merger = (blobs: Blob[]) => Promise<Blob>;
