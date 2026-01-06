import request from '@/lib/request';

const me = async () => {
  return request.get('/api/auth/me');
};

const login = async (email: string, code: string) => {
  return request.post(
    '/api/auth/login',
    { email, code },
    { showErrorToast: true }
  );
};

const sendCode = async (email: string) => {
  return request.post(
    '/api/auth/send-code',
    { email },
    { showErrorToast: true, showSuccessToast: true }
  );
};

const logout = () => {
  return request.post('/api/auth/logout');
};

export { me, login, sendCode, logout };
