import { get } from 'svelte/store';
import tracks from '$lib/stores/tracks';
import type { Track, TrackRegionStoreStructure } from '$lib/util/definitions/tracks';
import type { Region } from '$lib/util/definitions/region';
import rate from '$lib/stores/rate';

const timeline: TimelineCreator = (callback: TimelineCallback): any =>
  Object.values(get(tracks)).forEach(({ regions, synth }: Track): any => {
    const timeline: Timeline = { synth: get(synth) };
    Object.entries(get(regions.timbral)).forEach(([parameter, region]: [string, TrackRegionStoreStructure]): any => {
      Object.values(region).forEach(({ data, offset }: Region): any => {
        const o: number = get(offset);
        let next: number = 0;
        get(data).forEach((datum: number): any => {
          timeline[o + next] = { ...(timeline[o + next] || {}), [parameter]: datum };
          next += 0.25 / get(rate); // NOTE: Temporary
        });
      });
    });
    callback(timeline);
  });

export default timeline;
