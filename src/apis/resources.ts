import request from '@/lib/request';

interface ResourcesListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

interface ResourcesListItem {
  title: string;
  magnet: string;
  size: number;
  fansub?: string;
  createdAt: string;
}

interface ResourcesListRes {
  items: ResourcesListItem[];
  hasMore: boolean;
}

const getResourcesList = (params: ResourcesListParams) => {
  return request.post<ResourcesListRes>('/api/admin/resources', params);
};

export { getResourcesList, type ResourcesListRes, type ResourcesListItem };
