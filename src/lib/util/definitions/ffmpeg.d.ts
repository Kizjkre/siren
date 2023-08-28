type BlobReader = (blob: Blob) => Promise<Uint8Array>;
type Converter = (blob: Blob) => Promise<Blob>;
type Merger = (blobs: Blob[]) => Promise<Blob>;
