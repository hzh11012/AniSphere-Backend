import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ResourcesListItem } from '@/apis';
import {
  createPaginationSlice,
  createTableSlice,
  type BasePaginationSlice,
  type BaseTableSlice
} from '@/store/base';

interface ResourcesStore
  extends BaseTableSlice<ResourcesListItem>, BasePaginationSlice {}

const useResourcesStore = create<ResourcesStore>()(
  devtools(
    (...a) => ({
      ...createTableSlice<ResourcesListItem, ResourcesStore>()(...a),
      ...createPaginationSlice<ResourcesStore>()(...a)
    }),
    { name: 'resources-store' }
  )
);

export { useResourcesStore };
