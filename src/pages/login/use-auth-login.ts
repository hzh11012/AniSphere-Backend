import { useCallback, useRef, useState } from 'react';
import useCountDown from '@/hooks/use-count-down';
import { useRequest } from 'ahooks';
import { login, sendCode } from '@/apis/auth';

/** 登录页的验证码发送 + 倒计时 + 弹窗开关逻辑 */
export const useAuthLogin = () => {
  const [open, setOpen] = useState(false);
  const lastSentEmailRef = useRef('');
  const { start, count, isDisable, reset } = useCountDown(60);
  const { run: onSendCode, loading } = useRequest(sendCode, {
    manual: true,
    debounceWait: 250,
    onSuccess: () => {
      start();
    }
  });
  const { runAsync: onLogin } = useRequest(login, {
    manual: true,
    debounceWait: 250
  });

  const handleSendCode = useCallback(
    (email: string) => {
      const emailChanged = lastSentEmailRef.current !== email;
      if (emailChanged) {
        reset();
      }
      if (!isDisable || emailChanged) {
        onSendCode(email);
        lastSentEmailRef.current = email;
      }
      setOpen(true);
    },
    [isDisable, onSendCode, reset]
  );

  return {
    open,
    setOpen,
    count,
    isDisable,
    handleSendCode,
    loading,
    onLogin
  };
};
