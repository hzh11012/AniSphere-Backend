import request from '@/lib/request';

interface SeriesListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sort?: string;
  order?: string;
}

interface SeriesListItem {
  id: number;
  name: string;
  anime: {
    name: string;
    season: number;
  }[];
  createdAt: string;
}

interface SeriesListRes {
  items: SeriesListItem[];
  total: number;
}

interface AddSeriesBody {
  name: string;
}

interface DeleteSeriesParams {
  id: number;
}

const getSeriesList = (params: SeriesListParams) => {
  return request.get<SeriesListRes>('/api/admin/series', {
    params,
    showErrorToast: true
  });
};

const addSeries = (body: AddSeriesBody) => {
  return request.post('api/admin/series', body, {
    showSuccessToast: true,
    showErrorToast: true
  });
};

const deleteSeries = (params: DeleteSeriesParams) => {
  const { id } = params;
  return request.delete(`/api/admin/series/${id}`, {
    showErrorToast: true,
    showSuccessToast: true
  });
};

export {
  getSeriesList,
  type SeriesListRes,
  type SeriesListItem,
  addSeries,
  deleteSeries
};
