import request from '@/lib/request';

interface TagsListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sort?: string;
  order?: string;
}

interface TagsListItem {
  id: number;
  name: string;
  createdAt: string;
}

interface TagsListRes {
  items: TagsListItem[];
  total: number;
}

const getTagsList = (params: TagsListParams) => {
  return request.get<TagsListRes>('/api/admin/tags', {
    params,
    showErrorToast: true
  });
};

export { getTagsList, type TagsListRes, type TagsListItem };
