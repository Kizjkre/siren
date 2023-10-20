import { get } from 'svelte/store';
import tracks from '$lib/stores/tracks';
import type { Track, TrackRegionStoreStructure } from '$lib/util/definitions/tracks';
import type { Region } from '$lib/util/definitions/region';
import rate from '$lib/stores/rate';

/**
 * Generate a timeline based on tracks, regions, and parameters.
 * @param callback - The callback function to be called with the generated timeline.
 */
const timeline: TimelineCreator = (callback: TimelineCallback): any => {
  // Iterate over each track
  Object.values(get(tracks)).forEach(({ regions, synth }: Track): any => {
    // Create a timeline object for the track
    const timeline: Timeline = { synth: get(synth) };

    // Iterate over each timbral region
    Object.entries(get(regions.timbral)).forEach(([parameter, region]: [string, TrackRegionStoreStructure]): any => {
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

    // Call the callback function with the generated timeline
    callback(timeline);
  });
};

export default timeline;
