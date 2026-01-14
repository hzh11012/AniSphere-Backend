import React, { memo, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useRequest } from 'ahooks';
import { addTorrents } from '@/apis';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { AddForm, schema, type AddFormValues } from '@/pages/torrents/add-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface AddDialogProps {
  disabled: boolean;
  onRefresh: () => void;
}

const AddDialog: React.FC<AddDialogProps> = memo(({ disabled, onRefresh }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<AddFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { torrentUrl: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const { run, loading } = useRequest(addTorrents, {
    manual: true,
    loadingDelay: 150,
    debounceWait: 250,
    onSuccess() {
      setOpen(false);
      form.reset();
      // qBit会立即返回，但种子信息需要一段时间才会更新到列表，延迟一下再刷新
      setTimeout(() => {
        onRefresh();
      }, 150);
    }
  });

  const handleSubmit = (values: AddFormValues) => {
    run({ ...values });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button disabled={disabled || loading}>添加</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className='sm:text-left'>新增</DialogTitle>
        </DialogHeader>
        <AddForm
          form={form}
          onSubmit={handleSubmit}
        />
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
            type='submit'
            className={'flex-1 h-9'}
            onClick={form.handleSubmit(handleSubmit)}
            disabled={loading}
          >
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default AddDialog;
