import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { SeriesListItem } from '@/apis';
import {
  createPaginationSlice,
  createTableSlice,
  type BasePaginationSlice,
  type BaseTableSlice
} from '@/store/base';

interface SeriesStore
  extends BaseTableSlice<SeriesListItem>, BasePaginationSlice {}

const useSeriesStore = create<SeriesStore>()(
  devtools(
    (...a) => ({
      ...createTableSlice<SeriesListItem, SeriesStore>()(...a),
      ...createPaginationSlice<SeriesStore>()(...a)
    }),
    { name: 'series-store' }
  )
);

export { useSeriesStore };
