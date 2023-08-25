import type { DragEventHandler } from 'svelte/elements';
import { get, type Readable } from 'svelte/store';
import tracks from '$lib/stores/tracks';
import type { TrackStore } from '$lib/util/definitions/tracks';
import synths from '$lib/stores/synths';
import type { SynthStore } from '$lib/util/definitions/synths';
import type { EventHandlerCreator } from '$lib/util/definitions/listener';

type HandlerCreator = EventHandlerCreator<[number], DragEventHandler<HTMLButtonElement>>;

export const handleDragLeave: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any =>
  e.dataTransfer?.types.includes('siren/synth') && (e.target as HTMLButtonElement).classList.remove('bg-gray-100', 'text-blue-600');

export const handleDragOver: DragEventHandler<HTMLButtonElement> = (e: DragEvent): any => {
  if (!e.dataTransfer?.types.includes('siren/synth')) return;
  e.dataTransfer.dropEffect = 'move';
  (e.target as HTMLButtonElement).classList.add('bg-gray-100', 'text-blue-600');
};

export const handleDragStart: HandlerCreator =
  (id: number) => (e: DragEvent): void => e.dataTransfer?.setData('siren/synth', '' + id);

export const handleDrop: HandlerCreator =
  (trackId: number) =>
    (e: DragEvent): void => {
      if (!e.dataTransfer?.types.includes('siren/synth')) return;
      const id: number = +e.dataTransfer.getData('siren/synth');
      (e.target as HTMLButtonElement)?.classList.remove('bg-gray-100', 'text-blue-600');

      const s: SynthStore = get(synths as unknown as Readable<SynthStore>);
      const t: TrackStore = get(tracks as unknown as Readable<TrackStore>);

      s[get(t[trackId].synth)].references.update((refs: number): any => refs - 1);
      s[id].references.update((refs: number): number => refs + 1);
      t[trackId].synth.set(id);
    };
