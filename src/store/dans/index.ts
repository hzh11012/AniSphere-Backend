import type { DanmakuListItem } from '@/apis/dans';
import { createTableStore } from '@/store/base';

const useDanmakuStore = createTableStore<DanmakuListItem>('danmaku-store');

export { useDanmakuStore };
