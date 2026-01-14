import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { TorrentsListItem } from '@/apis';
import {
  createPaginationSlice,
  createTableSlice,
  resolveUpdater,
  type BasePaginationSlice,
  type BaseTableSlice
} from '@/store/base';

interface TorrentsStore
  extends BaseTableSlice<TorrentsListItem>, BasePaginationSlice {}

const useTorrentsStore = create<TorrentsStore>()(
  devtools(
    (...a) => ({
      ...createTableSlice<TorrentsListItem, TorrentsStore>()(...a),
      ...createPaginationSlice<TorrentsStore>()(...a),
      setSorting: updater => {
        a[0](state => {
          const nextSorting = resolveUpdater(updater, state.sorting);
          const firstSort = nextSorting[0];
          const sortMap: Record<string, string> = {
            'createdAt': 'added_on',
            'size': 'size'
          };

          return {
            sorting: nextSorting,
            order: firstSort ? (firstSort.desc ? 'desc' : 'asc') : undefined,
            sort: sortMap[firstSort?.id]
          };
        });
      }
    }),
    { name: 'torrents-store' }
  )
);

export { useTorrentsStore };
