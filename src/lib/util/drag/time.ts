import type { DragEventHandler } from 'svelte/elements';
import { get } from 'svelte/store';
import tracks from '$lib/stores/tracks';
import type { EventHandlerCreator } from '$lib/util/definitions/listener';
import type { Track } from '$lib/util/definitions/tracks';

type DropHandlerCreator = EventHandlerCreator<[number, string, number], DragEventHandler<HTMLDivElement>>

export const handleDragLeave: DragEventHandler<HTMLDivElement> = (e: DragEvent): any =>
  e.dataTransfer!.types.includes('siren/region') &&
    (e.currentTarget as HTMLButtonElement).classList.remove('outline', 'outline-blue-600');

export const handleDragOver: DragEventHandler<HTMLDivElement> = (e: DragEvent): any => {
  if (!e.dataTransfer!.types.includes('siren/region')) return;
  e.dataTransfer!.dropEffect = 'move';
  (e.currentTarget as HTMLButtonElement).classList.add('outline', 'outline-blue-600');
};

export const handleDrop: DropHandlerCreator =
  (trackId: number, parameter: string, regionId: number) =>
    (e: DragEvent): void => {
      if (!e.dataTransfer!.types.includes('siren/region') || get(get(get(tracks)[trackId].regions.timbral)[parameter][regionId].link) !== -1) return;
      const { id, column }: { id: number, column: string } = JSON.parse(e.dataTransfer!.getData('siren/region'));
      (e.target as HTMLButtonElement)?.classList.remove('bg-gray-100');
      const track: Track = get(tracks)[trackId];
      const newId: number = track.regions.time.add(parameter, {
        link: regionId,
        offset: get(get(track.regions.timbral)[parameter][regionId].offset),
        source: { id, column }
      });
      get(track.regions.timbral)[parameter][regionId].link.set(newId);
      (e.currentTarget as HTMLButtonElement).classList.remove('outline', 'outline-blue-600');
    };
