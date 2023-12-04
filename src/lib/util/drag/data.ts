import type { DragEventHandler } from 'svelte/elements';
import { get } from 'svelte/store';
import tracks from '$lib/stores/tracks';
import type { EventHandlerCreator } from '$lib/util/definitions/client/listener';

type DragStartHandlerCreator = EventHandlerCreator<[number, string], DragEventHandler<HTMLButtonElement>>;
type DropHandlerCreator = EventHandlerCreator<[number, string, boolean], DragEventHandler<HTMLDivElement>>

export const handleDragLeave: DragEventHandler<HTMLDivElement> = (e: DragEvent): any =>
  e.dataTransfer!.types.includes('siren/region') && (e.target as HTMLDivElement).classList.remove('bg-gray-100');

export const handleDragOver: DragEventHandler<HTMLDivElement> = (e: DragEvent): any => {
  if (!e.dataTransfer!.types.includes('siren/region')) return;
  e.dataTransfer!.dropEffect = 'move';
  (e.target as HTMLDivElement).classList.add('bg-gray-100');
};

export const handleDragStart: DragStartHandlerCreator =
  (id: number, column: string) =>
    (e: DragEvent): void =>
      e.dataTransfer!.setData('siren/region', JSON.stringify({ id, column }));

export const handleDrop: DropHandlerCreator =
  (trackId: number, parameter: string, time?: boolean) =>
    (e: DragEvent): void => {
      if (!e.dataTransfer!.types.includes('siren/region')) return;
      const { id, column }: { id: number, column: string } = JSON.parse(e.dataTransfer!.getData('siren/region'));
      (e.target as HTMLDivElement)?.classList.remove('bg-gray-100');
      get(tracks)[trackId].regions[time ? 'time' : 'timbral'].add(parameter, {
        source: { id, column }
      });
    };
