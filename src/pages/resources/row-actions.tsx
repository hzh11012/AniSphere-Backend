import React, { memo, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useRequest } from 'ahooks';
import { addTorrents, type ResourcesListItem } from '@/apis';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

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

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant='link'
          className='h-8 p-0'
        >
          下载
        </Button>
      </DialogTrigger>
      <DialogContent className='w-102'>
        <div className='flex flex-col items-center gap-3'>
          <div
            className='flex size-9 shrink-0 items-center justify-center rounded-full border'
            aria-hidden='true'
          >
            <Info
              className='opacity-80 text-primary'
              size={18}
            />
          </div>
          <DialogHeader>
            <DialogTitle className='text-center'>确认下载</DialogTitle>
            <DialogDescription>
              此操作无法撤销。 若需要, 请使用qBittorrent
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className='flex gap-6'>
          <DialogClose asChild>
            <Button
              type='button'
              className='flex-1 h-9'
              variant='outline'
              aria-label='取消'
            >
              取消
            </Button>
          </DialogClose>
          <Button
            type='button'
            className={'flex-1 h-9'}
            onClick={() => run({ torrentUrl: url })}
            disabled={loading}
          >
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

const RowActions: React.FC<RowActionsProps<ResourcesListItem>> = ({ row }) => {
  const { magnet } = row;

  return <DownloadDialog url={magnet} />;
};

export default RowActions;
