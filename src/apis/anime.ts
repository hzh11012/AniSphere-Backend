import request from '@/lib/request';

interface AnimeListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sort?: string;
  order?: string;
  status?: string[];
  types?: string[];
  months?: string[];
  years?: string[];
  tags?: string[];
}

interface AnimeListItem {
  id: number;
  cover: string;
  banner: string;
  name: string;
  remark: string;
  description: string;
  tags: {
    id: number;
    name: string;
  }[];
  type: 'movie' | 'japanese' | 'american' | 'chinese' | 'adult';
  status: 'draft' | 'upcoming' | 'airing' | 'completed';
  year: string;
  month: 'january' | 'april' | 'july' | 'october';
  seasonName: string | null;
  season: number;
  avgScore: number;
  scoreCount: number;
  director: string;
  cv: string;
  createdAt: string;
}

interface AnimeListRes {
  items: AnimeListItem[];
  total: number;
}

const getAnimeList = (params: AnimeListParams) => {
  return request.get<AnimeListRes>('/api/admin/anime', {
    params,
    showErrorToast: true
  });
};

export { getAnimeList, type AnimeListRes, type AnimeListItem };
