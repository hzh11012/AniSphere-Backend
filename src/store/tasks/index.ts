import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { TasksListItem } from '@/apis';
import {
  createPaginationSlice,
  createTableSlice,
  type BasePaginationSlice,
  type BaseTableSlice
} from '@/store/base';

interface TasksStore
  extends BaseTableSlice<TasksListItem>, BasePaginationSlice {}

const useTasksStore = create<TasksStore>()(
  devtools(
    (...a) => ({
      ...createTableSlice<TasksListItem, TasksStore>()(...a),
      ...createPaginationSlice<TasksStore>()(...a)
    }),
    { name: 'tasks-store' }
  )
);

export { useTasksStore };
