import z from 'zod';

export const schema = z.object({
  torrentUrl: z.string().trim().min(1, '种子链接不能为空')
});

export type AddFormValues = z.infer<typeof schema>;
