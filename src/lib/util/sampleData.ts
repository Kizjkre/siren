import { autoType, csvParse } from 'd3-dsv';
import coral from '$lib/assets/data/coral_data.csv?raw';
import data from '$lib/stores/data';

const sampleData: () => void = (): void =>
  data.update(d => ({ ...d, 'coral_data.csv': csvParse(coral, autoType) }));

export default sampleData;
