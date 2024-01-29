import type { DragEventHandler } from 'svelte/elements';
import type { Region } from '$lib/util/definitions/region';
import data from '$lib/stores/data';
import { get, writable } from 'svelte/store';
import mappings from '$lib/stores/mappings';
// @ts-ignore
import map from '$lib/util/sandbox/action/map?raw';
import type { EventHandlerCreator } from '$lib/util/definitions/listener';
import sandbox from '$lib/stores/sandbox';
import type { DSVRowAny } from '$lib/util/definitions/region';
import { type } from '$lib/util/types';

type DragStartHandlerCreator = EventHandlerCreator<[number], DragEventHandler<HTMLButtonElement>>;
type DropHandlerCreator = EventHandlerCreator<[Region], DragEventHandler<HTMLButtonElement>>;

/**
 * Handles the drag leave event for a button element.
 *
 * @param {DragEvent} e - The drag event object.
 * @return {any} No return value.
 */
export const handleDragLeave: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any =>
  e.dataTransfer!.types.includes('siren/mapping') &&
    (e.currentTarget as HTMLButtonElement).classList.remove('outline', 'outline-blue-600');

/**
 * Handles the drag over event for the button element.
 *
 * @param {DragEvent} e - The drag event object.
 * @return {any} - Returns nothing.
 */
export const handleDragOver: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any => {
  if (!e.dataTransfer!.types.includes('siren/mapping')) return;
  e.dataTransfer!.dropEffect = 'move';
  (e.currentTarget as HTMLButtonElement).classList.add('outline', 'outline-blue-600');
};

/**
 * Creates a drag start handler for the given ID.
 *
 * @param {number} id - The ID for the drag start handler.
 * @returns {void} - This function does not return any value.
 */
export const handleDragStart: DragStartHandlerCreator =
  (id: number): any => (e: DragEvent): void => e.dataTransfer!.setData('siren/mapping', '' + id);

/**
 * A function that handles the drop event.
 *
 * @param {Region} region - The region where the drop event occurred.
 * @return {void} This function does not return anything.
 */
export const handleDrop: DropHandlerCreator =
  (region: Region): any =>
    (e: DragEvent): void => {
      if (!e.dataTransfer!.types.includes('siren/mapping')) return;
      const id: number = +e.dataTransfer!.getData('siren/mapping');
      (e.currentTarget as HTMLButtonElement).classList.remove('outline', 'outline-blue-600');

      sandbox
        .read(`mapping-${ id }`)
        .then(({ payload: result }: { action: string, payload: any[] }): any => {
          region.data.set(result);
          region.type.set(type(result));
        });

      // noinspection JSIgnoredPromiseFromCall
      sandbox.add(`mapping-${ id }`,{
        action: map,
        data: writable<any[]>(get(data)[region.source.id].data
          .map((row: DSVRowAny): any => row[region.source.column])
          .filter((row: any): boolean => row !== null)),
        scripts: { userscript: get(get(mappings)[id].map) }
      });
    };
