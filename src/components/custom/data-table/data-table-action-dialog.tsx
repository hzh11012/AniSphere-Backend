import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface DataTableActionDialogProps {
  /** 是否打开 */
  open: boolean;
  /** 打开状态变化 */
  onOpenChange: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 触发器内容 */
  text: string;
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 点击事件 */
  onClick: () => void;
}

const DataTableActionDialog: React.FC<DataTableActionDialogProps> = memo(
  ({
    open,
    onOpenChange,
    className,
    text,
    title,
    description,
    disabled,
    onClick
  }) => {
    return (
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogTrigger asChild>
          <Button
            variant='link'
            className={cn('h-8 p-0', className)}
          >
            {text}
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
              <DialogTitle className='text-center'>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
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
              onClick={onClick}
              disabled={disabled}
            >
              确认
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

DataTableActionDialog.displayName = 'DataTableActionDialog';

export default DataTableActionDialog;
