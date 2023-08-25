import type { ChangeEventHandler } from 'svelte/elements';
import data from '$lib/stores/data';

const handleImportCSVChange: ChangeEventHandler<HTMLInputElement> = (e: Event): any => {
  const target: HTMLInputElement = (e.target as HTMLInputElement);
  [...target.files || []].forEach(async (file: File): Promise<any> => {
    const url: string = URL.createObjectURL(file);
    const csv: string = await (await fetch(url)).text();
    data.add(file.name, csv);
    URL.revokeObjectURL(url);
    target.value = '';
  });
};

export default handleImportCSVChange;
