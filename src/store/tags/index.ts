import type { TagsListItem } from '@/apis/tags';
import { createTableStore } from '@/store/base';

const useTagsStore = createTableStore<TagsListItem>('tags-store');

export { useTagsStore };
