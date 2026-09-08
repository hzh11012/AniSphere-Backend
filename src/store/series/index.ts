import type { SeriesListItem } from '@/apis/series';
import { createTableStore } from '@/store/base';

const useSeriesStore = createTableStore<SeriesListItem>('series-store');

export { useSeriesStore };
