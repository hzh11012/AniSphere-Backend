import React from 'react';
import z from 'zod';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/custom/form/form-input';
import type { UseFormReturn } from 'react-hook-form';
import { Mail } from 'lucide-react';

const schema = z.object({
  email: z.string().trim().min(1, '邮箱不能为空').email('邮箱格式错误')
});

type LoginFormValues = z.infer<typeof schema>;

interface FormProps {
  form: UseFormReturn<LoginFormValues>;
  onFocus?: () => void;
  onSubmit: (values: LoginFormValues) => Promise<void>;
}

const LoginForm: React.FC<FormProps> = ({ form, onFocus, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          control={form.control}
          name='email'
          placeholder={'请输入邮箱'}
          onFocus={onFocus}
          prefixIcon={
            <Mail
              size={16}
              aria-hidden='true'
            />
          }
        />
      </form>
    </Form>
  );
};

export { LoginForm, schema, type LoginFormValues };
