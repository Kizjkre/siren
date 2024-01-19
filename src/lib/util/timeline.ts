import { get } from 'svelte/store';
import tracks from '$lib/stores/tracks';
import type { Track, TrackRegionStore } from '$lib/util/definitions/client/tracks';
import type { Region } from '$lib/util/definitions/client/region';
import rate from '$lib/stores/rate';

/**
 * Generate a timeline based on tracks, regions, and parameters.
 * @return {Timeline[]} - All of the timelines
 */
const timeline: TimelineCreator = (): Timeline[] =>
  // Iterate over each track
  Object.entries(get(tracks)).map(([id, { regions, synth }]: [string, Track]): any => {
    // Create a timeline object for the track
    const timeline: Timeline = { id: +id, synth: get(synth) };

    // Iterate over each timbral region
    Object.entries(get(regions.timbral)).forEach(([parameter, region]: [string, TrackRegionStore]): any => {
      // Iterate over each region data
      Object.values(region).forEach(({ data, offset }: Region): any => {
        const o: number = get(offset);
        let next: number = 0;

        // Iterate over each data point in the region
        get(data).forEach((datum: number): any => {
          // Add the parameter value to the timeline at the calculated offset
          timeline[o + next] = { ...(timeline[o + next] || {}), [parameter]: datum };
          next += 0.25 / get(rate); // NOTE: Temporary
        });
      });
    });

    return timeline;
  });;

export default timeline;
