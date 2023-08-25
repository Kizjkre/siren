import type { DragEventHandler } from 'svelte/elements';
import type { Region } from '$lib/util/definitions/region';
import { emit } from '$lib/util/sandbox/useSandbox';
import data from '$lib/stores/data';
import { get } from 'svelte/store';
import mappings from '$lib/stores/mappings';
// @ts-ignore
import process from '$lib/util/sandbox/process/processMapping?raw';
import type { EventHandlerCreator } from '$lib/util/definitions/listener';

type DragStartHandlerCreator = EventHandlerCreator<[number], DragEventHandler<HTMLButtonElement>>;
type DropHandlerCreator = EventHandlerCreator<[Region], DragEventHandler<HTMLButtonElement>>;

export const handleDragLeave: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any =>
  e.dataTransfer!.types.includes('siren/mapping') &&
    (e.currentTarget as HTMLButtonElement).classList.remove('outline', 'outline-blue-600');

export const handleDragOver: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any => {
  if (!e.dataTransfer!.types.includes('siren/mapping')) return;
  e.dataTransfer!.dropEffect = 'move';
  (e.currentTarget as HTMLButtonElement).classList.add('outline', 'outline-blue-600');
};

export const handleDragStart: DragStartHandlerCreator =
  (id: number) => (e: DragEvent): void => e.dataTransfer!.setData('siren/mapping', '' + id);

export const handleDrop: DropHandlerCreator =
  (region: Region) =>
    (e: DragEvent): void => {
      if (!e.dataTransfer!.types.includes('siren/mapping')) return;
      const id: number = +e.dataTransfer!.getData('siren/mapping');
      (e.currentTarget as HTMLButtonElement).classList.remove('outline', 'outline-blue-600');

      const listener: EventListener = (e: CustomEventInit): any => {
        // @ts-ignore
        document.removeEventListener('siren-sandbox-return-mapping', listener);

        region.data.set(e.detail);
      };

      // @ts-ignore
      document.addEventListener('siren-sandbox-return-mapping', listener);

      emit(
        'mapping',
        get(get(mappings)[id].map),
        process,
        get(data)[region.source.id].data.map((row: any): number =>
          +(row[region.source.column] || 0)
        )
      );
    };
