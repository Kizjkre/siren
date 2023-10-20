/**
 * Downloads a file by creating a temporary URL and triggering a download.
 * @param name - The name of the file to be downloaded.
 * @param blob - The file content as a Blob object.
 */
const download: Downloader = (name: string, blob: Blob): any => {
  // Create a temporary URL for the file content
  const url: string = URL.createObjectURL(blob);

  // Create an anchor element to trigger the download
  const a: HTMLAnchorElement = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();

  // Revoke the temporary URL to free up memory
  URL.revokeObjectURL(url);
};
export default download;
