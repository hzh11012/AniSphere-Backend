import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import Exception from '@/components/custom/exception';

interface AuthProviderProps {
  children: React.ReactNode;
}

const LOADING_DELAY = 200;

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialize = useAuthStore(state => state.initialize);
  const isInitialized = useAuthStore(state => state.isInitialized);
  const setUser = useAuthStore(state => state.setUser);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    initialize();

    // 延迟显示 loading，避免快速响应时的闪烁
    const timer = setTimeout(() => {
      if (!useAuthStore.getState().isInitialized) {
        setShowLoading(true);
      }
    }, LOADING_DELAY);

    return () => clearTimeout(timer);
  }, [initialize]);

  useEffect(() => {
    const handleUnauthorized = () => {
      // 清除用户状态
      setUser(null);

      // 如果不在登录页，则重定向到登录页
      if (location.pathname !== '/login') {
        const redirectPath = location.pathname + location.search;
        navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`, {
          replace: true
        });
      }
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [navigate, location, setUser]);

  if (!isInitialized) {
    // 只有超过延迟时间后才显示 loading
    return showLoading ? <Exception type='loading' /> : null;
  }

  return <>{children}</>;
};

export { AuthProvider };
