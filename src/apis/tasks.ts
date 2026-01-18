import request from '@/lib/request';

interface TasksListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sort?: string;
  order?: string;
}

interface TasksListItem {
  id: number;
  filename: string;
  fileSize: number;
  needsTranscode: boolean;
  status: string;
  errorMessage: string | null;
  transcodeProgress: number;
  createdAt: string;
}

interface TasksListRes {
  items: TasksListItem[];
  total: number;
}

interface TranscodeParams {
  id: number;
}

interface DeleteTaskParams {
  id: number;
}

const getTasksList = (params: TasksListParams) => {
  return request.get<TasksListRes>('/api/admin/tasks', {
    params,
    showErrorToast: true
  });
};

const startTranscode = (params: TranscodeParams) => {
  return request.post('/api/admin/transcodes', params, {
    showErrorToast: true,
    showSuccessToast: true
  });
};

const cancelTranscode = (params: TranscodeParams) => {
  const { id } = params;
  return request.delete(`/api/admin/transcodes/${id}`, {
    showErrorToast: true,
    showSuccessToast: true
  });
};

const deleteTask = (params: DeleteTaskParams) => {
  const { id } = params;
  return request.delete(`/api/admin/tasks/${id}`, {
    showErrorToast: true,
    showSuccessToast: true
  });
};

export {
  getTasksList,
  startTranscode,
  cancelTranscode,
  deleteTask,
  type TasksListRes,
  type TasksListItem
};
