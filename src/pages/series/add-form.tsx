import React from 'react';
import z from 'zod';
import { Form } from '@/components/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import FormInput from '@/components/custom/form/form-input';

const schema = z.object({
  name: z.string().trim().min(1, '系列名称不能为空')
});

type AddFormValues = z.infer<typeof schema>;

interface AddFormProps {
  form: UseFormReturn<AddFormValues>;
  onSubmit: (values: AddFormValues) => void;
}

const AddForm: React.FC<AddFormProps> = ({ form, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          label='系列名称'
          control={form.control}
          maxLength={100}
          name='name'
        />
      </form>
    </Form>
  );
};

export { AddForm, schema, type AddFormValues };
