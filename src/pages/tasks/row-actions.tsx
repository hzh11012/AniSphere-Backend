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
import { startTranscode, cancelTranscode, type TasksListItem } from '@/apis';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface RowActionsProps<T> {
  row: T;
}

interface DownloadDialogProps {
  id: number;
}

const TranscodeDialog: React.FC<DownloadDialogProps> = memo(({ id }) => {
  const [open, setOpen] = useState(false);

  const { run, loading } = useRequest(startTranscode, {
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
          转码
        </Button>
      </DialogTrigger>
      <DialogContent>
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
            <DialogTitle className='text-center'>确认转码</DialogTitle>
            <DialogDescription>
              此操作将启动ffmpeg进行转码。 请确认是否继续?
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
            onClick={() => run({ id })}
            disabled={loading}
          >
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

const CancelTranscodeDialog: React.FC<DownloadDialogProps> = memo(({ id }) => {
  const [open, setOpen] = useState(false);

  const { run, loading } = useRequest(cancelTranscode, {
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
          取消转码
        </Button>
      </DialogTrigger>
      <DialogContent>
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
            <DialogTitle className='text-center'>取消转码</DialogTitle>
            <DialogDescription>
              此操作将取消ffmpeg转码。 请确认是否继续?
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
            onClick={() => run({ id })}
            disabled={loading}
          >
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

const RowActions: React.FC<RowActionsProps<TasksListItem>> = ({ row }) => {
  const { id, status } = row;

  return (
    <div>
      {status === 'pending' && <TranscodeDialog id={id} />}
      {status === 'transcoding' && <CancelTranscodeDialog id={id} />}
    </div>
  );
};

export default RowActions;
