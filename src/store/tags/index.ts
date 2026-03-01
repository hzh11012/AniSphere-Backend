import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { TagsListItem } from '@/apis';
import {
  createPaginationSlice,
  createTableSlice,
  type BasePaginationSlice,
  type BaseTableSlice
} from '@/store/base';

interface TagsStore extends BaseTableSlice<TagsListItem>, BasePaginationSlice {}

const useTagsStore = create<TagsStore>()(
  devtools(
    (...a) => ({
      ...createTableSlice<TagsListItem, TagsStore>()(...a),
      ...createPaginationSlice<TagsStore>()(...a)
    }),
    { name: 'tags-store' }
  )
);

export { useTagsStore };
