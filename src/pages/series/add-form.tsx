import React from 'react';
import { Form } from '@/components/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import FormInput from '@/components/custom/form/form-input';
import type { AddFormValues } from '@/pages/series/add-schema';

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

export default AddForm;
