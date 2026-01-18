import React, { memo, useCallback, useState } from 'react';
import { useRequest } from 'ahooks';
import { addTorrents, type ResourcesListItem } from '@/apis';
import DataTableActionDialog from '@/components/custom/data-table/data-table-action-dialog';

interface RowActionsProps<T> {
  row: T;
}

interface DownloadDialogProps {
  url: string;
}

const DownloadDialog: React.FC<DownloadDialogProps> = memo(({ url }) => {
  const [open, setOpen] = useState(false);

  const { run, loading } = useRequest(addTorrents, {
    manual: true,
    loadingDelay: 150,
    debounceWait: 250,
    onSuccess() {
      setOpen(false);
    }
  });

  const handleClick = useCallback(() => run({ torrentUrl: url }), [run, url]);

  return (
    <DataTableActionDialog
      open={open}
      onOpenChange={setOpen}
      text='下载'
      title='确认下载'
      description='此操作无法撤销。 若需要, 请使用qBittorrent'
      onClick={handleClick}
      disabled={loading}
    />
  );
});

const RowActions: React.FC<RowActionsProps<ResourcesListItem>> = ({ row }) => {
  const { magnet } = row;

  return <DownloadDialog url={magnet} />;
};

export default RowActions;
