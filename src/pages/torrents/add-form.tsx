import React from 'react';
import z from 'zod';
import { Form } from '@/components/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import FormTextarea from '@/components/custom/form/form-textarea';

const schema = z.object({
  torrentUrl: z.string().trim().min(1, '种子链接不能为空')
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
        <FormTextarea
          label='种子链接'
          control={form.control}
          name='torrentUrl'
        />
      </form>
    </Form>
  );
};

export { AddForm, schema, type AddFormValues };
