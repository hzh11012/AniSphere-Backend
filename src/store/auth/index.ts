import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { login, sendCode } from '@/apis';

interface AuthStore {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: boolean;
    avatar: string;
  };

  setUser: (user: AuthStore['user']) => void;

  code: {
    loading: boolean;
    fetchData: (email: string, cb: () => void) => Promise<void>;
  };

  login: {
    fetchData: (email: string, code: string) => Promise<boolean>;
  };
}

const useAuthStore = create<AuthStore>()(
  devtools(
    immer(set => ({
      user: {
        id: 0,
        name: '',
        email: '',
        role: 'guest',
        status: false,
        avatar: ''
      },

      setUser: user => {
        set(state => {
          state.user = user;
        });
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

      login: {
        fetchData: async (email, code) => {
          try {
            await login(email, code);
            return true;
          } catch {
            return false;
          }
        }
      }
    }))
  )
);

export { useAuthStore };
