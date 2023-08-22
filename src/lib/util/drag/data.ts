import type { DragEventHandler } from 'svelte/elements';
import { get, type Readable } from 'svelte/store';
import tracks from '$lib/stores/tracks';
import type { TrackStore } from '$lib/util/definitions/tracks';

export const handleDragLeave: DragEventHandler<HTMLDivElement> = (e: DragEvent): false | void | undefined =>
  e.dataTransfer?.types.includes('siren/region') && (e.target as HTMLDivElement).classList.remove('bg-gray-100');

export const handleDragOver: DragEventHandler<HTMLDivElement> = (e: DragEvent): void => {
  if (!e.dataTransfer?.types.includes('siren/region')) return;
  e.dataTransfer.dropEffect = 'move';
  (e.target as HTMLDivElement).classList.add('bg-gray-100');
};

export const handleDragStart: (id: number, column: string) => DragEventHandler<HTMLButtonElement> =
  (id: number, column: string) =>
    (e: DragEvent): void =>
      e.dataTransfer?.setData('siren/region', JSON.stringify({ id, column }));

export const handleDrop: (id: number, parameter: string, time?: boolean) => DragEventHandler<HTMLDivElement> =
  (trackId: number, parameter: string, time?: boolean) =>
    (e: DragEvent): void => {
      if (!e.dataTransfer?.types.includes('siren/region')) return;
      const { id, column }: { id: number, column: string } = JSON.parse(e.dataTransfer.getData('siren/region'));
      (e.target as HTMLDivElement)?.classList.remove('bg-gray-100');
      get((tracks as unknown as Readable<TrackStore>))[trackId].regions[time ? 'time' : 'timbral'].add(parameter, { source: { id, column } })
    };
