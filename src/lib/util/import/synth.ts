import type { ChangeEventHandler } from 'svelte/elements';
import synths from '$lib/stores/synths';

const handleImportSynthChange: ChangeEventHandler<HTMLInputElement> = (e: Event): void => {
  const target: HTMLInputElement = (e.target as HTMLInputElement);
  [...target.files || []].forEach(async (file: File): Promise<void> => {
    const url: string = URL.createObjectURL(file);
    synths.add(file.name, await (await fetch(url)).text());
    URL.revokeObjectURL(url);
    target.value = '';
  });
};

export default handleImportSynthChange;
