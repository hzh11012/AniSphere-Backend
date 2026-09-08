import type { HistoryListItem } from '@/apis/histories';
import { createTableStore } from '@/store/base';

const useHistoryStore = createTableStore<HistoryListItem>('history-store');

export { useHistoryStore };
