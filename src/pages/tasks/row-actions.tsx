import React, { memo, useCallback, useState } from 'react';
import { useRequest } from 'ahooks';
import {
  startTranscode,
  cancelTranscode,
  deleteTask,
  type TasksListItem
} from '@/apis';
import DataTableActionDialog from '@/components/custom/data-table/data-table-action-dialog';

interface RowActionsProps<T> {
  row: T;
  onRefresh: () => void;
}

interface DownloadDialogProps {
  id: number;
  onRefresh: () => void;
}

interface DeleteDialogProps {
  id: number;
  onRefresh: () => void;
}

interface ScrapeAnimeDialogProps {}

const TranscodeDialog: React.FC<DownloadDialogProps> = memo(
  ({ id, onRefresh }) => {
    const [open, setOpen] = useState(false);

    const { run, loading } = useRequest(startTranscode, {
      manual: true,
      loadingDelay: 150,
      debounceWait: 250,
      onSuccess() {
        setOpen(false);
        onRefresh();
      }
    });

    const handleClick = useCallback(() => run({ id }), [run, id]);

    return (
      <DataTableActionDialog
        open={open}
        onOpenChange={setOpen}
        text='转码'
        title='确认转码'
        description='此操作将启动ffmpeg进行转码。 请确认是否继续?'
        onClick={handleClick}
        disabled={loading}
      />
    );
  }
);

const CancelTranscodeDialog: React.FC<DownloadDialogProps> = memo(
  ({ id, onRefresh }) => {
    const [open, setOpen] = useState(false);

    const { run, loading } = useRequest(cancelTranscode, {
      manual: true,
      loadingDelay: 150,
      debounceWait: 250,
      onSuccess() {
        setOpen(false);
        onRefresh();
      }
    });

    const handleClick = useCallback(() => run({ id }), [run, id]);

    return (
      <DataTableActionDialog
        open={open}
        onOpenChange={setOpen}
        text='取消转码'
        title='取消转码'
        description='此操作将取消ffmpeg转码。 请确认是否继续?'
        onClick={handleClick}
        disabled={loading}
      />
    );
  }
);

const ScrapeAnimeDialog: React.FC<ScrapeAnimeDialogProps> = memo(({}) => {
  return <div>刮削（TODO）</div>;
});

const DeleteDialog: React.FC<DeleteDialogProps> = memo(({ id, onRefresh }) => {
  const [open, setOpen] = useState(false);

  const { run, loading } = useRequest(deleteTask, {
    manual: true,
    loadingDelay: 150,
    debounceWait: 250,
    onSuccess() {
      setOpen(false);
      onRefresh();
    }
  });

  const handleClick = useCallback(() => run({ id }), [run, id]);

  return (
    <DataTableActionDialog
      open={open}
      onOpenChange={setOpen}
      text='删除'
      title='删除记录'
      description='此操作将删除该条记录。 请确认是否继续?'
      className='text-destructive'
      onClick={handleClick}
      disabled={loading}
    />
  );
});

const RowActions: React.FC<RowActionsProps<TasksListItem>> = ({
  row,
  onRefresh
}) => {
  const { id, status } = row;

  return (
    <div className='flex items-center gap-2'>
      {status === 'pending' && (
        <TranscodeDialog
          id={id}
          onRefresh={onRefresh}
        />
      )}
      {status === 'transcoding' && (
        <CancelTranscodeDialog
          id={id}
          onRefresh={onRefresh}
        />
      )}
      {status === 'transcoded' && <ScrapeAnimeDialog />}
      {status !== 'transcoding' && (
        <DeleteDialog
          id={id}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
};

export default RowActions;
