type BlobReader = (blob: Blob) => Promise<Uint8Array>;
type Merger = (blobs: Blob[]) => Promise<Blob | void>;
