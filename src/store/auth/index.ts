import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { login, logout, me, sendCode } from '@/apis';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: boolean;
  avatar: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  isInitialized: boolean;

  user: User | null;

  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;

  initialize: () => Promise<void>;

  code: {
    loading: boolean;
    fetchData: (email: string, cb: () => void) => Promise<void>;
  };

  login: (email: string, code: string) => Promise<boolean>;

  logout: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    immer(set => ({
      isAuthenticated: false,
      isInitialized: false,
      user: null,

      setUser: user => {
        set(state => {
          state.user = user;
          state.isAuthenticated = !!user;
        });
      },

      setAuthenticated: value => {
        set(state => {
          state.isAuthenticated = value;
        });
      },

      // 初始化：尝试获取当前用户信息
      initialize: async () => {
        try {
          const user = await me();

          if (user.role !== 'admin') {
            toast.error('权限不足');
            set(state => {
              state.user = null;
              state.isAuthenticated = false;
              state.isInitialized = true;
            });
            return;
          }

          set(state => {
            state.user = user;
            state.isAuthenticated = true;
            state.isInitialized = true;
          });
        } catch {
          set(state => {
            state.user = null;
            state.isAuthenticated = false;
            state.isInitialized = true;
          });
        }
      },

      code: {
        loading: false,
        fetchData: async (email, cb) => {
          try {
            set(state => {
              state.code.loading = true;
            });
            await sendCode(email);
            cb();
          } finally {
            set(state => {
              state.code.loading = false;
            });
          }
        }
      },

      login: async (email, code) => {
        try {
          const user = await login(email, code);

          if (user.role !== 'admin') {
            toast.error('权限不足');
            return false;
          }

          set(state => {
            state.user = user;
            state.isAuthenticated = true;
            state.isInitialized = true;
          });
          return true;
        } catch {
          return false;
        }
      },

      logout: async () => {
        try {
          await logout();
        } finally {
          set(state => {
            state.user = null;
            state.isAuthenticated = false;
          });
        }
      }
    }))
  )
);

export { useAuthStore };
