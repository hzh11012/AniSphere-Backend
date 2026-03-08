import React from 'react';
import { Form } from '@/components/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import FormTextarea from '@/components/custom/form/form-textarea';
import type { AddFormValues } from '@/pages/torrents/add-schema';

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

export default AddForm;
