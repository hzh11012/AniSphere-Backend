import React, { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Logo from '@/components/custom/logo';
import { useForm } from 'react-hook-form';
import { LineShadowText } from '@/components/ui/line-shadow-text';
import { Button } from '@/components/ui/button';
import { LoginForm, schema, type LoginFormValues } from './login-form';
import useCountDown from '@/hooks/use-count-down';
import { useDebounceFn } from 'ahooks';
import { useAuthStore } from '@/store';
import CodeDialog from './code-dialog';
import Loading from '@/components/custom/loading';

const Login: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { start, count, isDisable } = useCountDown(60);
  const sendCode = useAuthStore(state => state.code.fetchData);
  const loading = useAuthStore(state => state.code.loading);
  const login = useAuthStore(state => state.login);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const email = form.watch('email');

  const handleSubmit = useCallback(async (values: LoginFormValues) => {
    const { email } = values;
    handleSendCode(email);
  }, []);

  const { run: handleSendCode } = useDebounceFn(
    async (email: string) => {
      !isDisable &&
        (await sendCode(email, () => {
          start();
        }));
      setOpen(true);
    },
    {
      wait: 200
    }
  );

  const { run: handleLogin } = useDebounceFn(
    async (email: string, code: string, setCode: (code: string) => void) => {
      const success = await login(email, code);
      if (!success) {
        setCode('');
      }
    },
    {
      wait: 200
    }
  );

  return (
    <div className='flex items-center justify-center size-full overflow-auto scrollbar-hide select-none'>
      <div className='relative w-87.5 h-auto rounded-md p-6 border-0 sm:border'>
        <div className='flex items-center gap-4 mb-10.5'>
          <Logo
            type='favicon'
            className='size-14'
          />
          <h3 className='font-semibold text-primary text-4xl'>
            Ani<LineShadowText className='italic'>Sphere</LineShadowText>
          </h3>
        </div>
        <div className='font-semibold text-lg mx-2 mb-3'>邮箱登录/注册</div>
        <div className='text-muted-foreground text-sm mx-2 mb-10'>
          未注册用户验证后将自动注册并登录
        </div>
        <LoginForm
          form={form}
          onSubmit={handleSubmit}
        />
        <Button
          className='w-full mt-10'
          type='submit'
          onClick={form.handleSubmit(handleSubmit)}
        >
          登录
        </Button>
      </div>
      <CodeDialog
        email={email}
        open={open}
        onOpenChange={setOpen}
        countDown={{ count, isDisable }}
        onComplete={handleLogin}
        onSend={handleSendCode}
      />
      {loading && <Loading />}
    </div>
  );
};

export default Login;
