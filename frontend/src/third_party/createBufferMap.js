/**
 * Copyright (C) 2019 Center for Computer Research in Music and Acoustics
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 **/

/**
 * @param {BaseAudioContext} audioContext The associated BaseAudioContext
 * @param {object} sampleDataCollection
 */
export default async (audioContext, sampleDataCollection) => {
  const bufferMap = {};
  for (const index in sampleDataCollection) {
    if (Object.prototype.hasOwnProperty.call(sampleDataCollection, index)) {
      const sampleData = sampleDataCollection[index];
      try {
        const response = await fetch(sampleData.url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        bufferMap[sampleData.key] = audioBuffer;
      } catch (error) {
        throw new Error(`[CreateBufferMap] ${error} (${sampleData.url})`);
      }
    }
  }

  return bufferMap;
};
