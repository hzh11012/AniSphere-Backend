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

interface TagsOptionItem {
  label: string;
  value: string;
}

type TagsOptionRes = TagsOptionItem[];

const getTagsList = (params: TagsListParams) => {
  return request.get<TagsListRes>('/api/admin/tags', {
    params,
    showErrorToast: true
  });
};

const getTagsOption = () => {
  return request.get<TagsOptionRes>('/api/admin/tags/options', {
    showErrorToast: true
  });
};

export {
  getTagsList,
  getTagsOption,
  type TagsListRes,
  type TagsListItem,
  type TagsOptionRes,
  type TagsOptionItem
};
