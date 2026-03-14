import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AnimeListItem, TagsOptionRes, SeriesOptionRes } from '@/apis';
import {
  createPaginationSlice,
  createTableSlice,
  type BasePaginationSlice,
  type BaseTableSlice
} from '@/store/base';
import type { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table';

interface AnimeStore
  extends BaseTableSlice<AnimeListItem>, BasePaginationSlice {
  status: string[];
  types: string[];
  months: string[];
  years: string[];
  tags: string[];
  tagsOption: TagsOptionRes;
  seriesOption: SeriesOptionRes;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setTagsOption: (tagsOption: TagsOptionRes) => void;
  setSeriesOption: (seriesOption: SeriesOptionRes) => void;
}

const useAnimeStore = create<AnimeStore>()(
  devtools(
    (set, ...a) => ({
      ...createTableSlice<AnimeListItem, AnimeStore>()(set, ...a),
      ...createPaginationSlice<AnimeStore>()(set, ...a),
      status: [],
      types: [],
      months: [],
      years: [],
      tags: [],
      tagsOption: [],
      seriesOption: [],
      setColumnFilters: updater => {
        set(state => {
          const base = state.columnFilters;
          const next = typeof updater === 'function' ? updater(base) : updater;
          return {
            columnFilters: next,
            status: (next.find(item => item.id === 'status')?.value ||
              []) as string[],
            types: (next.find(item => item.id === 'type')?.value ||
              []) as string[],
            months: (next.find(item => item.id === 'month')?.value ||
              []) as string[],
            years: (next.find(item => item.id === 'year')?.value ||
              []) as string[],
            tags: (next.find(item => item.id === 'tags')?.value ||
              []) as string[]
          };
        });
      },
      setTagsOption: tagsOption => set({ tagsOption }),
      setSeriesOption: seriesOption => set({ seriesOption })
    }),
    { name: 'anime-store' }
  )
);

export { useAnimeStore };
