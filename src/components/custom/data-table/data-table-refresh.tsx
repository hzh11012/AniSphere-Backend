import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

interface DataTableRefreshProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 刷新回调 */
  onRefresh: () => void;
}

const DataTableRefresh: React.FC<DataTableRefreshProps> = ({
  disabled = false,
  onRefresh
}) => {
  return (
    <Button
      variant='icon'
      onClick={onRefresh}
      disabled={disabled}
    >
      <RotateCw />
    </Button>
  );
};

DataTableRefresh.displayName = 'DataTableRefresh';

export default DataTableRefresh;
