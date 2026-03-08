import z from 'zod';

export const schema = z.object({
  name: z.string().trim().min(1, '系列名称不能为空')
});

export type AddFormValues = z.infer<typeof schema>;
