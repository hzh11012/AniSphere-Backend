import type { ResourcesListItem } from '@/apis/resources';
import { createTableStore } from '@/store/base';

const useResourcesStore =
  createTableStore<ResourcesListItem>('resources-store');

export { useResourcesStore };
