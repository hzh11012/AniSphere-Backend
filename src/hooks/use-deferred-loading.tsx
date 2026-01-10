import { useState, useEffect } from 'react';

/**
 * 延迟显示 loading 状态的 Hook
 * @param isLoading 实际的 loading 状态
 * @param delay 延迟时间（毫秒），默认 250ms
 * @returns 是否应该显示 loading
 */
const useDeferredLoading = (isLoading: boolean, delay = 250): boolean => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timer = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      setShowLoading(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, delay]);

  return showLoading;
};

export default useDeferredLoading;
