import React, { memo, useCallback, useState } from 'react';
import { useRequest } from 'ahooks';
import { deleteSeries, type SeriesListItem } from '@/apis';
import {
  DataTableActionDialog,
  type ActionDialogProps
} from '@/components/custom/data-table/data-table-action-dialog';

interface RowActionsProps<T> {
  row: T;
  onRefresh: () => void;
}

interface DeleteDialogProps extends ActionDialogProps {}

const DeleteDialog: React.FC<DeleteDialogProps> = memo(({ id, onRefresh }) => {
  const [open, setOpen] = useState(false);

  const { run, loading } = useRequest(deleteSeries, {
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
      title='删除系列'
      description='此操作将删除该条系列。 请确认是否继续?'
      className='text-destructive'
      onClick={handleClick}
      disabled={loading}
    />
  );
});

const RowActions: React.FC<RowActionsProps<SeriesListItem>> = ({
  row,
  onRefresh
}) => {
  const { id } = row;

  return (
    <DeleteDialog
      id={id}
      onRefresh={onRefresh}
    />
  );
};

export default RowActions;
