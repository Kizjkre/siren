type BlobReader = (blob: Blob) => Promise<Uint8Array>;
type Init = (dir: string) => Promise<any>;
type Merger = (blobs: Blob[]) => Promise<Blob | void>;
